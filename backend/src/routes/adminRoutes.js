import express from 'express'
const router = express.Router();
import {getUser, verifyUser, editQuestions, addQuestion, deleteQuestion, createForm, postForm} from '../controllers/adminControls.js'
import IsAdmin from '../middlewares/isAdmin.js';

router.get('/getUser', IsAdmin, getUser)
router.post('/addQuestion', IsAdmin, addQuestion)
router.delete('/deleteQuestion/:id', deleteQuestion)
router.patch('/editQuestion/:id', IsAdmin, editQuestions)
router.patch('/verifyUser/:id', IsAdmin, verifyUser)
router.patch('/postForm', IsAdmin, postForm)
router.post('/createForm', IsAdmin, createForm)

export default router