const { ctrlWrapper } = require("../helpers")

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

const getOrCreateDailyMeal = async (owner) => {
  let meal = await DailyMeal.findOne({ owner });

  if (!meal || meal.createdAt.toDateString() !== new Date().toDateString()) {
    meal = new DailyMeal({ owner });
    await meal.save();
  }

  return meal;
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

  await getOrCreateDiary(owner, FoodIntakesDiary);

  let dailyMeal = await getOrCreateDailyMeal(owner);

  const newFood = new FoodIntake(foodDetails);

  const savedFood = await newFood.save();

  const updatedDailyMeal = getUpdatedDailyMeal(mealType, savedFood);

  dailyMeal = await DailyMeal.findOneAndUpdate({ owner }, updatedDailyMeal, { new: true });

  const updatedMealsByDay = { mealsByDate: dailyMeal };

  const updatedDiary = await FoodIntakesDiary.findOneAndUpdate({ owner }, updatedMealsByDay, { new: true });

  return res.status(200).json(updatedDiary);

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
  let water = await WaterIntake.findOne({ owner });

  await getOrCreateDiary(owner, WaterIntakesDiary);
  
  if (!water || water.createdAt.toDateString() !== new Date().toDateString()) {
    
    water = new WaterIntake({ ...req.body, owner });
    const savedWater = await water.save();
    
    updatedWaterIntakesByDate = {
      $push: {waterIntakesByDate: savedWater}
    }
  }

  else {
    const updatedWater = await WaterIntake.findOneAndUpdate({ owner }, { $inc: { ml: req.body.ml } })

    updatedWaterIntakesByDate = {
      waterIntakesByDate: updatedWater
    }

  }

  const result = await WaterIntakesDiary.findOneAndUpdate({ owner }, updatedWaterIntakesByDate, { new: true });
  res.status(201).json(result);
  
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