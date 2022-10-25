const router = require('express').Router();
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require('../../db/models')


//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {

    const { review, stars } = req.body;

    const spot = Spot.findOne({
        where: {
            id: req.params.spotId
        }
    });

    console.log(spot)
    
    const newPost = await Review.create({
        spotId: spot.id,
        userId: spot.ownerId,
        review,
        stars
    })

    res.status(201);
    res.json(newPost)
})

module.exports = router;
