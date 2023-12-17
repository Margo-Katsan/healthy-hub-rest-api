const express = require('express');

const {usersCtrl, intakesCtrl} = require('../../controllers')

const {  authenticate, isValidId, validateBody, upload } = require('../../middlewares');

const { userSchemas } = require('../../models/user')

const { foodIntakeSchemas } = require('../../models/foodIntake')

const { waterIntakeSchemas } = require('../../models/waterIntake')

const {weighingSchemas} = require('../../models/weighing')

const router = express.Router();

router.get('/current', authenticate, usersCtrl.getCurrent);

router.put('/update', authenticate, validateBody(userSchemas.updateUserInfoSchema), usersCtrl.updateInfo);

router.put('/goal', authenticate, validateBody(userSchemas.updateUserGoalSchema), usersCtrl.updateGoal);

router.post('/weight', authenticate, validateBody(weighingSchemas.addUserWeighingSchema), usersCtrl.addWeight);

router.post('/food-intake', authenticate, validateBody(foodIntakeSchemas.addFoodIntakeSchema), intakesCtrl.addFoodIntake);

router.put('/food-intake/:foodId', authenticate, isValidId, validateBody(foodIntakeSchemas.updateFoodIntakeSchema), intakesCtrl.updateFoodIntake)

router.delete("/food-intake", authenticate, intakesCtrl.deleteFoodIntake)

router.post("/water-intake", authenticate, validateBody(waterIntakeSchemas.addWaterIntakeSchema), intakesCtrl.addWaterIntake)

router.delete("/water-intake", authenticate, intakesCtrl.deleteWaterIntake)

router.get("/statistics", authenticate, usersCtrl.getStatistic)

router.post('/avatar', authenticate, upload.single('avatar'), usersCtrl.addAvatar);

module.exports = router;
