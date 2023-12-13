const { Schema, model } = require('mongoose');
// const Joi = require('joi');
const { handleMongooseError } = require("../helpers");

const recommendedFoodSchema = new Schema({
  name: String, 
  amount: String,
  img: String,
  calories: Number,
  nutrition: {
    carbohydrates: Number,
    protein: Number,
    fat: Number
  }
  
}, { versionKey: false, timestamps: true });

recommendedFoodSchema.post('save', handleMongooseError)

const RecommendedFood = model("recommendedFood", recommendedFoodSchema);

module.exports = {
  RecommendedFood,
}