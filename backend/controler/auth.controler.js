import { user } from "../models/userSchema.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.configDotenv();
import { generatTookenandsetcookies } from "../Util/generatTookenandsetcookies.js";
import {
  sendverificationEmail,
  sendWelcomeEmail,
  sendpassworedresetEmail,
  sendResetSuccessfullEmail,
} from "../mailTrap/emails.js";
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
    //verificatiionToken
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
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

    sendverificationEmail(User.email, verificationToken);

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

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  //123456
  try {
    const User = await user.findOne({
      verificationToken: code,
      verificationExpires: { $gt: Date.now() },
    });

    if (!User) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid or expired verification" });
    }
    User.isverified = true;
    User.verificationToken = undefined;
    User.verificationExpires = undefined;

    await User.save();

    await sendWelcomeEmail(User.email, User.username);

    res.status(200).json({
      success: true,
      message: "Email verified successfuly",
      User: {
        ...User._doc,
        password: undefined,
      },
    });
  } catch (error) {}
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "logged out successfuly" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("biging");
  try {
    const User = await user.findOne({ email });

    if (!User) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials email" });
    }

    const isPasswordValid = await bcrypt.compare(password, User.password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials paaword" });
    }
    generatTookenandsetcookies(res, User._id);
    User.lastlogin = new Date();
    await User.save();
    console.log("work");
    res.status(200).json({
      success: true,
      message: "login is successfuly",
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

export const forgotpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const User = await user.findOne({ email });

    if (!User) {
      res.status(404).json({
        success: false,
        message: "user is not found or incorrect email",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    User.resetPassworedToken = resetToken;
    User.resetPassworedExpiresAt = resetExpiresAt;

    await User.save();
    console.log("User saved successfully");
    await sendpassworedresetEmail(
      User.email,
      `http://localhost:5000/reset-password/${resetToken}`
    );

    res
      .status(200)
      .json({ success: true, message: "send resetEmail successfuly" });
  } catch (error) {
    console.log("this is final error");
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const User = await user.findOne({
      resetPassworedToken: token,
      resetPassworedExpiresAt: { $gt: Date.now() },
    });

    if (!User) {
      res
        .status(404)
        .json({ success: false, message: "Invalid or Expired reset token" });
    }

    //update password

    const hashedPassword = await bcrypt.hash(password, 10);

    User.password = hashedPassword;
    User.resetPassworedToken = undefined;
    User.resetPassworedExpiresAt = undefined;
    await User.save();
    await sendResetSuccessfullEmail(User.email);
    res
      .status(200)
      .json({ success: true, message: "send resetEmail successfuly" });
  } catch (error) {
    console.log("this is final error");
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};