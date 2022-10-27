const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const router = require('express').Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require('../../db/models');
// const Booking = require('../../db/models/Booking');

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;

    let Spots = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: []
            }
        ],
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
            [
                sequelize.fn('AVG', sequelize.col('Reviews.stars')),
                'avgRating'
            ], 'previewImage'
        ],
        group: ['Spot.id']
    });


    //add image url to previewImage if one
    for (let i = 0; i < Spots.length; i++) {
        let spot = Spots[i];

        const image = await SpotImage.findOne({
            where: {
                spotId: spot.id
            }
        });

        if (image) {
            spot.previewImage = image.url;
        }
    }

    res.status(200);
    res.json({ Spots });
});


//Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const id = req.params.spotId;

    let spot = await Spot.findOne({
        where: {
            id: id
        },
        include: [
            { model: Review, attributes: [] },
            { model: SpotImage, attributes: ["id", "url", "preview"] },
            {
                model: User, as: "Owner",
                attibutes: ["id", "firstName", "lastName"]
            },
        ],
    });

    if (!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    };


    let avgStarRating = await Spot.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: Review,
                attributes: []
            }
        ],
        attributes: [
            [
                sequelize.fn('AVG', sequelize.col('Reviews.stars')),
                'avgStarRating'
            ],
            [

                sequelize.fn("COUNT", sequelize.col("Reviews.id")),
                "numReviews"

            ]
        ]
    });

    spot = spot.toJSON();
    avgStarRating = avgStarRating.toJSON();
    Object.assign(spot, avgStarRating)


    res.status(200);
    res.json(spot);
});


//Edit a Spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const { user } = req;
    const { spotId } = req.params;

    const spot = await Spot.findOne({
        where: {
            id: spotId
        },
        attributes: {
            exclude: ['previewImage']
        }
    });


    if (!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (spot.ownerId !== user.id) {
        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    try {
        await spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });


        res.status(201);
        res.json(spot)
    } catch (e) {
        const errors = {};
        if (!address) { errors.address = "Street address is required" }
        if (!city) { errors.city = "City is required" }
        if (!state) { errors.state = "State is required" }
        if (!country) { errors.country = "Country is required" }
        if (!lat) { errors.lat = "Latitude is not valid" }
        if (!lng) { errors.lng = "Longitude is not valid" }
        if (!name) { errors.name = "Name must be less than 50 characters" }
        if (!description) { errors.description = "Longitude is required" }
        if (!price) { errors.price = "Price per day is required" }

        res.status(400);
        res.json(
            {
                message: "Validation Error",
                statusCode: 400,
                errors: errors
            }
        )
    }

});

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    // const { user } = req;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    if (spot.ownerId !== req.user.id) {
        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    };

    await spot.destroy();
    res.status(200);
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })

});

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId);
    const { url, preview } = req.body

    if (!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    const newImage = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview
    });

    res.status(200);
    res.json(newImage)
});

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    const Reviews = await Review.findAll({
        where: {
            spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attibutes: ['id', 'url']
            }
        ]
    });

    res.status(200);
    res.json({
        Reviews
    })

});

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const spotid = req.params.spotId
    const { review, stars } = req.body;

    const spot = await Spot.findByPk(spotid)

    const userReview = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: spotid
        }
    });

    if (!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };


    if (!review) {
        res.status(400);
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "review": "Review text is required"
            }
        })
    };

    if (stars > 5 || stars < 1) {
        res.status(400);
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "stars": "Stars must be an integer from 1 to 5"
            }
        })
    };

    if (userReview) {
        res.status(403);
        res.json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    } else {
        const newPost = await Review.create({
            spotId: spotid,
            userId: req.user.id,
            review,
            stars
        })

        res.status(201);
        res.json(newPost);
    }
});

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    if (spot.ownerId !== user.id) {

        const Bookings = await Booking.findAll({
            where: {
                spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        });

        res.status(200);
        res.json({
            Bookings
        })
    } else {
        const myBookings = await Booking.findAll({
            where: {
                spotId
            },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']

            }


        });
        res.status(200);
        res.json({
            Bookings: myBookings
        })
    }

});


//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const { user } = req;
    const { startDate, endDate } = req.body;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    if (spot.ownerId === req.user.id) {
        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    };

    const existingBooking = await Booking.findOne({
        where: {
            spotId,
            startDate,
            endDate
        }
    });

    if (endDate < startDate) {
        res.status(400)
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        })
    };

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
    } else {
        const newBooking = await Booking.create({
            spotId,
            userId: user.id,
            startDate,
            endDate
        })

        res.status(200);
        res.json(newBooking);
    };


});


//Create a Spot
router.post('/', requireAuth, async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const { user } = req;

    try {
        const newSpot = await Spot.create({
            ownerId: user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });

        res.status(201);
        res.json(newSpot);

    } catch (e) {
        res.status(400);
        const errors = {};
        if (!address) { errors.address = "Street address is required" }
        if (!city) { errors.city = "City is required" }
        if (!state) { errors.state = "State is required" }
        if (!country) { errors.country = "Country is required" }
        if (!lat) { errors.lat = "Latitude is not valid" }
        if (!lng) { errors.lng = "Longitude is not valid" }
        if (!name) { errors.name = "Name must be less than 50 characters" }
        if (!description) { errors.description = "Longitude is required" }
        if (!price) { errors.price = "Price per day is required" }

        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: errors
        })
    }
});


//Get all Spots
router.get('/', async (req, res, next) => {

    const { user } = req;

    let { page, size } = req.query

    //default page and size
    if (!page) page = 1;
    if (!size) size = 20;

    page = parseInt(page);
    size = parseInt(size);

    //error handling
    if ((Number.isNaN(page) && Number.isNaN(size)) ||
        ((page < 1 || page > 10) &&
            size < 1 || size > 20)) {
        res.status(400);
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "page": "Page must be greater than or equal to 1",
                "size": "Size must be greater than or equal to 1"
            }
        })
    } else if (Number.isNaN(page) || page < 1 || page > 10) {
        res.status(400);
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "page": "Page must be greater than or equal to 1"
            }
        })
    } else if (Number.isNaN(size) || size < 1 || size > 20) {
        res.status(400);
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "size": "Size must be greater than or equal to 1"
            }
        })
    }

    let spotsRes = await Spot.findAll({
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt', 'previewImage'],
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: []
            }
        ],
        attributes: {
            include: [
                [
                    sequelize.fn('AVG', sequelize.col('Reviews.stars')),
                    'avgRating'
                ]
            ]
        },
        group: ['Spot.id']
    });

    //add image url to previewImage if one
    for (let i = 0; i < spotsRes.length; i++) {
        let spot = spotsRes[i];

        const image = await SpotImage.findOne({
            where: {
                spotId: spot.id
            }
        });

        if (image) {
            spot.previewImage = image.url;
        }
    }

    const base = (page * size) - size;
    const base2 = (page * size)

    const Spots = spotsRes.slice(base, base2)

    let result = {
        Spots,
        page,
        size
    }

    res.status(200);
    res.json(result);
});



module.exports = router;
