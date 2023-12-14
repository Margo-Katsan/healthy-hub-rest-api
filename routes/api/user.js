const express = require('express');

const UsersCtrl = require('../../controllers/users');

const DiariesCtrl = require('../../controllers/diaries')

const {  authenticate } = require('../../middlewares');

// const { schemas } = require('../../models/user')

const router = express.Router();

router.get('/current', authenticate, UsersCtrl.getCurrent);

router.put('/update', authenticate, UsersCtrl.updateInfo);

router.put('/goal', authenticate, UsersCtrl.updateGoal);

router.post('/weight', authenticate, UsersCtrl.addWeight);

router.get('/diary', DiariesCtrl.getDiary)

router.post('/food-intake', DiariesCtrl.addFoodIntake);

router.put('/food-intake/:id', DiariesCtrl.updateFoodIntake)

router.delete("/food-intake", DiariesCtrl.deleteFoodIntake)

router.post("/water-intake", authenticate, DiariesCtrl.addWaterIntake)

router.delete("/water-intake", authenticate, DiariesCtrl.deleteWaterIntake)

// router.get("/statistics", authenticate, ctrl.getStatistics)

module.exports = router;
