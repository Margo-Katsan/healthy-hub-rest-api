const { ctrlWrapper, HttpError, getOrCreateDiary, getStartAndEndOfDay } = require("../helpers")

const { ObjectId } = require('mongodb');

const roundToTenths = require("../calculations/roundToTenths")

const { FoodIntakesDiary } = require("../models/foodIntakesDiary")

const { WaterIntakesDiary } = require("../models/waterIntakesDiary")

const { DailyMeal } = require("../models/dailyMeal")

const { FoodIntake } = require("../models/foodIntake")

const { WaterIntake } = require("../models/waterIntake")

const addFoodIntake = async (req, res) => {
  const { mealType, foods } = req.body;

  const { _id: owner } = req.user;
  
  let updatedMealsByDay;
  
  let wasCreatedNewDailyMeal = false;

  const { startOfDay, endOfDay } = getStartAndEndOfDay();

  const diary = await getOrCreateDiary(owner, FoodIntakesDiary);

  let dailyMeal = await DailyMeal.findOne({ owner, createdAt: { $gte: startOfDay, $lt: endOfDay } })

    if (!dailyMeal) {
    dailyMeal = new DailyMeal({ owner });
    await dailyMeal.save();
    wasCreatedNewDailyMeal = true;
  }

  for (const food of foods) {

    const newFood = await FoodIntake({ ...food, mealType, owner });

    const savedFood = await newFood.save();

    const { calories, nutrition: { carbohydrates, protein, fat }, name } = savedFood;

    dailyMeal = await DailyMeal.findOneAndUpdate(
    { owner, createdAt: { $gte: startOfDay, $lt: endOfDay } },
    {
      $push: { [`${mealType}.foods`]: {calories, nutrition: {carbohydrates, protein, fat}, name } },
      $inc: {
        [`${mealType}.totalCarbohydrates`]: carbohydrates,
        [`${mealType}.totalProtein`]: protein,
        [`${mealType}.totalFat`]: fat,
        [`${mealType}.totalCalories`]: calories,
        [`totalConsumedCarbohydratesPerDay`]: carbohydrates,
        [`totalConsumedProteinPerDay`]: protein,
        [`totalConsumedFatPerDay`]: fat,
        [`totalConsumedCaloriesPerDay`]: calories,
      } 
    },
      { new: true }).select('-owner -createdAt -updatedAt');
    
    dailyMeal[mealType].totalCarbohydrates = roundToTenths(dailyMeal[mealType].totalCarbohydrates)
    dailyMeal[mealType].totalProtein = roundToTenths(dailyMeal[mealType].totalProtein)
    dailyMeal[mealType].totalFat = roundToTenths(dailyMeal[mealType].totalFat)
    dailyMeal[mealType].totalCalories = Math.round(dailyMeal[mealType].totalCalories)
  
    dailyMeal.totalConsumedCaloriesPerDay = Math.round(dailyMeal.totalConsumedCaloriesPerDay)
    dailyMeal.totalConsumedCarbohydratesPerDay = roundToTenths(dailyMeal.totalConsumedCarbohydratesPerDay)
    dailyMeal.totalConsumedProteinPerDay = roundToTenths(dailyMeal.totalConsumedProteinPerDay)
    dailyMeal.totalConsumedFatPerDay = roundToTenths(dailyMeal.totalConsumedFatPerDay)
  }

  if (wasCreatedNewDailyMeal) {
    updatedMealsByDay = {
      $push: {
        mealsByDate: dailyMeal
      }
    }
  }
  else {
    updatedMealsByDay = {
      $set: {
        [`mealsByDate.${diary.mealsByDate.length - 1}`]: dailyMeal
      }
    }
  }

  await FoodIntakesDiary.findOneAndUpdate({ owner }, updatedMealsByDay, { new: true });

  return res.status(201).json(dailyMeal);

};

const updateFoodIntake = async (req, res) => {
  const { foodId } = req.params;
  const { _id: owner } = req.user;
  const { mealType, foodDetails } = req.body;

  const { startOfDay, endOfDay } = getStartAndEndOfDay();

  const diary = await getOrCreateDiary(owner, FoodIntakesDiary);

  const updatedFood = await FoodIntake.findByIdAndUpdate(foodId, foodDetails, { new: true });

  if (!updatedFood) {
    throw HttpError(404, "Not found");
  }

  let dailyMeal = await DailyMeal.findOne({ owner, createdAt: { $gte: startOfDay, $lt: endOfDay } })

  if (!dailyMeal) {
    throw HttpError(404, "Not found");
  }

  const indexFoodToUpdate = dailyMeal[mealType].foods.findIndex(food => food._id.equals(new ObjectId(foodId)));

  const foodBeforeUpdate = dailyMeal[mealType].foods[indexFoodToUpdate]

  dailyMeal = await DailyMeal.findOneAndUpdate(
    { owner, createdAt: { $gte: startOfDay, $lt: endOfDay } },
    {
      $inc: {
        [`${mealType}.totalCarbohydrates`]: -foodBeforeUpdate.nutrition.carbohydrates,
        [`${mealType}.totalProtein`]: -foodBeforeUpdate.nutrition.protein,
        [`${mealType}.totalFat`]: -foodBeforeUpdate.nutrition.fat,
        [`${mealType}.totalCalories`]: -foodBeforeUpdate.calories,
        [`totalConsumedCarbohydratesPerDay`]: -foodBeforeUpdate.nutrition.carbohydrates,
        [`totalConsumedProteinPerDay`]: -foodBeforeUpdate.nutrition.protein,
        [`totalConsumedFatPerDay`]: -foodBeforeUpdate.nutrition.fat,
        [`totalConsumedCaloriesPerDay`]: -foodBeforeUpdate.calories,
      }
    },
    { new: true })

  dailyMeal = await DailyMeal.findOneAndUpdate(
    { owner, createdAt: { $gte: startOfDay, $lt: endOfDay } },
    {
      $set: {
        [`${mealType}.foods.${indexFoodToUpdate}`]: updatedFood 
      },
      $inc: {
        [`${mealType}.totalCarbohydrates`]: updatedFood.nutrition.carbohydrates,
        [`${mealType}.totalProtein`]: updatedFood.nutrition.protein,
        [`${mealType}.totalFat`]: updatedFood.nutrition.fat,
        [`${mealType}.totalCalories`]: updatedFood.calories,
        [`totalConsumedCarbohydratesPerDay`]: updatedFood.nutrition.carbohydrates,
        [`totalConsumedProteinPerDay`]: updatedFood.nutrition.protein,
        [`totalConsumedFatPerDay`]: updatedFood.nutrition.fat,
        [`totalConsumedCaloriesPerDay`]: updatedFood.calories,
      },
    },
    { new: true })
  
  dailyMeal[mealType].totalCarbohydrates = roundToTenths(dailyMeal[mealType].totalCarbohydrates)
  dailyMeal[mealType].totalProtein = roundToTenths(dailyMeal[mealType].totalProtein)
  dailyMeal[mealType].totalFat = roundToTenths(dailyMeal[mealType].totalFat)
  dailyMeal[mealType].totalCalories = Math.round(dailyMeal[mealType].totalCalories)
  

  dailyMeal.totalConsumedCaloriesPerDay = Math.round(dailyMeal.totalConsumedCaloriesPerDay)
  dailyMeal.totalConsumedCarbohydratesPerDay = roundToTenths(dailyMeal.totalConsumedCarbohydratesPerDay)
  dailyMeal.totalConsumedProteinPerDay = roundToTenths(dailyMeal.totalConsumedProteinPerDay)
  dailyMeal.totalConsumedFatPerDay = roundToTenths(dailyMeal.totalConsumedFatPerDay)
  
  await FoodIntakesDiary.findOneAndUpdate(
    { owner },
    {
      $set: {
        [`mealsByDate.${diary.mealsByDate.length - 1}`]: dailyMeal
      }
    })
  
  res.json(dailyMeal)
}

const deleteFoodIntake = async (req, res) => {
  const { _id: owner } = req.user;
  const { mealType } = req.body;

  const { startOfDay, endOfDay } = getStartAndEndOfDay();
  
  const diary = await getOrCreateDiary(owner, FoodIntakesDiary);

  let dailyMeal = await DailyMeal.findOne({ owner, createdAt: { $gte: startOfDay, $lt: endOfDay } })

  if (!dailyMeal) {
    throw HttpError(404, "Not found");
  }

  const foodsToDelete = dailyMeal[mealType];

  await FoodIntake.deleteMany({ owner, mealType, createdAt: { $gte: startOfDay, $lt: endOfDay } });

  dailyMeal = await DailyMeal.findOneAndUpdate(
    { owner, createdAt: { $gte: startOfDay, $lt: endOfDay } },
    {
      $set: {
        [`${mealType}.foods`]: []
      },
      $mul: {
        [`${mealType}.totalCarbohydrates`]: 0,
        [`${mealType}.totalProtein`]: 0,
        [`${mealType}.totalFat`]: 0,
        [`${mealType}.totalCalories`]: 0,
      },
      $inc: {
        [`totalConsumedCaloriesPerDay`]: -foodsToDelete.totalCalories,
        [`totalConsumedCarbohydratesPerDay`]: -foodsToDelete.totalCarbohydrates,
        [`totalConsumedProteinPerDay`]: -foodsToDelete.totalProtein,
        [`totalConsumedFatPerDay`]: -foodsToDelete.totalFat,
      },
    },
    { new: true })

  const updatedDiary = await FoodIntakesDiary.findOneAndUpdate(
    { owner },
    {
      $set: {
        [`mealsByDate.${diary.mealsByDate.length - 1}`]: dailyMeal
      }
    })
  
  if (!updatedDiary) {
    throw HttpError(404, "Not found");
  }
  
  res.json(dailyMeal)
}

const addWaterIntake = async (req, res) => {
  const { _id: owner } = req.user
  let updatedWaterIntakesByDate;

  let wasCreatedNewWaterIntake = false;


  const { startOfDay, endOfDay } = getStartAndEndOfDay();

  let waterIntake = await WaterIntake.findOne({ owner, createdAt: { $gte: startOfDay, $lt: endOfDay } });

  const diary = await getOrCreateDiary(owner, WaterIntakesDiary);

  if (!waterIntake) {
    waterIntake = new WaterIntake({ owner, ml: 0 });
    await waterIntake.save();
    wasCreatedNewWaterIntake = true;
  }

  waterIntake = await WaterIntake.findOneAndUpdate(
    { owner, createdAt: { $gte: startOfDay, $lt: endOfDay } },
    {
      $inc: {
        ml: req.body.ml
      }
    },
    { new: true });
  
  if (wasCreatedNewWaterIntake) {
    updatedWaterIntakesByDate = {
      $push: {
        waterIntakesByDate: waterIntake
      }
    }
  }
  else {
    updatedWaterIntakesByDate = {
      $set: {
        [`waterIntakesByDate.${diary.waterIntakesByDate.length - 1}`]: waterIntake
      }
    }
  }
  
  await WaterIntakesDiary.findOneAndUpdate({ owner }, updatedWaterIntakesByDate, { new: true });

  res.status(201).json(waterIntake);
}

const deleteWaterIntake = async (req, res) => {
  const { _id: owner } = req.user;

  const { startOfDay, endOfDay } = getStartAndEndOfDay();

  const waterIntake = await WaterIntake.findOneAndRemove({ owner, createdAt: { $gte: startOfDay, $lt: endOfDay } })

  if (!waterIntake) {
    throw HttpError(404, "Not found");
  }

  await WaterIntakesDiary.findOneAndUpdate({ owner }, {
    $pull: {waterIntakesByDate: {_id: waterIntake._id}}
  }, { new: true });

  res.json(waterIntake);
}

module.exports = {
  addFoodIntake: ctrlWrapper(addFoodIntake),
  updateFoodIntake: ctrlWrapper(updateFoodIntake),
  deleteFoodIntake: ctrlWrapper(deleteFoodIntake),
  addWaterIntake: ctrlWrapper(addWaterIntake),
  deleteWaterIntake: ctrlWrapper(deleteWaterIntake)
}