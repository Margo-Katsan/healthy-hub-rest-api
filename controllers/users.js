const { ctrlWrapper, creatingWeighingsDiary} = require("../helpers")

const { DailyMeal } = require("../models/dailyMeal")

const { WeighingsDiary } = require("../models/weighingsDiary");

const { Weighing } = require("../models/weighing");

const { User } = require("../models/user")

const calculateDailyCalories = require("../calculations/calculateDailyCalories");

const calculateDailyNutrition = require("../calculations/calculateDailyNutrition");

const calculateDailyWater = require("../calculations/calculateDailyWater");

const {WaterIntake} = require("../models/waterIntake");

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

const getStatistic = async (req, res) => {
    const { month } = req.query;
    if (!month) {
        return res.status(400).send({ message: "missing or invalid 'month' parameter" });
    }

    const parsedMonth = parseInt(month, 10);

    if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
        return res.status(400).send({ message: "invalid 'month' parameter" });
    }
    const {_id} = req.user;
    const startOfMonth = new Date(new Date().getFullYear(), month - 1, 1);
    const endOfMonth = new Date(new Date().getFullYear(), month, 0);
    const mealsForMonth = await DailyMeal.find({
        owner: _id,
        createdAt: {$gte: startOfMonth, $lte: endOfMonth}
    });
    const weightForMonth = await Weighing.find({
        owner: _id,
        createdAt: {$gte: startOfMonth, $lte: endOfMonth}
    })
    const waterForMonth = await WaterIntake.find({
        owner: _id,
        createdAt: {$gte: startOfMonth, $lte: endOfMonth}
    })
    let dataByMonth = { callPerDay: [], weightPerDay: [], waterPerDay: [] };
    for (const entry of mealsForMonth) {
        const totalCalories = entry.totalConsumedCaloriesPerDay || 0;
        const day = entry.createdAt.getDate();

        dataByMonth.callPerDay.push({
            day: day,
            calories: totalCalories
        });
    }
    let previous_day = null
    let previous_weight = null
    for (const entry of weightForMonth) {
        const weight = entry.kg || 0;
        const day = entry.createdAt.getDate();
        if (previous_day !== null && day - previous_day !== 1) {
            dataByMonth.weightPerDay.push({
                day: previous_day + 1,
                weight: previous_weight
            })
        }
        previous_weight = weight
        previous_day = day

        dataByMonth.weightPerDay.push({
            day: day,
            weight: weight
        });
    }
    for (const entry of waterForMonth) {
        const totalWater = entry.ml || 0;
        const day = entry.createdAt.getDate();

        dataByMonth.waterPerDay.push({
            day: day,
            ml: totalWater
        });
    }
    const totalCalories = dataByMonth.callPerDay.reduce((acc, entry) => acc + entry.calories, 0);
    dataByMonth.avgCalories = totalCalories / dataByMonth.callPerDay.length;
    const totalWeight = dataByMonth.weightPerDay.reduce((acc, entry) => acc + entry.weight, 0);
    dataByMonth.avgWeight = totalWeight / dataByMonth.weightPerDay.length;
    const totalWater = dataByMonth.waterPerDay.reduce((acc, entry) => acc + entry.ml, 0);
    dataByMonth.avgWater = totalWater / dataByMonth.waterPerDay.length;
    res.json(dataByMonth);
};


module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateInfo: ctrlWrapper(updateInfo),
  updateGoal: ctrlWrapper(updateGoal),
  getStatistic: ctrlWrapper(getStatistic),
  addWeight: ctrlWrapper(addWeight)
}