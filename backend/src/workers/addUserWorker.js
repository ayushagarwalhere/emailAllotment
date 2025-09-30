// import { Worker } from "bullmq";
// import bcrypt from 'bcryptjs'

// const addUserWorker = new Worker('add-user-queue', async(job)=>{
//     console.log(`Processing add user request for ${job.id}`);
//     console.log(`(Attempt ${job.attemptsMade + 1}/${job.opts.attempts})`)
    
//     try {
//         const {name , email, password, roleId}= job.data;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await prisma.user.create({
//         data: {
//             name,
//             email,
//             password: hashedPassword,
//             roleId,
//             emailVerified: false,
//         },
//         include: { role: true }
//         });
//         console.log(`User connected successfully`);
//         return user;
//     } catch (error) {
//         console.error(`Failed to add user ${job.data.name} (Attempt ${job.attemptsMade + 1}):`, error.message);
//         throw error;
//     }
// })

// addUserWorker.on('completed', (job, result)=>{
//     console.log(`${job.data.name} added successfully`);
//     consoel.log("Result" , result);
// })

// addUserWorker.on('failed', (job, err)=>{
//     const isLastAttempt = job.attemptsMade >= job.opts.attempts;
    
//     if (isLastAttempt) {
//         console.error(` Add user request failed permanently after ${job.attemptsMade} attempts`);
//         console.error(` Error: ${err.message}`);
        
//     } else {
//         console.log(`Failed add user request for ${job.id}`);
//         console.warn(`(attempt ${job.attemptsMade}), will retry: ${err.message}`);
//     }
// })

// addUserWorker.on('error', (err)=>{
//     console.log("Add user worker error", err);
// })

// export{addUserWorker};