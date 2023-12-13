const { HttpError } = require('../helpers');

const validateFile = (req, res, next) => {
  console.log(req.file)
  if (!req.file) {
    return next(HttpError(400, 'No file provided'));
  }

  next();
};

module.exports = validateFile;