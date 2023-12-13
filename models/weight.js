const { Schema, model } = require('mongoose');
// const Joi = require('joi');
const { handleMongooseError } = require("../helpers");

const weightSchema = new Schema({
  kg: {
    type: Number

  },
   owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  
}, { versionKey: false, timestamps: true });

weightSchema.post('save', handleMongooseError)


const Weight = model("water", weightSchema);

module.exports = {
  Weight,
}