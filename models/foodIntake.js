const { Schema, model } = require('mongoose');

const Joi = require('joi');

const { mealTypes } = require("../constants/enums");

const { handleMongooseError } = require("../helpers");

const foodIntakeSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  mealType: {
    type: String,
    enum: mealTypes,
    required: true
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
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

foodIntakeSchema.post('save', handleMongooseError);

const foodDetails = Joi.object({
  name: Joi.string().required(),
  nutrition: Joi.object({
    carbohydrates: Joi.number().required(),
    protein: Joi.number().required(),
    fat: Joi.number().required()
  }),
  calories: Joi.number().required()
})

const addFoodIntakeSchema = Joi.object({
  mealType: Joi.string().valid(...mealTypes).required(),
  foods: Joi.array().items(foodDetails)
})

const updateFoodIntakeSchema = Joi.object({
  mealType: Joi.string().valid(...mealTypes).required(),
  foodDetails: foodDetails
})

const foodIntakeSchemas = {
  addFoodIntakeSchema,
  updateFoodIntakeSchema
}

const FoodIntake = model("foodIntakes", foodIntakeSchema, "foodIntakes");

module.exports = {
  FoodIntake,
  foodIntakeSchema,
  foodIntakeSchemas
}