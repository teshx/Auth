import { user } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { generatTookenandsetcookies } from "../Util/generatTookenandsetcookies.js";
export const signup = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    if (!email || !password || !username) {
      return res.status(404).send("all input is required");
    }
    const existEmail = await user.findOne({ email });
    if (existEmail) {
      return res.status(404).send("email is existing required");
    }

    const existUsername = await user.findOne({ username });
    if (existUsername) {
      return res.status(404).send("existUsername is existing required");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = Math.floor(
      Math.random(100000 + Math.random() * 900000).toString()
    );

    const User = new user({
      email,
      password: hashedPassword,
      username,
      verificationToken,
      verificationExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 houres
    });

    await User.save();
    //jwt
    generatTookenandsetcookies(res, user._id);

    res.status(201).json({
      success: true,
      message: "user is success fuly created",
      User: {
        ...User._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
export const signin = async (req, res) => {
  res.send("signin");
};
export const login = async (req, res) => {
  res.send("login");
};
export const logout = async (req, res) => {
  res.send("logout");
};
