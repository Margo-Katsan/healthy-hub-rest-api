const { Schema, model } = require('mongoose');
const { foodIntakeSchema } = require('./foodIntake')
// const Joi = require('joi');
const { handleMongooseError } = require("../helpers");

const dailyMealSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  breakfast: {
    foods: [foodIntakeSchema],
    totalCarbohydrates: {
      type: Number,
      default: 0
    },
    totalProtein: {
      type: Number,
      default: 0
    },
    totalFat: {
      type: Number,
      default: 0
    }
  },
  lunch: {
    foods: [foodIntakeSchema],
    totalCarbohydrates: {
      type: Number,
      default: 0
    },
    totalProtein: {
      type: Number,
      default: 0
    },
    totalFat: {
      type: Number,
      default: 0
    }
  },
  dinner: {
    foods: [foodIntakeSchema],
    totalCarbohydrates: {
      type: Number,
      default: 0
    },
    totalProtein: {
      type: Number,
      default: 0
    },
    totalFat: {
      type: Number,
      default: 0
    }
  },
  snack: {
    foods: [foodIntakeSchema],
    totalCarbohydrates: {
      type: Number,
      default: 0
    },
    totalProtein: {
      type: Number,
      default: 0
    },
    totalFat: {
      type: Number,
      default: 0
    }
  },
  totalConsumedCarbohydratesPerDay: Number,
  totalConsumedProteinPerDay: Number,
  totalConsumedFatPerDay: Number,
  totalConsumedCaloriesPerDay: Number
  
}, { versionKey: false, timestamps: true });

dailyMealSchema.post('save', handleMongooseError)

const DailyMeal = model("dailyMeals", dailyMealSchema, "dailyMeals");

module.exports = {
  DailyMeal,
  dailyMealSchema
}