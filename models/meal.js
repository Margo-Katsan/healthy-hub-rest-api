const { Schema, model } = require('mongoose');
// const Joi = require('joi');
const { handleMongooseError } = require("../helpers");

const mealSchema = new Schema({
  name: {
    type: String,
    required: true

  },
  nutrition: {
    carbohydrates: Number,
    protein: Number,
    fat: Number
  },
  calories: {
    type: Number,
    required: true
  }
  
}, { versionKey: false, timestamps: true });

mealSchema.post('save', handleMongooseError)

const Meal = model("meal", mealSchema);

module.exports = {
  Meal,
  mealSchema
}