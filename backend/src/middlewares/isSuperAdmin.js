import prisma from '../config/prismaClient.js';
import { RoleType } from '@prisma/client';

const isSuperAdmin = async (req, res, next) => {
  try {
    const userData = req.user;
    if (!userData || !userData.email) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const user = await prisma.user.findUnique({
      where: { email: userData.email },
      include: { role: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    if (user.role.role === RoleType.SUPERADMIN) {
      return next();
    } else {
      return res.status(403).json({ message: "Access denied: SuperAdmin only" });
    }
  } catch (error) {
    console.error("An error occurred", error);
    return res.status(500).json({ message: "Failed to create admin" });
  }
};

export default isSuperAdmin;
