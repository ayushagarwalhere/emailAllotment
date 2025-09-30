import { Router } from "express";

const router = Router();
import {getUser, approveUser, allotEmail, getVerifiedUsers, getRejectedUsers, addQuestion, editQuestions, deleteQuestion, createForm, publishForm, deleteForm, getAllForms, getForm} from '../controllers/adminControls.js'
import IsAdmin from '../middlewares/isAdmin.js';
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

//User routes
router.get('/users', isLoggedIn, IsAdmin, getUser);
router.post('/approveUser/:id', isLoggedIn, IsAdmin, approveUser);
router.post('/allotEmail/:id', isLoggedIn, IsAdmin, allotEmail);
router.get('/verifiedUsers', isLoggedIn, IsAdmin, getVerifiedUsers);
router.get('/rejectedUsers', isLoggedIn, IsAdmin, getRejectedUsers);

//Question routes
router.post('/addQuestion', isLoggedIn, IsAdmin, addQuestion);
router.put('/editQuestion/:id', isLoggedIn, IsAdmin, editQuestions);
router.delete('/deleteQuestion/:id', isLoggedIn, IsAdmin, deleteQuestion);

//Form routes
router.post('/createForm', isLoggedIn, IsAdmin, createForm);
router.post('/publishForm/:id', isLoggedIn, IsAdmin, publishForm);
router.delete('/deleteForm/:id', IisLoggedIn, sAdmin, deleteForm);
router.get('/forms', isLoggedIn, IsAdmin, getAllForms);
router.get('/form/:id', isLoggedIn, IsAdmin, getForm);

export default router;