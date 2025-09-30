import { Router } from "express";

const router = Router();
import { createAdmin, getAllAdmins, deleteAdmin } from "../controllers/superAdminControls.js";
import isSuperAdmin from "../middlewares/isSuperAdmin.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

// Super Admin routes
router.post("/createAdmin", isLoggedIn, isSuperAdmin, createAdmin);
router.get("/admins", isLoggedIn, isSuperAdmin, getAllAdmins);
router.delete("/deleteAdmin/:id", isLoggedIn, isSuperAdmin, deleteAdmin);


export default router;
