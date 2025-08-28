import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { tokenGenerator } from "../utils/generator/tokenGenerator.js";

export const registerUser = async (req, res) => {
  const { fullName, username, email, password, confirmPassword } = req.body;

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.status(400).json({
      message: "Email Address already in use.",
    });
  }
  if (confirmPassword !== password) {
    return res.status(400).json({
      message: "Please ensure passwords match",
    });
  }
  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      username,
      email,
      password,
    });
    return res.status(200).json({
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err) {
    console.error(err.message);
    // Handle validation/unique constraint errors
    if (
      err.name === "SequelizeValidationError" ||
      err.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({
      message: "Invalid credentials.",
    });
  }
  try {
    const isCorrectPassword = await user.comparePassword(password);
    if (!isCorrectPassword) {
      return res.status(401).json({
        message: "Invalid Credentials.",
      });
    }
    tokenGenerator(res, user.id);
    return res.status(200).json({
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Something went wrong. Please try again",
    });
  }
};

export const getUserProfile = async (req, res) => {
  const user = {
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
  };
  return res.status(200).json(user);
};

export const logoutUser = async (req, res) => {
  res.cookie("authToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "user logged out." });
};
