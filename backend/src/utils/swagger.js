import YAML from 'yamljs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import addTagToPaths from './tagHelper.js';



const superAdminDoc = YAML.load(path.join(process.cwd(),"./src/docs/superAdmin.yaml"));
const adminDoc = YAML.load(path.join(process.cwd(),"./src/docs/admin.yaml"));
const studentDoc = YAML.load(path.join(process.cwd(),"./src/docs/student.yaml"));

const swaggerSpec = {
    openapi: "3.0.0",
    info:{
        title : "Email Allotment",
        version: "1.0.0",
        description: `This is the **Online Email Allotment System For NITH**.  
                    It provides different endpoints for **Super Admin**, **Admin**,
                    and **Student** roles`
    },
    servers: [
        {
        url: "http://localhost:5000/",
        description: "Local Development Server"
        },
    ],
    tags: [
        { name: "Super Admin", description: "System-wide operations" },
        { name: "Admin", description: "User and allocation management" },
        { name: "Student", description: "Student actions" }
    ],
    paths: {
        ...addTagToPaths(superAdminDoc, "Super Admin"),
        ...addTagToPaths(adminDoc, "Admin"),
        ...addTagToPaths(studentDoc, "Student")
    }

}

export {swaggerUi, swaggerSpec}
