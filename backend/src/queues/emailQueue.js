import { Queue } from "bullmq";

const emailQueue = new Queue('email-queue', {
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'fixed',
            delay: 3000, 
        },
        removeOnComplete: 10,
        removeOnFail: 20, 
    },
});

export const sendEmails = async (mail) => {
    const job = await emailQueue.add('send-email', mail);
    console.log(`Email job added to queue (ID: ${job.id})`);
    return job;
};
