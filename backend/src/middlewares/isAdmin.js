import prisma from '../config/prismaClient.js';
import { RoleType } from '@prisma/client';

const IsAdmin = async (req, res, next) => {
    try {
        const userData = req.user;
        if (!userData || !userData.email) {
            return res.status(401).json({ message: "Unauthorized"});
        }
        const user = await prisma.user.findUnique({
            where: { email: userData.email },
            select: { role: true }
        });
        if (!user) {
            return res.status(401).json({ message: "User not found"});
        }
        if (user.role === RoleType.ADMIN) {
            return next();
        } else {
            return res.status(403).json({ message: "Access denied" });
        }
    } catch (error) {
        console.error("An error occured", error);
        return res.status(500).json({ message: "Some error occured" });
    }
};

export default IsAdmin;
