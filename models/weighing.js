const { Schema, model } = require('mongoose');
// const Joi = require('joi');
const { handleMongooseError } = require("../helpers");

const weighingSchema = new Schema({
  
  kg: {
    type: Number,
    required: true
  },
   owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  
}, { versionKey: false, timestamps: true });

weighingSchema.post('save', handleMongooseError)


const Weighing = model("weighing", weighingSchema);

module.exports = {
  Weighing,
  weighingSchema
}