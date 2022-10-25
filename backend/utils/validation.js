// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
      _res.status(400);
      _res.json({
        "message": "Validation error",
        "statusCode": 400,
        "errors": {
          "credential": "Email or username is required",
          "password": "Password is required"
        }
      })
  };
  
  next();
};

module.exports = { handleValidationErrors };
