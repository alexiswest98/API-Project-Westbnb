const router = require('express').Router();
const { Op } = require('sequelize');
const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


//Delete a Spot Image
router.delete('/:imageId', requireAuth, async (req, res, next)=> {
    const { user } = req;
    const { imageId } = req.params;

    const spotImage = await SpotImage.findByPk(imageId);

    const spot = await Spot.findOne({
        where: {
            id: spotImage.spotId
        }
    });

    if(!spotImage){
        res.status(404);
        res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
          })
    };


    if(spot.ownerId !== user.id) {
        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    };

    await spotImage.destroy();
    res.status(200);
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })

})

module.exports = router;
