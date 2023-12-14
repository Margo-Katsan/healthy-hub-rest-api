const { ctrlWrapper,  } = require("../helpers")

const { Diary } = require("../models/diary")

const {Meal} =require("../models/meal")

const getDiary = async (req, res) => {
  // const { _id: owner } = req.user;
  const result = await Diary.find()
  res.json(result)
}

const addFoodIntake = async (req, res) => {
  const { ownerId, mealType, foodDetails } = req.body;

  let diary = await Diary.findOne({ owner: ownerId });

  if (!diary) {
    diary = new Diary({ owner: ownerId });
    await diary.save();
  }

  const newMeal = new Meal({
    name: foodDetails.name,
    category: foodDetails.category,
    nutrition: {
      carbohydrates: foodDetails.nutrition.carbohydrates,
      protein: foodDetails.nutrition.protein,
      fat: foodDetails.nutrition.fat
    },
    calories: foodDetails.calories
  });

  const savedMeal = await newMeal.save();

  const updateQuery = {
    $push: {
      [`${mealType}.meals`]: savedMeal,
    },
    $inc: {
    [`${mealType}.totalCarbohydrates`]: savedMeal.nutrition.carbohydrates,
    [`${mealType}.totalProtein`]: savedMeal.nutrition.protein,
    [`${mealType}.totalFat`]: savedMeal.nutrition.fat
  }

  };

// заменить на поиск по юзеру
  const updatedDiary = await Diary.findByIdAndUpdate(
    { _id: diary._id },
    updateQuery,
    { new: true }
  );

  return res.status(200).json(updatedDiary);
}

const updateFoodIntake = async (req, res) => {
  
}
const deleteFoodIntake = async (req, res) => {
  
}
const addWaterIntake = async (req, res) => {
  
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