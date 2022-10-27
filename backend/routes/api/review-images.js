const router = require('express').Router();
const { Op } = require('sequelize');
const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

//Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;

    const reviewImage = await ReviewImage.findByPk(imageId);

    const review = await Review.findOne({
        where: {
            id: reviewImage.reviewId
        }
    })

    if (!reviewImage) {
        res.status(404);
        res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }
    
    if (review.userId !== req.user.id) {
        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        });
    };
    

    await reviewImage.destroy();
    res.status(200);
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });

})



module.exports = router;
