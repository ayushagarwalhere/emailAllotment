import express from "express";
import { signup ,login, otpValidation} from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp/:id", otpValidation);

export default router;
