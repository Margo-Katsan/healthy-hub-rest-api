const { Schema, model } = require('mongoose');
const {dailyMealSchema} = require('./dailyMeal')
// const Joi = require('joi');
const { handleMongooseError } = require("../helpers");

const foodIntakesDiarySchema = new Schema({
   owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  mealsByDate: [dailyMealSchema]
  
}, { versionKey: false, timestamps: true });

foodIntakesDiarySchema.post('save', handleMongooseError)

const FoodIntakesDiary = model("foodIntakesDiaries", foodIntakesDiarySchema, "foodIntakesDiaries");

module.exports = {
  FoodIntakesDiary,
}