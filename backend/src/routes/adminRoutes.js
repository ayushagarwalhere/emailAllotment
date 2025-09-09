import express from 'express'
const router = express.Router();
import {getUser, verifyUser, editQuestions, addQuestion,deleteQuestion} from '../controllers/adminControls.js'
import IsAdmin from '../middlewares/isAdmin.js';

router.get('/getUser', IsAdmin, getUser)
router.post('/addQuestion', IsAdmin, addQuestion)
router.delete('/deleteQuestion:id', deleteQuestion)
router.patch('/editQuestion', IsAdmin, editQuestions)
router.patch('/verifyUser:id', IsAdmin, verifyUser)

export default router