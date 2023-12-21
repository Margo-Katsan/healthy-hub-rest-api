const { Schema, model } = require('mongoose');

const { weighingSchema } = require('./weighing');

const { handleMongooseError } = require("../helpers");

const weighingsDiarySchema = new Schema({
   owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  weighingsByDate: [weighingSchema]
  
}, { versionKey: false, timestamps: true });

weighingsDiarySchema.post('save', handleMongooseError)

const WeighingsDiary = model("weighingsDiaries", weighingsDiarySchema, "weighingsDiaries");

module.exports = {
  WeighingsDiary,
}