import prisma from '../config/prismaClient.js';
import { RoleType } from '@prisma/client';

const IsStudent = async (req, res, next) => {
  try {
    const userData = req.user;
    if (!userData || !userData.email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
      include: { role: true },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.role.role === RoleType.STUDENT) {
      return next();
    } else {
      return res.status(403).json({ message: "Access denied: Students only" });
    }
  } catch (error) {
    console.error("An error occurred", error);
    return res.status(500).json({ message: "Some error occurred" });
  }
};

export default IsStudent;
