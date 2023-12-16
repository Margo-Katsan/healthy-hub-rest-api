const express = require('express');

const usersCtrl = require('../../controllers/users');

const intakesCtrl = require('../../controllers/intakes')

const {  authenticate, isValidId } = require('../../middlewares');

// const { schemas } = require('../../models/user')

const router = express.Router();

router.get('/current', authenticate, usersCtrl.getCurrent);

router.put('/update', authenticate, usersCtrl.updateInfo);

router.put('/goal', authenticate, usersCtrl.updateGoal);

router.post('/weight', authenticate, usersCtrl.addWeight);

router.get('/diary', authenticate, intakesCtrl.getDiary)

router.post('/food-intake', authenticate, intakesCtrl.addFoodIntake);

router.put('/food-intake/:foodId', authenticate, isValidId, intakesCtrl.updateFoodIntake)

router.delete("/food-intake", authenticate, intakesCtrl.deleteFoodIntake)

router.post("/water-intake", authenticate, intakesCtrl.addWaterIntake)

router.delete("/water-intake", authenticate, intakesCtrl.deleteWaterIntake)

// router.get("/statistics", authenticate, ctrl.getStatistics)

module.exports = router;
