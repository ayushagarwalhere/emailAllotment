import prisma from '../config/prismaClient.js';
import { Status } from '@prisma/client';

//User-route controllers
const getUser = async(req,res)=>{
    const userBranch = req.user.branch;
    try {
        const users = await prisma.user.findMany({
            where :{
                branch : userBranch,
                emailVerified : false,
                status: {
                    in: [Status.PENDING, Status.REJECTED]
                }
            }
        })
        return res.status(200).json({
            message: users.length ? "Users fetched" : "No pending users found for this branch",
            count : users.length,
            users
        })
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message: "Some error occured"});
    }
}

const approveUser = async(req,res)=>{
    const userId = req.params.id;
    
    if(!userId){
        return res.status(400).json({message : "Invalid user ID"})
    }
    try {
        const updatedUser = await prisma.user.update({
            where : {id : userId},
            data:{ 
                status : Status.APPROVED,
            }
        })
        return res.status(200).json({message : "User has been verified successfully", updatedUser});
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Error while verifying"});
    }
}

const verifyEmail = async(req,res)=>{
    const userId = req.params.id;
    if(!userId){
        return res.status(400).json({message : "Invalid user ID"})
    }
    try {
        const user = await prisma.user.findUnique({
            where : {id : userId},
        })
        if(!user){
            return res.status(404).json({message : "User not found"})
        }
        if(user.status !== Status.APPROVED){
            return res.status(400).json({message : "Email is not approved yet"})
        }
        const updatedUser = await prisma.user.update({
            where : {id : userId},
            data:{
                emailVerified : true,
            }
        })
        return res.status(200).json({message : "Email has been verified successfully", updatedUser});
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Error while verifying email"});
    }
}

const getVerifiedUsers = async(req,res)=>{
    const userBranch = req.user.branch;
    try {
        const users = await prisma.user.findMany({
            where :{
                branch : userBranch,
                emailVerified : true,
                status: Status.APPROVED
            }
        }) 
        return res.status(200).json({
            message: users.length ? "Users fetched" : "No approved users found for this branch",
            count : users.length,
            users
        })
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message: "Some error occured"});
    }
}

const getRejectedUsers = async(req,res)=>{
    const userBranch = req.user.branch;
    try {
        const users = await prisma.user.findMany({
            where :{
                branch : userBranch,
                status: Status.REJECTED
            }
        })
        return res.status(200).json({
            message: users.length ? "Users fetched" : "No rejected users found for this branch",
            count : users.length,
            users
        })
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message: "Some error occured"});
    }
}

//Question-route controllers
const addQuestion =  async(req,res)=>{
    const {question, options, type, required = true, formId} = req.body;
    if(!question || !options || !type){
        return res.status(400).json({message : "All fields are required"});
    }
    try {
        const newQuestion = await prisma.question.create({
            data : {
                question,
                type,
                required,
                form : {connect : {id : formId}},
                options: {
                    create: options.map((option)=>({option}))
                }
            }
        })
        return res.status(201).json({message : "Question added successfully", newQuestion});
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Error while adding the question"});
    }
}

const editQuestions = async(req,res)=>{
    const {question, options, type, required = true, formId} = req.body;
    if (!question) {
        return res.status(400).json({ message: "Question is required" });
    }
    try {
        const editedQuestion =  await prisma.question.update({
            where: {id : req.params.id},
            data: { 
                question,
                type,
                required,
                form : {connect : {id : formId}},
                options: {
                    deleteMany: {},
                    create: options.map((option)=>({option}))
                }
            }
        })
        return res.status(200).json({message : "Question edited successfully", editedQuestion});
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Error while editing the question"});
    }
}

const deleteQuestion = async(req, res)=>{
    const questionId = req.params.id;
    if(!questionId){
        res.status(400).json({message: "Invalid question ID"});
    }
    try {
        const question = await prisma.question.deleteMany({
            where: {
                id: questionId,
                formId : req.form.id,
            },
        });
        if(question.count === 0){
            return res.status(404).json({message : "Question not found"})
        }
        return res.status(200).json({message : "Question deleted successfully"});
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Error while deleting the question"});
    }
}

//Form-route controllers
const createForm = async(req,res)=>{
    const {formName} = req.body;
    try {
        const form = await prisma.form.create({
            data:{ 
                formName,
                user : {connect : {id : req.user.id}},
            }
        })
        res.cookie("form", form.id);
        return res.status(201).json({message : "Form created successfully"});
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Error while creating the form"});
    }
}

const publishForm = async(req,res)=>{
    try {
        const existingLive =  await prisma.form.findFirst({
            where : {isLive : true}
        });
        if(existingLive) {
            return res.status(400).json({message : "Another form is live"})
        }
        const update = await prisma.form.update({
            where: {id : req.form.id},
            data : {isLive : true},
        })
        return res.status(200).json({message : "Form is live now"});
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const deleteForm = async(req,res)=>{
    const formId = req.params.id;
    if(!formId){
        res.status(400).json({message: "Invalid form ID"});
    }
    try {
        const form = await prisma.form.deleteMany({
            where: { id: formId, userId : req.user.id },
        });
        if(form.count === 0){
            return res.status(404).json({message : "Form not found"})
        }
        return res.status(200).json({message : "Form deleted successfully"});
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Error while deleting the form"});
    }
}

const getAllForms = async(req,res)=>{
    try {
        const forms = await prisma.form.findMany({
            select :{
                id: true,
                formName : true,
                isLive : true,
                createdAt : true,
            }
        })
        return res.status(200).json({forms});
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Error while fetching the forms"});
    }
}

const getForm = async(req,res)=>{
    const formId = req.params.id;
    if(!formId){
        res.status(400).json({message: "Invalid form ID"});
    }
    try {
        const form = await prisma.form.findUnique({
            where: { id: formId },
            select: {
                id: true,
                formName : true,
                questions : true,
                isLive : true,
                createdAt : true,
            }
        });
        if(!form){
            return res.status(404).json({message : "Form not found"})
        }
        return res.status(200).json({form});
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Error while fetching the form"});
    }
}

export {getUser, approveUser, verifyEmail, getVerifiedUsers, getRejectedUsers, addQuestion, editQuestions, deleteQuestion, createForm, publishForm, deleteForm, getAllForms, getForm};