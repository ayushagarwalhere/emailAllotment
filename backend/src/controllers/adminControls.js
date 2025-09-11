import prisma from '../config/prismaClient.js';
import { Status } from '@prisma/client';

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
            message: users.length ? "Users fetched" : "No users found for this branch",
            count : users.length,
            users
        })
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message: "Some error occured"});
    }
}

const verifyUser = async(req,res)=>{
    const userId = req.params.id;
    if(!userId){
        return res.status(400).json({message : "Invalid user ID"})
    }
    try {
        const updatedUser = await prisma.user.update({
            where : {id : userId},
            data:{ emailVerified : true }
        })
        return res.status(200).json({message : "User has been verified successfully", updatedUser});
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Error while verifying"});
    }
    
}

const editQuestions = async(req,res)=>{
    const {question} = req.body;
    if (!question) {
        return res.status(400).json({ message: "Question is required" });
    }
    try {
        const editedQuestion =  await prisma.question.update({
            where: {id : req.params.id},
            data: { question}
        })
        return res.status(201).json({message : "Edited successfully"})
    } catch (error) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Error while editing the question"});
    }
}

const addQuestion =  async(req,res)=>{
    const {question, formId} = req.body;
    if (!question || !formId) {
        return res.status(400).json({ message: "Question and formId are required" });
    }
    try {
        const question  = await prisma.question.create({
            data: {
                question,
                formId,
            }
        })
        return res.status(201).json({message: "question added successfully"});
    } catch (error) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Error while editing the question"});     
    }
}

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
    } catch (error) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Error while creating the form"});
    }
}

const postForm = async(req,res)=>{
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

export {getUser, verifyUser, editQuestions, addQuestion, deleteQuestion, createForm, postForm}