const { ctrlWrapper } = require("../helpers")

// const roundToTenths = require("../calculations/roundToTenths")

const { FoodIntakesDiary } = require("../models/foodIntakesDiary")

const { WaterIntakesDiary } = require("../models/waterIntakesDiary")

const { DailyMeal } = require("../models/dailyMeal")

const { FoodIntake } = require("../models/foodIntake")

const { WaterIntake } = require("../models/waterIntake")

const getOrCreateDiary = async (owner, Diary) => {
  let diary = await Diary.findOne({ owner });

  if (!diary) {
    diary = new Diary({ owner });
    await diary.save();
  }

  return diary;
};

const getUpdatedDailyMeal = (mealType, savedFood) => ({
  $push: { [`${mealType}.foods`]: savedFood },
  $inc: {
    [`${mealType}.totalCarbohydrates`]: savedFood.nutrition.carbohydrates,
    [`${mealType}.totalProtein`]: savedFood.nutrition.protein,
    [`${mealType}.totalFat`]: savedFood.nutrition.fat,
    [`totalConsumedCarbohydratesPerDay`]: savedFood.nutrition.carbohydrates,
    [`totalConsumedProteinPerDay`]: savedFood.nutrition.protein,
    [`totalConsumedFatPerDay`]: savedFood.nutrition.fat,
    [`totalConsumedCaloriesPerDay`]: savedFood.calories,
  },
});

const getDiary = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await FoodIntakesDiary.find({owner})
  res.json(result)
}

const addFoodIntake = async (req, res) => {
  const { mealType, foodDetails } = req.body;
  const { _id: owner } = req.user;
  
  let updatedMealsByDay;

  let wasCreatedNewDailyMeal = false;
  
  const newFood = new FoodIntake(foodDetails);

  const savedFood = await newFood.save();

  const diary = await getOrCreateDiary(owner, FoodIntakesDiary);
  // потом заменить на текущую дату
  let dailyMeal = await DailyMeal.findOne({ owner, createdAt: { $gte: new Date('2023-12-17'), $lt: new Date('2023-12-18') } })

  if (!dailyMeal) {
    dailyMeal = new DailyMeal({ owner });
    await dailyMeal.save();
    wasCreatedNewDailyMeal = true;
  }
  // потом заменить на текущую дату
  dailyMeal = await DailyMeal.findOneAndUpdate({ owner, createdAt: { $gte: new Date('2023-12-17'), $lt: new Date('2023-12-18') } }, getUpdatedDailyMeal(mealType, savedFood), { new: true });
  
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

  return res.status(200).json(dailyMeal);

};

const updateFoodIntake = async (req, res) => {
  // const { foodId } = req.params;

  // const result = await FoodIntake.findByIdAndUpdate(foodId, req.body, { new: true });

  // if (!result) {
  //   throw HttpError(404, "Not found")
  // }
  // res.json(result);
}

const deleteFoodIntake = async (req, res) => {
  // const { mealType } = req.body;
  //   const { _id: owner } = req.user;


  //   const diary = await FoodIntakesDiary.findOne({ owner });
  //   console.log(owner)
  //   if (!diary) {
  //     return res.status(404).json({ error: 'Diary not found' });
  //   }

  //   diary.mealsByDate.forEach((meal) => {
  //     if (meal[mealType]) {
  //       meal[mealType].foods = [];
  //       meal[mealType].totalCarbohydrates = 0;
  //       meal[mealType].totalProtein = 0;
  //       meal[mealType].totalFat = 0;
  //     }
  //   });

  //   const updatedDiary = await diary.save();

  //   return res.json(updatedDiary);

  
}

const addWaterIntake = async (req, res) => {
  const { _id: owner } = req.user
  let updatedWaterIntakesByDate;

  let wasCreatedNewWaterIntake = false;

  let waterIntake = await WaterIntake.findOne({ owner, createdAt: { $gte: new Date('2023-12-17'), $lt: new Date('2023-12-18') } });

  const diary = await getOrCreateDiary(owner, WaterIntakesDiary);

  if (!waterIntake) {
    waterIntake = new WaterIntake({ owner });
    await waterIntake.save();
    wasCreatedNewWaterIntake = true;
  }

  waterIntake = await WaterIntake.findOneAndUpdate(
    { owner, createdAt: { $gte: new Date('2023-12-17'), $lt: new Date('2023-12-18') } },
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
  
}

module.exports = {
  getDiary: ctrlWrapper(getDiary),
  addFoodIntake: ctrlWrapper(addFoodIntake),
  updateFoodIntake: ctrlWrapper(updateFoodIntake),
  deleteFoodIntake: ctrlWrapper(deleteFoodIntake),
  addWaterIntake: ctrlWrapper(addWaterIntake),
  deleteWaterIntake: ctrlWrapper(deleteWaterIntake)
}