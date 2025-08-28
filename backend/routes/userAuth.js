import express from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import {
  signInValidator,
  signupValidator,
} from "../utils/validators/authValidator.js";
import handleValidationErrors from "../middleware/handleValidation.js";
import { protectRoutes } from "../middleware/protectRoutes.js";
const router = express.Router();

router.post("/signup", signupValidator, handleValidationErrors, registerUser);
router.post("/signin", signInValidator, handleValidationErrors, loginUser);
router.get("/me", protectRoutes, getUserProfile);

export default router;
