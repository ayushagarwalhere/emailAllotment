// backend/config/db.js
import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';

// Initialize Prisma
const prisma = new PrismaClient();

// Initialize Redis client
const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Connect to Redis
redisClient.connect()
    .then(() => console.log('Connected to Redis'))
    .catch(err => console.error('Redis connection error', err));

// Wrapper function to set a key with expiration
const setAsync = async (key, value, expiration) => {
    await redisClient.set(key, value, {
        EX: expiration
    });
};

// Wrapper function to get a key
const getAsync = async (key) => {
    return await redisClient.get(key);
};

// Wrapper function to delete a key
const delAsync = async (key) => {
    return await redisClient.del(key);
};

export { prisma, redisClient, setAsync, getAsync, delAsync };
