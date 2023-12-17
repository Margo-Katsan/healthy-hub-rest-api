const { Schema, model } = require('mongoose');

const Joi = require('joi');

const { handleMongooseError } = require("../helpers");

const waterIntakeSchema = new Schema({
  ml: {
    type: Number,
    required: [true, 'set ml for water intake']
  },

   owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  
}, { versionKey: false, timestamps: true });

waterIntakeSchema.post('save', handleMongooseError)

const addWaterIntakeSchema = Joi.object({
  ml: Joi.number().required()
})

const waterIntakeSchemas = {
  addWaterIntakeSchema
}

const WaterIntake = model("waterIntakes", waterIntakeSchema, "waterIntakes");

module.exports = {
  WaterIntake,
  waterIntakeSchema,
  waterIntakeSchemas
}