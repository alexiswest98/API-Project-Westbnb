const router = require('express').Router();
const { Op } = require('sequelize');
const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;

    let Bookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat',
                    'lng', 'name', 'price', 'previewImage'],
                include: [
                    {
                        model: SpotImage,
                        attributes: []
                    }
                ]
            }
        ],
        order: ['id']
    });

    //add image url to previewImage if one
    for (let i = 0; i < Bookings.length; i++) {
        let book = Bookings[i];

        const image = await SpotImage.findOne({
            where: {
                spotId: book.Spot.id,
                preview: true
            }
        });

        if (image) {
            book.Spot.previewImage = image.url;
        }
    }

    res.status(200);
    res.json({
        Bookings
    })

})

//Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { bookingId } = req.params;
    const { user } = req;
    const { startDate, endDate } = req.body;

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        res.status(404);
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    if (booking.userId !== user.id) {
        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    };

    const existingBooking = await Booking.findOne({
        where: {
            spotId: booking.spotId,
            startDate,
            endDate
        }
    });

    if (existingBooking) {
        res.status(403);
        res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        })
    } else if (endDate < startDate) {
        res.status(400)
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
        })
    } else {
        booking.startDate = startDate;
        booking.endDate = endDate;

        await booking.save();

        res.status(200);
        res.json(booking);
    }

    //Can't edit a booking that's past the end date

    // if (endDate < new Date()) {
    //     res.status(403);
    //     res.json({
    //         "message": "Past bookings can't be modified",
    //         "statusCode": 403
    //     })
    // }

});

//Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const { bookingId } = req.params;
    const { user } = req;

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        res.status(404);
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    if (booking.userId !== user.id) {
        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    };

    if (booking.startDate < new Date()) {
        res.status(403);
        res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
        })
    } else {
        await booking.destroy();
        res.status(200);
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }

})

module.exports = router;
