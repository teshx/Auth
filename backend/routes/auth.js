import express from "express";
import {
  login,
  signin,
  signup,
  logout,
  verifyEmail,
} from "../controler/auth.controler.js";
const router = express.Router();

router.post("/signup", signup);
router.get("/logout", logout);
router.get("/signin", signin);
router.get("/login", login);
router.post("/verify-email", verifyEmail);

export default router;
