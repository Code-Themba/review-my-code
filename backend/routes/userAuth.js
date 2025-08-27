import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import {
  signInValidator,
  signupValidator,
} from "../utils/validators/authValidator.js";
import handleValidationErrors from "../middleware/handleValidation.js";
const router = express.Router();

router.post("/signup", signupValidator, handleValidationErrors, registerUser);
router.post("/signin", signInValidator, handleValidationErrors, loginUser);

export default router;
