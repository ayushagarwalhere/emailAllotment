import express from 'express'
const router = express.Router();
import {submitForm,status,resubmit} from '../controllers/studentEndpoint.js'


// Form Submission
// POST /students/:id/form
router.post("/:id/form", submitForm);


// Status
// GET /students/:id/status
router.get("/:id/status", status);


 //Resubmit in case of deletion
// POST /students/:id/form/resubmit
router.post("/:id/form/resubmit", resubmit);


export default router;
