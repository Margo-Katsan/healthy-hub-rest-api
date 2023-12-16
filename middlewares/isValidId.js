const { isValidObjectId } = require('mongoose');

const { HttpError } = require("../helpers")

const isValidId = (req, res, next) => {
  const { foodId } = req.params;
  if (!isValidObjectId(foodId )) {
    next(HttpError(400, `${foodId } is not valid id`));
  }
  next();
}

module.exports = isValidId;