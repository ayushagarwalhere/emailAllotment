import express from "express";
import { signup ,login, verifyOTP} from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);

export default router;
