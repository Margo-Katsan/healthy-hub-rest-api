const { Schema, model } = require('mongoose');

const Joi = require('joi');

const { handleMongooseError } = require("../helpers");

const weighingSchema = new Schema({
  weight: {
    type: Number,
    required: [true, 'set weight for user']
  },
  
   owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  
}, { versionKey: false, timestamps: true });

weighingSchema.post('save', handleMongooseError)

const addUserWeighingSchema = Joi.object({
  weight: Joi.number().required()
})

const weighingSchemas = {
  addUserWeighingSchema
}

const Weighing = model("weighing", weighingSchema);

module.exports = {
  Weighing,
  weighingSchema,
  weighingSchemas
}