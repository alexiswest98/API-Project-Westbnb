const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const router = require('express').Router();
const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require('../../db/models')


router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;

    const spot = await Spot.findOne({
        where: {
            ownerId: user.id
        },
        include: [
            {
                model: SpotImage,
                attributes: ['url']
            },
            // {
            //     model: Review,
            //     attributes: []
            // }
        ],
        // attributes: {
        //     include: [
        //         [
        //             sequelize.fn('AVG', sequelize.col('Reviews.stars')),
        //             'avgRating'
        //         ]
        //     ]
        // }
    })


    res.status(200);
    res.json(spot);
});


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

    let numReviews = await Review.count({
        where: {
            spotId: id
        }
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


router.get('/', requireAuth, async (req, res, next) => {


    const spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    })

    res.status(200)
    res.json(spots)
});


module.exports = router;
