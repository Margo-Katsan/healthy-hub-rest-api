const { Schema, model } = require('mongoose');
const {mealSchema} = require('./meal')
// const Joi = require('joi');
const { handleMongooseError } = require("../helpers");

const diarySchema = new Schema({
   owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  breakfast: {
    meals: [mealSchema],
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
    meals: [mealSchema],
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
    meals: [mealSchema],
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
    meals: [mealSchema],
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

}, { versionKey: false, timestamps: true });

diarySchema.post('save', handleMongooseError)

const Diary = model("diary", diarySchema);

module.exports = {
  Diary,
}