import prisma from '../config/prismaClient.js';
import { Status } from '@prisma/client';
import { questionSchema, validBranch, validUuid } from '../zod-schema/form.js';

//User-route controllers
const getUser = async(req,res)=>{
    try {
        const users = await prisma.user.findMany({
            where :{
                emailVerified : true,
                emailAlloted : false,
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
    const userId = validUuid.parseSafe(req.params.id);

    if(!userId.success){
        return res.status(400).json({message : "Invalid user ID"})
    }

    const {id} = userId.data;
    try {
        const updatedUser = await prisma.user.update({
            where : {id},
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

const allotEmail = async(req,res)=>{
    const userId = validUuid.parseSafe(req.params.id);

    if(!userId.success){
        return res.status(400).json({message : "Invalid user ID"})
    }
    const {id} = userId.data;
    try {
        const user = await prisma.user.findUnique({
            where : {id},
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
                emailAlloted : true,
            }
        })
        return res.status(200).json({message : "Email has been verified successfully", updatedUser});
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Error while verifying email"});
    }
}

const getVerifiedUsers = async(req,res)=>{
    try {
        const users = await prisma.user.findMany({
            where :{
                emailVerified : true,
                emailAlloted : true,
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
        return res.status(500).json({message: "Error while fetching verified users"});
    }
}

const getRejectedUsers = async(req,res)=>{
    try {
        const users = await prisma.user.findMany({
            where :{
                emailVerified : true,
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
        return res.status(500).json({message: "Error while fetching rejected users"});
    }
}

//Question-route controllers
const addQuestion =  async(req,res)=>{
    const result = questionSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({message : result.error.message});
    }

    const {question, options, type, required = true, formId} = result.data;

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
        return res.status(500).json({message : "Failed to add question"});
    }
}

const editQuestions = async(req,res)=>{
    const result = questionSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({message : result.error.message});
    }
    const {question, options, type, required = true, formId} = result.data;
    const userId = validUuid.safeParse(req.params.id);
    if(!userId.success){
        return res.status(400).json({message: userId.error.message});
    }
    const {id}=  userId.data;
    try {
        const editedQuestion =  await prisma.question.update({
            where: {id},
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
        return res.status(500).json({message : "Failed to edit question"});
    }
}

const deleteQuestion = async(req, res)=>{
    const questionId = validUuid.safeParse(req.params.id);
    if(!questionId.success){
        return res.status(400).json({message : questionId.error.message});
    }
    const {id} = questionId.data;

    const formId = validUuid.safeParse(req.form.id);
    if(!formId.success){
        return res.status(400).json({message: formId.error.message});
    }
    const {form_id} = formId.data;

    try {
        const question = await prisma.question.deleteMany({
            where: {
                id,
                formId: form_id,
            },
        });
        if(question.count === 0){
            return res.status(404).json({message : "Question not found"})
        }
        return res.status(200).json({message : "Question deleted successfully"});
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Failed to delete question"});
    }
}

//Form-route controllers
const createForm = async(req,res)=>{
    const {formName} = req.body;
    if(!formName){
        return res.status(400).json({message : "FormName is required"});
    }

    const userId = validUuid.safeParse(req.user.id);
    if(!userId.success){
        return res.status(400).json({message : questionId.error.message});
    }
    const {id} = userId.data;
    try {
        const form = await prisma.form.create({
            data:{ 
                formName,
                user : {connect : {id}},
            }
        })
        res.cookie("form", form.id,{
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
        return res.status(201).json({message : "Form created successfully"});
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Failed to create form"});
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
        return res.status(400).json({
            message : "Failed to publish form",
            error: error.message
        })
    }
}

const deleteForm = async(req,res)=>{
    const formId = validUuid.safeParse(req.params.id);
    if(!formId.success){
        return res.status(400).json({message: formId.error.message});
    }
    const {id} = formId.data;

    const userId = validUuid.safeParse(req.user.id );
    if(!userId.success){
        return res.status(400).json({message: formId.error.message});
    }
    const {user_id} = userId.data;

    try {
        const form = await prisma.form.deleteMany({
            where: { id, userId : user_id},
        });
        if(form.count === 0){
            return res.status(404).json({message : "Form not found"})
        }
        res.cookie("form", "");
        return res.status(200).json({message : "Form deleted successfully"});
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Failed to delete form"});
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
    const formId = validUuid.safeParse(req.params.id);
    if(!formId.success){
        res.status(400).json({message: formId.error.message});
    }
    const {id} = formId.data;
    try {
        const form = await prisma.form.findUnique({
            where: { id },
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
        return res.status(200).json({
            message : "Form fetched successfully",
            form
        });
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Error while fetching the form"});
    }
}

export {getUser, approveUser, allotEmail, getVerifiedUsers, getRejectedUsers, addQuestion, editQuestions, deleteQuestion, createForm, publishForm, deleteForm, getAllForms, getForm};