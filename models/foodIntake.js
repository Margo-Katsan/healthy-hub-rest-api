const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require("../helpers");

const foodIntakeSchema = new Schema({
  name: {
    type: String,
    required: true

  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
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

foodIntakeSchema.post('save', handleMongooseError)

const addFoodIntakeSchema = Joi.object({
  mealType: Joi.string().valid('breakfast', 'lunch', 'dinner', 'snack').required(),
  foodDetails: Joi.object({
    name: Joi.string().required(),
    nutrition: Joi.object({
      carbohydrates: Joi.number().required(),
      protein: Joi.number().required(), 
      fat: Joi.number().required() 
    }),
    calories: Joi.number().required()
  })

})

const updateFoodIntakeSchema = Joi.object({
  mealType: Joi.string().valid('breakfast', 'lunch', 'dinner', 'snack').required(),
  foodDetails: Joi.object({
    name: Joi.string().required(),
    nutrition: Joi.object({
      carbohydrates: Joi.number().required(),
      protein: Joi.number().required(), 
      fat: Joi.number().required() 
    }),
    calories: Joi.number().required()
  })
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