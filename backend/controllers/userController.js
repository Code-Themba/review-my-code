import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

const registerUser = async (req, res) => {
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ where: { email } });
  if (!userExists) {
    return res.status(404).json({
      message: "Invalid credentials.",
    });
  }
  try {
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Something went wrong. Please try again",
    });
  }
};

export { registerUser, loginUser };
