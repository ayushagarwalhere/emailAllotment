import express from 'express'
const router = express.Router();
import {submitForm,status,resubmit} from '../controllers/studentEndpoint.js';
import IsStudent from '../middlewares/isStudent.js';


// Form Submission
// POST /students/:id/form
router.post("/:id/submit",IsStudent, submitForm);


// Status
// GET /students/:id/status
router.get("/:id/status",IsStudent, status);


// PUT /students/:id/form/resubmit
router.put("/:id/form/resubmit", IsStudent, resubmit);



export default router;
