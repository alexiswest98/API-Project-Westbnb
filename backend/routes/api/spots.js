const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const router = require('express').Router();
const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require('../../db/models')

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;

    let spotsRes = await Spot.findAll({
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
            ],
            [sequelize.col('SpotImages.url'), 'previewImage']
        ],
        group: ['Spot.id']
    });

    let result = {
        Spots: spotsRes
    }

    res.status(200);
    res.json(result);
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

    if (!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }

    res.status(200);
    res.json(spot);
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
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'],
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
                ],
                [sequelize.col('SpotImages.url'), 'previewImage']
            ]
        },
        group: ['Spot.id']
    });

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
