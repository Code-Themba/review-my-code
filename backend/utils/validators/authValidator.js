import { body } from "express-validator";

const signupValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters.")
    .bail()
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .bail()
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
    .bail()
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character."),
  body("fullName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Please enter a full name with at least 2 characters."),
  body("username")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Please enter a username with at least 2 characters."),
];

const signInValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters.")
    .bail()
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .bail()
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
    .bail()
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character."),
];

export { signupValidator, signInValidator };
