import asyncHandler from "express-async-handler";
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
  try {
    const isCorrectPassword = await user.comparePassword(password);
    if (!user && !isCorrectPassword) {
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

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
  };
  return res.status(200).json(user);
});

export const logoutUser = async (req, res) => {
  res.cookie("authToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "user logged out." });
};

export const deleteUserProfile = async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.id } });
  try {
    await user.destroy();
    return res.status(200).json({
      message: `User ${req.user.username} account deleted successfully.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

export const updateUserProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  const { fullName, email, username, password, confirmPassword } = req.body;

  if (password) {
    if (confirmPassword !== password) {
      return res.status(400).json({
        message: "Please ensure passwords match",
      });
    }
    user.password = password;
  }

  if (fullName) user.fullName = fullName;

  if (email) user.email = email;

  if (username) user.username = username;

  await user.save();
  return res.status(200).json({
    user: {
      email: user.email,
      fullName: user.fullName,
      username: user.username,
    },
  });
};
