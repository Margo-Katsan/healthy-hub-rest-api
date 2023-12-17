const { ctrlWrapper, creatingWeighingsDiary} = require("../helpers")

const { DailyMeal } = require("../models/dailyMeal")

const { WeighingsDiary } = require("../models/weighingsDiary");

const { Weighing } = require("../models/weighing");

const { User } = require("../models/user")

const calculateDailyCalories = require("../calculations/calculateDailyCalories");

const calculateDailyNutrition = require("../calculations/calculateDailyNutrition");

const calculateDailyWater = require("../calculations/calculateDailyWater");

const getCurrent = async (req, res) => {
  const { _id: owner, name, goal, weight, dailyCalories, dailyNutrition, dailyWater } = req.user;
  let getDailyMeal = await DailyMeal.findOne({ owner, createdAt: { $gte: new Date('2023-12-18'), $lt: new Date('2023-12-19') } })
  if (!getDailyMeal) {
    getDailyMeal = null;
  }
  res.json({
    name,
    goal,
    weight,
    dailyCalories,
    dailyNutrition: {...dailyNutrition},
    dailyWater,
    consumedMealsByDay: getDailyMeal
  })

}

const updateInfo = async (req, res) => {
  const { _id } = req.user;
  const { age, weight, height, gender, coefficientOfActivity, goal } = req.body;
  const dailyCaloriesCalc = calculateDailyCalories({
    age,
    weight,
    height,
    gender,
    coefficientOfActivity
  })

  const dailyNutritionCalc = calculateDailyNutrition({
    goal: goal,
    dailyCalories: dailyCaloriesCalc
  })

  const dailyWaterCalc = calculateDailyWater({
    weight,
    coefficientOfActivity: coefficientOfActivity
  })
await creatingWeighingsDiary(_id, weight, WeighingsDiary, Weighing)
  const updatedUser = await User.findByIdAndUpdate({ _id }, { ...req.body, dailyNutrition: dailyNutritionCalc, dailyWater: dailyWaterCalc , dailyCalories: dailyCaloriesCalc }, { new: true })
  res.json(updatedUser)

}

const updateGoal = async (req, res) => {
  const { _id, dailyCalories } = req.user;
  const { goal } = req.body;

  const dailyNutritionCalc = calculateDailyNutrition({
    goal: goal,
    dailyCalories: dailyCalories
  })
  
  const updatedUser = await User.findByIdAndUpdate({ _id }, { dailyNutrition: dailyNutritionCalc, goal }, { new: true })
  res.json(updatedUser)
  
}

const addWeight = async (req, res) => {
  const { _id, age, height, gender, coefficientOfActivity, goal } = req.user;
  const { weight } = req.body;
  
 

  const dailyCaloriesCalc = calculateDailyCalories({
    age,
    weight,
    height,
    gender,
    coefficientOfActivity
  })

  const dailyNutritionCalc = calculateDailyNutrition({
    goal: goal,
    dailyCalories: dailyCaloriesCalc
  })

  const dailyWaterCalc = calculateDailyWater({
    weight,
    coefficientOfActivity: coefficientOfActivity
  })


  await creatingWeighingsDiary(_id, weight, WeighingsDiary, Weighing)
  const updatedUser = await User.findByIdAndUpdate({ _id }, { dailyNutrition: dailyNutritionCalc, weight, dailyWater: dailyWaterCalc , dailyCalories: dailyCaloriesCalc }, { new: true })
  res.json(updatedUser)

}

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateInfo: ctrlWrapper(updateInfo),
  updateGoal: ctrlWrapper(updateGoal),
  addWeight: ctrlWrapper(addWeight)
}