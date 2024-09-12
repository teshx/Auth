import express from "express";
import {
  login,
  forgotpassword,
  signup,
  logout,
  verifyEmail,
  resetPassword,
  checkAuth,
} from "../controler/auth.controler.js";
import {verifyToken} from "../midelware/verifyToken.js";
const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post("/logout", logout);
router.post("/login", login);
router.post("/forgotpassword", forgotpassword);
router.post("/reset-password/:token", resetPassword);
router.post("/verify-email", verifyEmail);

export default router;
