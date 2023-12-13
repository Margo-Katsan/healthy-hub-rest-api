const express = require('express');

const ctrl = require('../../controllers/users');

const { isValidId, authenticate } = require('../../middlewares');

// const { schemas } = require('../../models/user')

const router = express.Router();

router.get('/current', authenticate, ctrl.getCurrent);

router.put('/update', authenticate, ctrl.updateInfo);

router.put('/goal', authenticate, ctrl.updateGoal);

router.post('/weight', authenticate, ctrl.addWeight);

router.post('/food-intake', authenticate, ctrl.addFoodIntake);

router.put('/food-intake/:id', authenticate, isValidId, ctrl.updateFoodIntake)

router.delete("/food-intake", authenticate, ctrl.deleteFoodIntake)

router.post("/water-intake", authenticate, ctrl.addWaterIntake)

router.delete("/water-intake", authenticate, ctrl.deleteWaterIntake)

router.get("/statistics", authenticate, ctrl.getStatistics)

module.exports = router;
