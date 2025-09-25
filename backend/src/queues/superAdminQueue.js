import { Queue } from "bullmq";

const addAdminsQueue = new Queue('add-admin-queue', {
    defaultJobOptions:{
        attempts : 3,
        backoff:{
            type: "fixed",
            delay: 3000
        },
        removeOnComplete : 10,
        removeOnFail : 20,
    }
});

const deleteAdminQueue = new Queue('delete-admin-queue', {
    defaultJobOptions:{
        attempts : 3,
        backoff:{
            type : "fixed",
            delay: 3000,
        },
        removeOnComplete : 10,
        removeOnFail : 20,
    }
});

export const addAdmins = async(data)=>{
    const job = await addAdminsQueue.add("add-admin", data);
    console.log(`add admin request for ${data.name} has been added to queue`);
    return job;
}


export const deleteAdmins = async(data)=>{
    const job = await deleteAdminQueue.add('delete-admin', data);
    console.log(`deleting admin ${data.name}`);
    return job;
}
