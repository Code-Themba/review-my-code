import express from "express";
import { registerUser } from "../controllers/userController.js";
import { signupValidator } from "../utils/validators/authValidator.js";
import handleValidationErrors from "../middleware/handleValidation.js";
const router = express.Router();

router.post("/signup", signupValidator, handleValidationErrors, registerUser);

export default router;
