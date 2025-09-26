import {Queue} from 'bullmq';

const addUserQueue = new Queue('add-user-queue',{
    defaultJobOptions:{
        attempts : 3,
        backoff:{
            type :"fixed",
            delay : 3000,
        },
        removeOnComplete : 10,
        removeOnFail : 20,
    }
})

export const addUser = async(data)=>{
    const job = await addUserQueue.add('add-user', data);
    console.log(`new user request with id: ${job.id} added to queue `);
    return job;
}