import { RoleType } from "@prisma/client";
import prisma from "../config/prismaClient";
import { createAdminSchema, validUuid } from "../zod-schema/form";

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
        return res.status(400).json({message: admin.error.message});
    }

    const { name,middlename, lastname, branch, email, password } = admin.data;

    try {
        const existingAdmin = await prisma.user.findUnique({ where: { email } });
        if (existingAdmin) {
            return res.status(409).json({ message: "Admin with this email already exists" });
        }
        const newAdmin = await prisma.user.create({
            data: {
                name,
                middlename,
                lastname,
                branch,
                email,
                password,
                role: RoleType.ADMIN,
            },
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
        return res.status(201).json({ 
            message: "Admin created successfully",
            admin: newAdmin
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
    const {id} = adminId.data;
    try {
        const deletedAdmin = await prisma.user.deleteMany({
            where: { 
                id,
                role: RoleType.ADMIN
            }
        }); 
        if (deletedAdmin.count === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json({ message: "Admin deleted successfully" });
    } catch (err) {
        console.error("An error occurred", err);
        return res.status(500).json({ message: "Error while deleting the admin" });
    }
};

export { getAllAdmins, createAdmin, deleteAdmin };