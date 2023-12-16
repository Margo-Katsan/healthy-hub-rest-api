const { Schema, model } = require('mongoose');
// const Joi = require('joi');
const { handleMongooseError } = require("../helpers");

const foodIntakeSchema = new Schema({
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

foodIntakeSchema.post('save', handleMongooseError)

const FoodIntake = model("foodIntakes", foodIntakeSchema, "foodIntakes");

module.exports = {
  FoodIntake,
  foodIntakeSchema
}