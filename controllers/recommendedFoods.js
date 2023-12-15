const {ctrlWrapper} = require("../helpers");
const {RecommendedFoods} = require("../models/recommendedFood");
const getRecommendedFood = async (req, res) => {
    const recommendedFoodsData = await RecommendedFoods.find()
    res.status(200).json(recommendedFoodsData);
}


module.exports = {
    getRecommendedFood: ctrlWrapper(getRecommendedFood),
}