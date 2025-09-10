import { PrismaClient } from '@prisma/client';
import redis from 'redis';
import { promisify } from 'util';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const redisClient = redis.createClient();
const setAsync = promisify(redisClient.set).bind(redisClient);
const getAsync = promisify(redisClient.get).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

const OTP_EXPIRATION = 300; // 5 minutes

export const signup = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            roleId: 'uuid-of-student-role',
            emailVerified: false
        }
    });

    return user;
};

function generateOtp() {
    const buffer = crypto.randomBytes(3); // 3 bytes
    const number = parseInt(buffer.toString('hex'), 16) % 1000000;
    return number.toString().padStart(6, '0');
}

export const login = async (email) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error('User not found');
    }

    const otp = generateOtp();
    await setAsync(`otp:${email}`, otp, 'EX', OTP_EXPIRATION);


    console.log(`Sending OTP to ${email}: ${otp}`);

    return { email };
};

export const verifyOtp = async (email, otp) => {
    const savedOtp = await getAsync(`otp:${email}`);

    if (!savedOtp || savedOtp !== otp) {
        throw new Error('Invalid or expired OTP');
    }

    await delAsync(`otp:${email}`);

    const user = await prisma.user.update({
        where: { email },
        data: { emailVerified: true }
    });

    return { email: user.email, verified: true };
};
