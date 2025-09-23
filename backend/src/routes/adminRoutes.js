import { Router } from "express";

const router = Router();
import {getUser, approveUser, verifyEmail, getVerifiedUsers, getRejectedUsers, addQuestion, editQuestions, deleteQuestion, createForm, publishForm, deleteForm, getAllForms, getForm} from '../controllers/adminControls.js'
import IsAdmin from '../middlewares/isAdmin.js';

//User routes
router.get('/users', IsAdmin, getUser);
router.post('/approveUser/:id', IsAdmin, approveUser);
router.post('/verifyEmail/:id', IsAdmin, verifyEmail);
router.get('/verifiedUsers', IsAdmin, getVerifiedUsers);
router.get('/rejectedUsers', IsAdmin, getRejectedUsers);

//Question routes
router.post('/addQuestion', IsAdmin, addQuestion);
router.put('/editQuestion/:id', IsAdmin, editQuestions);
router.delete('/deleteQuestion/:id', IsAdmin, deleteQuestion);

//Form routes
router.post('/createForm', IsAdmin, createForm);
router.post('/publishForm/:id', IsAdmin, publishForm);
router.delete('/deleteForm/:id', IsAdmin, deleteForm);
router.get('/forms', IsAdmin, getAllForms);
router.get('/form/:id', IsAdmin, getForm);

export default router;