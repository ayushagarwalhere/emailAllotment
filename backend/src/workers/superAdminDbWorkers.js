import { Worker } from "bullmq";
import { prisma } from "../config/db";
import { RoleType } from "@prisma/client";

const addAdminWorker = new Worker('add-admin-queue', async(job)=>{
    const { name,middlename, lastname, branch, email, password } = job.data;
    console.log(`Processing add admin for ${name} (Attempt ${job.attemptsMade + 1}/${job.opts.attempts})`);
    try {
        const newAdmins = await prisma.user.create({
            data: {
                name,
                middlename,
                lastname,
                branch,
                email,
                password,
                role: RoleType.ADMIN,
            },
            select: {
                id: true,
                name: true,
                name : true,
                branch : true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        console.log("Admin created successfully");
        return newAdmins;
    } catch (error) {
        console.error(`Failed to add admin ${name} (Attempt ${job.attemptsMade + 1}):`, error.message);
        throw error; 
    }
})

const deleteAdminWorker = new Worker('delete-admin-queue', async(job)=>{
    const {id, email, name} = job.data;
    console.log(`Processing delete admin for ${name} with email ${email} (Attempt ${job.attemptsMade + 1}/${job.opts.attempts})`);

    try {
        const deletedAdmin = await prisma.user.deleteMany({
            where: { 
                id,
                email,
                role: RoleType.ADMIN
            }
        }); 
        console.log("Admin deleted successfully");
        return deletedAdmin;
    } catch (error) {
        console.error(`Failed to delete admin ${name} (Attempt ${job.attemptsMade + 1}):`, error.message);
        throw error; 
    }
})

addAdminWorker.on('completed', (job,result)=>{
    console.log(`${job.data.name} has been successfully added as admin`);
    console.log("result : ", result);
})

addAdminWorker.on('failed', (job,err)=>{
    const isLastAttempt = job.attemptsMade >= job.opts.attempts;
    
    if (isLastAttempt) {
        console.error(`Make admin request for ${job.data.name} permanently failed after ${job.attemptsMade} attempts`);
        console.error(`Error: ${err.message}`);
        
    } else {
        console.warn(`Make admin request failed (attempt ${job.attemptsMade}), will retry: ${err.message}`);
    }
})

addAdminWorker.on('error', (error)=>{
    console.error("add-admin-error", error);
})

deleteAdminWorker.on('completed', (job, result)=>{
    console.log(`${job.data.id} has been successfully added as admin`);
    console.log("result : ", result);
})

deleteAdminWorker.on('failed', (job,err)=>{
    const isLastAttempt = job.attemptsMade >= job.opts.attempts;
    
    if (isLastAttempt) {
        console.error(`Delete admin request for ${job.data.name} permanently failed after ${job.attemptsMade} attempts`);
        console.error(`Error: ${err.message}`);
        
    } else {
        console.warn(`Delete admin request failed (attempt ${job.attemptsMade}), will retry: ${err.message}`);
    }
})

deleteAdminWorker.on('error', (err)=>{
    console.log("Error while deleting", err);
})

export {deleteAdminWorker, addAdminWorker}