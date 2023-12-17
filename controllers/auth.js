const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');
const {transporter, createMailOptions} = require("../googleVerifySender/googleVerifySender");
const calculateDailyCalories = require("../calculations/calculateDailyCalories");
const calculateDailyNutrition = require("../calculations/calculateDailyNutrition");
const calculateDailyWater = require("../calculations/calculateDailyWater");
const { HttpError, ctrlWrapper, creatingWeighingsDiary } = require("../helpers");
const { User } = require('../models/user');
const { WeighingsDiary } = require("../models/weighingsDiary");

const { Weighing } = require("../models/weighing");

const { SECRET_KEY } = process.env;


const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use")
  }
  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
 
  const newUser = await User.create({ ...req.body, password: hashPassword });
  const dailyCaloriesCall = calculateDailyCalories({
    age: newUser.age,
    weight: newUser.weight,
    height: newUser.height,
    gender: newUser.gender,
    coefficientOfActivity: newUser.coefficientOfActivity
  })
  const dailyNutritionCalc = calculateDailyNutrition({
    goal: newUser.goal,
    dailyCalories: dailyCaloriesCall
  })
  const dailyWaterCalc = calculateDailyWater({
    weight: newUser.weight,
    coefficientOfActivity: newUser.coefficientOfActivity
  })
  const token = jwt.sign({id: newUser._id }, SECRET_KEY, {expiresIn: "23h"})
  await User.findOneAndUpdate(newUser._id, {token,
    dailyCalories:dailyCaloriesCall,
    dailyNutrition:dailyNutritionCalc,
    dailyWater:dailyWaterCalc
  })

  await creatingWeighingsDiary(newUser._id, newUser.weight, WeighingsDiary, Weighing)
  const dataForResponse = await User.findOne({ email }).select('-password');
  res.status(201).json({
    token,
    user: dataForResponse
  })
}

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id
  }

  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})
  await User.findByIdAndUpdate(user._id, { token })
  const dataForResponse = await User.findOne({ email }).select('-password');

  res.json({
    user: dataForResponse
  })
  
}

const forgotPassword = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({message: "missing field email"});
  }
  const { email } = req.body;
  if (email === undefined){
    return res.status(400).send({message: "required only email field"});
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, `No user with email ${email}`);
  }
  const newPassword = uuidv4().slice(0, 10)
  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(newPassword, 10);
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
  await User.findByIdAndUpdate(user._id, {password: hashPassword });

  const mailOptions = createMailOptions(user.email, newPassword)

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({message: "Internal server error"})
    }
  });
  res.status(201).json({
    message: "New password was sent to your email"
  })
}

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, {token: "" });

  res.status(204).json({
    message: "Logout success"
  })
}


module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  forgotPassword: ctrlWrapper(forgotPassword),
}