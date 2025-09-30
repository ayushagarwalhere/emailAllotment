// // import { Worker } from "bullmq";
// // import {sendMail} from "../utils/sendEmail.js";

// // const connection = {
// //   host: '127.0.0.1', // or your Redis host
// //   port: 6379,        // default Redis port
// //   // password: 'yourRedisPassword', // if set
// // };

// // const emailWorker = new Worker('email-queue', async (job) => {
// //     const { toWhom, subject, msg } = job.data;
    
// //     console.log(`Processing email (Attempt ${job.attemptsMade + 1}/${job.opts.attempts})`);
// //     console.log(`To: ${toWhom}, Subject: ${subject}`);
    
// //     try {
// //         // if (!toWhom || !subject || !msg) {
// //         //     throw new Error('Missing required fields: toWhom, subject, and msg are required');
// //         // }
// //         //instead write a zod - validator for this  
// //         const result = await sendMail(toWhom, subject, msg);
// //         console.log(`Email sent successfully to ${toWhom}`);
// //         return result;
// //     } catch (error) {
// //         console.error(`Failed to send email to ${toWhom} (Attempt ${job.attemptsMade + 1}):`, error.message);
// //         throw error; 
// //     }
// // },{connection});


// // emailWorker.on('completed', (job, result) => {
// //     console.log(`Email successfully sent to ${job.data.toWhom} (Job ID: ${job.id})`);
// //     console.log(`Result:`, result);
// // });

// // emailWorker.on('failed', (job, err) => {
// //     const isLastAttempt = job.attemptsMade >= job.opts.attempts;
    
// //     if (isLastAttempt) {
// //         console.error(` Email permanently failed after ${job.attemptsMade} attempts`);
// //         console.error(` Recipient: ${job.data.toWhom}, Subject: ${job.data.subject}`);
// //         console.error(` Error: ${err.message}`);
        
// //     } else {
// //         console.warn(` Email failed (attempt ${job.attemptsMade}), will retry: ${err.message}`);
// //     }
// // });

// // emailWorker.on('error', (err) => {
// //     console.error('Email worker error:', err);
// // });


// // export { emailWorker };




// import { Worker } from 'bullmq';
// import { sendMail } from '../utils/sendMail.js';

// const connection = {
//   host: '127.0.0.1',
//   port: 6379,
// };

// const emailWorker = new Worker(
//   'email-queue',
//   async (job) => {
//     const { toWhom, subject, msg } = job.data;

//     console.log(`Processing email (Attempt ${job.attemptsMade + 1}/${job.opts.attempts})`);
//     console.log(`To: ${toWhom}, Subject: ${subject}`);

//     const result = await sendMail(toWhom, subject, msg);
//     return result;
//   },
//   {
//     connection,
//     concurrency: 5, // handle multiple emails in parallel
//     limiter: { max: 10, duration: 1000 }, // optional rate limiting
//   }
// );

// emailWorker.on('completed', (job, result) => {
//   console.log(`Email sent successfully to ${job.data.toWhom} (Job ID: ${job.id})`);
// });

// emailWorker.on('failed', (job, err) => {
//   const isLastAttempt = job.attemptsMade >= job.opts.attempts;
//   if (isLastAttempt) {
//     console.error(`Email permanently failed after ${job.attemptsMade} attempts`);
//     console.error(`Recipient: ${job.data.toWhom}, Subject: ${job.data.subject}`);
//     console.error(`Error: ${err.message}`);
//   } else {
//     console.warn(`Email failed (attempt ${job.attemptsMade}), will retry: ${err.message}`);
//   }
// });

// emailWorker.on('error', (err) => {
//   console.error('Email worker error:', err);
// });

// export { emailWorker };
