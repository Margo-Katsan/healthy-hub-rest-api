// const bcrypt = require("bcrypt")

// const jwt = require("jsonwebtoken")

// const gravavatar = require("gravatar")

// const { HttpError, ctrlWrapper } = require("../helpers");

// const { User } = require('../models/user');

// const { SECRET_KEY } = process.env;


// const signup = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     throw HttpError(409, "Email already in use")
//   }
//   let hashPassword;
// try {
//   hashPassword = await bcrypt.hash(password, 10);
// } catch (error) {
//   throw HttpError(500, "Internal Server Error");
// }
//   const avatarURL = gravavatar.url(email)
 

//   const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });
//   const token = jwt.sign({id: newUser._id }, SECRET_KEY, {expiresIn: "23h"})
//   await User.findOneAndUpdate(newUser._id, {token})
  
//   res.status(201).json({
//     token,
//     user: {
//       name: newUser.name ?? '',
//       email: newUser.email,
//     }
    
//   })
// }

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw HttpError(401, "Email or password invalid");
//   }

//   const passwordCompare = await bcrypt.compare(password, user.password);
//   if (!passwordCompare) {
//     throw HttpError(401, "Email or password invalid");
//   }

//   const payload = {
//     id: user._id
//   }
//   const filteredUser = {
//     name: user.name ?? '',
//     email: user.email,
//   }

//   const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})
//   await User.findByIdAndUpdate(user._id, { token })
  
//   res.json({
//     token,
//     user: filteredUser
//   })
  
// }

// const getCurrent = async (req, res) => {
//   const { name, email } = req.user;

//   res.json({
//     name,
//     email,
//   })
// }

// const logout = async (req, res) => {
//   const { _id } = req.user;
//   await User.findByIdAndUpdate(_id, {token: "" });

//   res.status(204).json({
//     message: "Logout success"
//   })
// }


// module.exports = {
//   signup: ctrlWrapper(signup),
//   login: ctrlWrapper(login),
//   getCurrent: ctrlWrapper(getCurrent),
//   logout: ctrlWrapper(logout),

// }