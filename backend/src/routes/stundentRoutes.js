import express from "express";
const router = express.Router();
import { submitForm, status, resubmit } from "../controllers/studentEndpoint.js";
import IsStudent from "../middlewares/isStudent.js";

// Base path  /students

// Form Submission
// POST /students/submit
router.post("/submit", IsStudent, submitForm);

// Status
// GET /students/status
router.get("/status", IsStudent, status);

// Resubmit Form (if rejected)
// PUT /students/resubmit
router.put("/resubmit", IsStudent, resubmit);

export default router;
