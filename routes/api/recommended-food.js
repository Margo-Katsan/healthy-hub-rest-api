const express = require('express');

const ctrl = require('../../controllers/users');

// const { schemas } = require('../../models/recommendedFood')

const router = express.Router();

router.get('/', ctrl.getRecommendedFoods);

module.exports = router;