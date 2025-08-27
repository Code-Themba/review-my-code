import { validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};

export default handleValidationErrors;
