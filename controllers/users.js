const { ctrlWrapper, } = require("../helpers")
// const { User } = require("../models/user")

const getCurrent = async (req, res) => {

}

const updateInfo = async (req, res) => {

}

const updateGoal = async (req, res) => {
  
}

const addWeight = async (req, res) => {

}

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateInfo: ctrlWrapper(updateInfo),
  updateGoal: ctrlWrapper(updateGoal),
  addWeight: ctrlWrapper(addWeight)
}