const { Schema, model } = require('mongoose');
// const Joi = require('joi');
const { handleMongooseError } = require("../helpers");

const waterIntakeSchema = new Schema({
  ml: {
    type: Number

  },
   owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  
}, { versionKey: false, timestamps: true });

waterIntakeSchema.post('save', handleMongooseError)

const WaterIntake = model("waterIntakes", waterIntakeSchema, "waterIntakes");

module.exports = {
  WaterIntake,
  waterIntakeSchema
}