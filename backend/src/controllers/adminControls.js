import prisma from '../config/prismaClient.js';
import { Status } from '@prisma/client';

const getUser = async(req,res)=>{
    console.log("You are trying to fetch all users as per your branch")
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
    console.log("this is a put route for editing user")
}

const addQuestion =  async(req,res)=>{
    console.log("add questions from here");
}

const deleteQuestion = async(req, res)=>{
    const questionId = req.params.id;
    if(!questionId){
        res.status(400).json({message: "Invalid question ID"});
    }
    try {
        await prisma.question.delete({
            where: {
                id: questionId,
            }
        })
        return res.status(200).json({message : "Question deleted successfully"});
    } catch (err) {
        console.error("An error occured", err);
        return res.status(500).json({message : "Error while deleting the question"});
    }
}

export {getUser, verifyUser, editQuestions, addQuestion, deleteQuestion}