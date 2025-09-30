import { RoleType } from "@prisma/client";
import { prisma } from '../config/db.js';
import { createAdminSchema, validUuid } from "../zod-schema/form.js";
import { addAdmins, deleteAdmins } from "../queues/superAdminQueue.js";

const getAllAdmins = async (req, res) => {
    try {
        const admins = await prisma.user.findMany({
            where: { role: RoleType.ADMIN },
            select: {
                id: true,
                name: true,
                name : true,
                branch : true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        return res.status(200).json({ 
            message: admins.length ? "Admins fetched successfully" : "No admins found",
            count: admins.length, 
            admins
        });
    } catch (err) {
        console.error("An error occurred", err);
        return res.status(500).json({ message: "Error while fetching admins" });
    }
};

const createAdmin = async (req, res) => {
    const admin =  createAdminSchema.safeParse(req.body);
    if(!admin.success){
        return res.status(400).json({
            message: "Invalid admin data or username/email already exists" ,
            error: admin.error.message
        });
    }
    try {
        const existingAdmin = await prisma.user.findUnique({ where: { email : admin.data.email } });
        if (existingAdmin) {
            return res.status(409).json({ message: "Admin with this email already exists" });
        }
        const job = await addAdmins(admin.data);
        return res.status(200).json({ 
            message: "Admin created successfully",
            jobId : job.id,
         });
    } catch (err) {
        console.error("An error occurred", err);
        return res.status(500).json({ message: "Error while creating admin" });
    }
};


const deleteAdmin = async (req, res) => {
    const adminId = validUuid.safeParse(req.params.id);
    if (!adminId.success) {
        return res.status(400).json({ message: "Invalid admin ID" });
    }
    try {
        const admin = await prisma.user.findFirst({
            where: { 
                id: adminId.data,
                role: RoleType.ADMIN
            },
            select: { 
                id: true, 
                email: true,
                name : true,
            }
        });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const job = await deleteAdmins(admin);
        return res.status(200).json({ 
            message: "Admin deleted successfully",
            adminId : admin.data.id,
            jobId : job.id,
            email : admin.email,
         });
    } catch (err) {
        console.error("Failed to delete admin", err);
        return res.status(500).json({ message: "Failed to delete admin" });
    }
};

export { getAllAdmins, createAdmin, deleteAdmin };