import express from "express";
const router = express.Router();
import { createAdmin, getAllAdmins, deleteAdmin } from "../controllers/superAdminControls.js";
import isSuperAdmin from "../middlewares/isSuperAdmin.js";

// Super Admin routes
router.post("/createAdmin", isSuperAdmin, createAdmin);
router.get("/admins", isSuperAdmin, getAllAdmins);
router.delete("/deleteAdmin/:id", isSuperAdmin, deleteAdmin);


export default router;
