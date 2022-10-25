const router = require('express').Router();
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require('../../db/models')




module.exports = router;
