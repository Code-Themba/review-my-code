import express from "express";
import {
  deleteUserProfile,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
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
router.get("/logout", protectRoutes, logoutUser);
router.put("/update-profile", protectRoutes, updateUserProfile);
router.delete("/delete-account", protectRoutes, deleteUserProfile);

export default router;
