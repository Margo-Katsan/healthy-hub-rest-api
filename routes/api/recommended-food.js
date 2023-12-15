const express = require('express');

const ctrl = require('../../controllers/recommendedFoods');
const {authenticate} = require("../../middlewares");

const router = express.Router();

router.get('/', authenticate,  ctrl.getRecommendedFood);

module.exports = router;