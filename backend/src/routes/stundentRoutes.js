import express from "express";
const router = express.Router();
import { status, resubmit, submitForm } from "../controllers/studentEndpoint.js";
import IsStudent from "../middlewares/isStudent.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

// Base path  /students

// Form Submission
// POST /students/submit
router.post("/submit", isLoggedIn,IsStudent, submitForm);

// Status
// GET /students/status
router.get("/status", isLoggedIn, IsStudent, status);

// Resubmit Form (if rejected)
// PUT /students/resubmit
router.put("/resubmit", isLoggedIn, IsStudent, resubmit);

export default router;
