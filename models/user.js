const { Schema, model } = require('mongoose');

const Joi = require('joi');

const {goals, genders, coefficientsOfActivity} = require("../constants/enums")

const { handleMongooseError } = require("../helpers");

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },

  email: {
    type: String,
    match: emailRegex,
    unique: true,
    required: [true, 'Email is required'],
  },

  password: {
    type: String,
    minlength: 8,
    required: [true, 'Set password for user']
  },

  token: {
    type: String,
    default: ""
  },

  avatarURL: {
    type: String,
    default: ""
  },

  age: {
    type: Number,
    min: 8,
    max: 120,
    required: [true, 'Set age for user']
  },

  gender: {
    type: String,
    enum: genders,
    required: [true, 'Set gender for user']
  },

  weight: {
    type: Number,
    min: 20,
    max: 300,
    required: [true, 'Set weight for user']
  },

  height: {
    type: Number,
    min: 120,
    max: 220,
    required: [true, 'Set height for user']
  },
  
  coefficientOfActivity: {
    type: Number,
    enum: coefficientsOfActivity,
    required: [true, 'Set activity for user']
  },

  goal: {
    type: String,
    enum: goals,
    required: [true, 'Set goal for user']
  },

  dailyCalories: {
    type: Number
  },

  dailyWater: {
    type: Number
  },

  dailyNutrition: {
    carbohydrates: Number,
    protein: Number,
    fat: Number
  }

}, { versionKey: false, timestamps: true })

userSchema.post('save', handleMongooseError)

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(8).required(),
  age: Joi.number().min(8).max(120).required(),
  gender: Joi.string().valid(...genders).required(),
  weight: Joi.number().min(20).max(300).required(),
  height: Joi.number().min(120).max(220).required(),
  goal: Joi.string().valid(...goals).required(),
  coefficientOfActivity: Joi.number().valid(...coefficientsOfActivity).required(),
})

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
})

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(8).required()
})

const updateUserInfoSchema = Joi.object({
  age: Joi.number().min(8).max(120),
  weight: Joi.number().min(20).max(300),
  height: Joi.number().min(120).max(220),
  gender: Joi.string().valid(...genders),
  coefficientOfActivity: Joi.number().valid(...coefficientsOfActivity),
  goal: Joi.string().valid(...goals)
})

const updateUserGoalSchema = Joi.object({
  goal: Joi.string().valid(...goals).required()
})

const addUserWeightSchema = Joi.object({
  weight: Joi.number().min(20).max(300).required()
})

const userSchemas = {
  registerSchema,
  emailSchema,
  loginSchema,
  updateUserInfoSchema,
  updateUserGoalSchema,
  addUserWeightSchema
}

const User = model("user", userSchema);

module.exports = {
  User,
  userSchemas
}