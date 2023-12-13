const { Schema, model } = require('mongoose');
// const Joi = require('joi');
const { handleMongooseError } = require("../helpers");

const diarySchema = new Schema({
  name: {
    type: String,
    required: true

  },
  category: {
    type: String,
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

diarySchema.post('save', handleMongooseError)

// const schemas = {
//   
// }

const Diary = model("meal", diarySchema);

module.exports = {
  Diary,
  // schemas
}