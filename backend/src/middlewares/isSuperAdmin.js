import prisma from '../config/prismaClient.js';
import { RoleType } from '@prisma/client';

const isSuperAdmin = async (req, res, next) => {
  try {
    const { email, userRole } = req.user;

    if (!email) {
      return res.status(401).json({ 
        message: "Unauthorized access" 
      });
    }

    if (userRole === RoleType.SUPERADMIN) {
      return next();
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      return res.status(401).json({ 
        message: "User not found" 
      });
    }

    if (user.role.role === RoleType.SUPERADMIN) {
      return next();
    }

    return res.status(403).json({ 
      message: "Access denied: SuperAdmin only" 
    });

  } catch (error) {
    console.error("SuperAdmin check error:", error);
    return res.status(500).json({ 
      message: "Authorization check failed",
      error: error.message 
    });
  }
};

export default isSuperAdmin;