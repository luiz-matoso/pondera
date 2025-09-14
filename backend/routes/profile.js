import express from "express";
import {
  updateProfile,
  changePassword,
} from "../controllers/profileController.js";

const router = express.Router();

router.put("/", updateProfile);
router.put("/password", changePassword);

export default router;
