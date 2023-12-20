const {ctrlWrapper, getStartAndEndOfDay} = require("../helpers");
const {RecommendedFoods} = require("../models/recommendedFood");
const {DailyMeal} = require("../models/dailyMeal");
const {WaterIntake} = require("../models/waterIntake");
const {User} = require("../models/user");
const getRecommendedFood = async (req, res) => {
    const { _id } = req.user;
    const { startOfDay, endOfDay } = getStartAndEndOfDay();

    let getDailyMeal = await DailyMeal.findOne({ owner: _id, createdAt: { $gte: startOfDay, $lt: endOfDay } })
    if (!getDailyMeal) {
        getDailyMeal = 0;
    }

    const user_data = await User.findById({ _id })
    const recommendedFoodsData = await RecommendedFoods.find()
    const remainingValues = {
        protein: user_data.dailyNutrition.protein - getDailyMeal.totalConsumedProteinPerDay,
        carbs: user_data.dailyNutrition.carbohydrates - getDailyMeal.totalConsumedCarbohydratesPerDay,
        fat: user_data.dailyNutrition.fat - getDailyMeal.totalConsumedFatPerDay,
        calories: user_data.dailyCalories - getDailyMeal.totalConsumedCaloriesPerDay,
    };

    const mostExceededNutrient = Object.keys(remainingValues).reduce((maxNutrient, nutrient) =>
        remainingValues[nutrient] < remainingValues[maxNutrient] ? nutrient : maxNutrient
    );

    recommendedFoodsData.sort((food1, food2) => {
        const nutrientValue = (nutrient) => food1.nutrition[nutrient] - food2.nutrition[nutrient];

        if (mostExceededNutrient === 'protein') return nutrientValue('protein');
        if (mostExceededNutrient === 'carbs') return nutrientValue('carbohydrates');
        if (mostExceededNutrient === 'fat') return nutrientValue('fat');

        return food1.calories - food2.calories;
    });

    res.status(200).json(recommendedFoodsData);
}


module.exports = {
    getRecommendedFood: ctrlWrapper(getRecommendedFood),
}