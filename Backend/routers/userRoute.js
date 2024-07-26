import express from "express";
import {
  getUserInfoFunction,
  loginFunction,
  signupFunction,
  uploadImgFunction,
} from "../controllers/userController.js";
import { multerUploads } from "../config/mutler.js";

const router = express.Router();

router.route("/user/signup").post(signupFunction);
router.route("/user/profile-upload").post(multerUploads, uploadImgFunction);
router.route("/user/login").post(loginFunction);
router.route("/user/get-user-info").post(getUserInfoFunction);

export default router;
