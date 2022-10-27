const router = require('express').Router();
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require('../../db/models')

//Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;

    const Reviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state',
                    'country', 'lat', 'lng', 'name', 'price'],
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });


    for(let i = 0; i < Reviews.length; i++){
        let review = Reviews[i]


    }

    res.status(200);
    res.json({ 
        Reviews
    });

});

//Edit a Review
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;
    const { user } = req;
    const { review, stars } = req.body;

    const rev = await Review.findByPk(reviewId);

    if (!rev) {
        res.status(404);
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if (rev.userId !== user.id) {
        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        });
    }


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

    await rev.update({
        review,
        stars
    });

    res.status(200);
    res.json(rev);

})

//Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next)=> {
    const reviewId  = req.params.reviewId;
    const { user } = req;

    const rev = await Review.findByPk(reviewId);

    if (!rev) {
        res.status(404);
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if (rev.userId !== user.id) {
        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        });
    }

    await rev.destroy();
    res.status(200);
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      });

})


//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;
    const { user } = req;
    const { url } = req.body;

    const review = await Review.findByPk(reviewId);

    if (!review) {
        res.status(404);
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if (review.userId !== user.id) {
        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        });
    }

    const imgCount = await ReviewImage.findAll({
        where: {
            reviewId: review.id
        }
    })

    if (imgCount.length >= 10) {
        res.status(403);
        res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }

    const reviewImg = await ReviewImage.create({
        reviewId,
        url
    });

    res.status(200);
    res.json({
        id: reviewImg.id,
        url: reviewImg.url
    });

});



module.exports = router;
