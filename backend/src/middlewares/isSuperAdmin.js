import jwt from "jsonwebtoken";
import { RoleType } from "@prisma/client";

const isSuperAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SUPERADMIN_SECRET_KEY);
        if (decoded && decoded.role === RoleType.SUPERADMIN) {
            req.user = decoded; 
            return next();
        } else {
            return res.status(403).json({ message: "Access denied: Admins only" });
        }
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default isSuperAdmin;
