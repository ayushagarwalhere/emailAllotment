import express from "express";
const router = express.Router();
import { submitForm, status, resubmit } from "../controllers/studentEndpoint.js";
import IsStudent from "../middlewares/isStudent.js";

// Base path  /api/v1/students

// Form Submission
// POST /api/v1/students/submit
router.post("/submit", IsStudent, submitForm);

// Status
// GET /api/v1/students/status
router.get("/status", IsStudent, status);

// Resubmit Form (if rejected)
// PUT /api/v1/students/resubmit
router.put("/resubmit", IsStudent, resubmit);

export default router;
