const router = require('express').Router();
const { Op } = require('sequelize');
const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;

    let allBookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat',
                            'lng', 'name', 'price'],
                include: [
                    {
                        model: SpotImage,
                        attributes: []
                    }
                ]
            }
        ]
    });

    const Bookings = [];
    for(let i = 0; i < allBookings.length; i++){
        let book = allBookings[i];

        let spotImage = 'no image available'

        const image = await SpotImage.findOne({
            where: {
                spotId: book.Spot.id
            }
        });

        if(image){
            spotImage = image.url;
        }

        book.Spot.previewImage = spotImage;
    }

    res.status(200);
    res.json({
        Bookings
    })

})


module.exports = router;
