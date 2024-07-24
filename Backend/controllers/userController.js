import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupFunction = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new Error("All fields required");
    }
    const isExists = await User.findOne({ email });
    if (isExists) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const response = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const jwtAuth = jwt.sign(
      { username, email, id: response._id },
      process.env.JWT_SECRET
    );
    res.json({
      success: true,
      message: "User info created successfully",
      jwtToken: jwtAuth,
    });
  } catch (error) {
    next(error);
  }
};

export const loginFunction = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isExists = await User.findOne({ email });
    if (!isExists) {
      throw new Error("Account not found");
    }
    const isValidPasswd = await bcrypt.compare(password, isExists.password);
    if (!isValidPasswd) {
      throw new Error("Invalid Password");
    }
    const jwtToken = jwt.sign({ email, id: isExists._id }, process.env.JWT_SECRET);
    res.json({
      success: true,
      message: "Login successfull",
      jwtToken: jwtToken,
    });
  } catch (error) {
    next(error);
  }
};
