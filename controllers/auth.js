const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { uuid } = require('uuidv4');
const {transporter, createMailOptions} = require("../googleVerifySender/googleVerifySender");
const calculateDailyCalories = require("../calculations/calculateDailyCalories");
const calculateDailyNutrition = require("../calculations/calculateDailyNutrition");
const calculateDailyWater = require("../calculations/calculateDailyWater");
const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require('../models/user');

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
    weight: 55,
    height: newUser.height,
    gender: newUser.gender,
    coefficientOfActivity: newUser.coefficientOfActivity
  })
  const dailyNutritionCalc = calculateDailyNutrition({
    goal: newUser.goal,
    dailyCalories: dailyCaloriesCall
  })
  const dailyWaterCalc = calculateDailyWater({
    weight: 55,
    coefficientOfActivity: newUser.coefficientOfActivity
  })
  const token = jwt.sign({id: newUser._id }, SECRET_KEY, {expiresIn: "23h"})
  await User.findOneAndUpdate(newUser._id, {token,
    dailyCalories:dailyCaloriesCall,
    dailyNutrition:dailyNutritionCalc,
    dailyWater:dailyWaterCalc
  })
  
  res.status(201).json({
    token,
    user: {
      name: newUser.name ?? '',
      email: newUser.email,
    }
    
  })
}

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
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
  const filteredUser = {
    name: user.name ?? '',
    email: user.email,
  }

  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})
  await User.findByIdAndUpdate(user._id, { token })
  
  res.json({
    token,
    user: filteredUser
  })
  
}

const updatePassword = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOne({ _id });
  const new_password = uuid().slice(0, 10)
  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(new_password, 10);
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
  await User.findByIdAndUpdate(_id, {password: hashPassword });

  const mailOptions = createMailOptions(user.email, new_password)

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({message: "Internal server error"})
    }
  });
  res.status(201).json({
    message: "New password is send to your email"
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
  updatePassword: ctrlWrapper(updatePassword),
}