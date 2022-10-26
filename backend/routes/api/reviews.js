const router = require('express').Router();
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require('../../db/models')

router.get('/current', requireAuth, async (req, res, next)=> {
    const { user } = req;

    

})


module.exports = router;
