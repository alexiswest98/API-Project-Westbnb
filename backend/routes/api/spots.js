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
        attributes: [ 'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
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

    let spotsRes = await Spot.findAll({
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
        attributes: [ 'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
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


module.exports = router;
