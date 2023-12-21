const { Schema, model } = require('mongoose');

const { waterIntakeSchema } = require('./waterIntake');

const { handleMongooseError } = require("../helpers");

const waterIntakesDiarySchema = new Schema({
   owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  waterIntakesByDate: [waterIntakeSchema]
  
}, { versionKey: false, timestamps: true });

waterIntakesDiarySchema.post('save', handleMongooseError)

const WaterIntakesDiary = model("waterIntakesDiaries", waterIntakesDiarySchema, "waterIntakesDiaries");

module.exports = {
  WaterIntakesDiary,
}