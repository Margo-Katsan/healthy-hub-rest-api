const { Schema, model } = require('mongoose');

const { foodIntakeSchema } = require('./foodIntake');

const { handleMongooseError } = require("../helpers");

const mealSummarySchema = new Schema({
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
  },
  totalCalories: {
    type: Number,
    default: 0
  }
});

const dailyMealSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  breakfast: mealSummarySchema,
  lunch: mealSummarySchema,
  dinner: mealSummarySchema,
  snack: mealSummarySchema,
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