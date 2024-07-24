import express from "express";
import {
  loginFunction,
  signupFunction,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/user/signup").post(signupFunction);
router.route("/user/login").post(loginFunction);

export default router;
