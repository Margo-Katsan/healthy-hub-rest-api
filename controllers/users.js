const { ctrlWrapper, creatingWeighingsDiary, getStartAndEndOfDay } = require("../helpers")

const { calculateDailyCalories, calculateDailyNutrition, calculateDailyWater } = require("../calculations");

const { DailyMeal } = require("../models/dailyMeal")

const { WeighingsDiary } = require("../models/weighingsDiary");

const { Weighing } = require("../models/weighing");

const { User } = require("../models/user")

const {WaterIntake} = require("../models/waterIntake");

const getCurrent = async (req, res) => {
  const { _id, dailyNutrition, avatarURL, name, email, age, gender, weight, height, coefficientOfActivity, goal, dailyCalories, dailyWater } = req.user;

  const { startOfDay, endOfDay } = getStartAndEndOfDay();

  const getDailyMeal = await DailyMeal.findOne({ owner: _id, createdAt: { $gte: startOfDay, $lt: endOfDay } }) ?? 0

  const getWaterIntake = await WaterIntake.findOne({ owner: _id, createdAt: { $gte: startOfDay, $lt: endOfDay } }) ?? 0

  res.json({
    user: {
      _id,
      name,
      email,
      age,
      gender,
      weight,
      height,
      coefficientOfActivity,
      goal,
      dailyNutrition,
      dailyCalories,
      dailyWater,
      avatarURL,
    },
    consumedMealsByDay: getDailyMeal,
    consumedWaterByDay: getWaterIntake,
  })

}

const updateInfo = async (req, res) => {
  const { _id, goal } = req.user;
  const { age, weight, height, gender, coefficientOfActivity } = req.body;

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

  const updatedUser = await User.findByIdAndUpdate(
    { _id },
    { ...req.body, dailyNutrition: dailyNutritionCalc, dailyWater: dailyWaterCalc, dailyCalories: dailyCaloriesCalc },
    { new: true }).select('-password -createdAt -updatedAt')
  
  res.json(updatedUser)

}

const updateGoal = async (req, res) => {
  const { _id, dailyCalories } = req.user;
  const { goal } = req.body;

  const dailyNutritionCalc = calculateDailyNutrition({
    goal: goal,
    dailyCalories: dailyCalories
  })
  
  const updatedUser = await User.findByIdAndUpdate(
    { _id },
    { dailyNutrition: dailyNutritionCalc, goal },
    { new: true }
  ).select('dailyNutrition goal')

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

  const updatedUser = await User.findByIdAndUpdate(
    { _id },
    { dailyNutrition: dailyNutritionCalc, weight, dailyWater: dailyWaterCalc, dailyCalories: dailyCaloriesCalc },
    { new: true }
  ).select('dailyNutrition weight dailyWater dailyCalories');
  
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
    const dataByMonth = { callPerDay: [], weightPerDay: [], waterPerDay: [] };
    for (const entry of mealsForMonth) {
        const totalCalories = entry.totalConsumedCaloriesPerDay || 0;
        const day = entry.createdAt.getDate();

        dataByMonth.callPerDay.push({
            day: day,
            calories: totalCalories
        });
    }
    let previousDay = null
    let previousWeight = null
    for (const entry of weightForMonth) {
        const weight = entry.weight || 0;
        const day = entry.createdAt.getDate();
        if (previousDay !== null && day - previousDay !== 1) {
            dataByMonth.weightPerDay.push({
                day: previousDay + 1,
                weight: previousWeight
            })
        }
        previousWeight = weight
        previousDay = day

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

const addAvatar = async (req, res) => {
  const { _id } = req.user;
  const avatarURL = req.file.path;
  
  const updatedUser = await User.findOneAndUpdate(
    { _id },
    { avatarURL },
    { new: true });

  res.json(updatedUser.avatarURL ?? '')
}

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateInfo: ctrlWrapper(updateInfo),
  updateGoal: ctrlWrapper(updateGoal),
  getStatistic: ctrlWrapper(getStatistic),
  addWeight: ctrlWrapper(addWeight),
  addAvatar: ctrlWrapper(addAvatar)
}