import YAML from 'yamljs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';


// const superAdminDoc = YAML.load(path.join(__dirname,"./backend/src/docs/superAdmin.yaml"));
const adminDoc = YAML.load(path.join(process.cwd(),"./src/docs/admin.yaml"));
// const studetDoc = YAML.load(path.join(__dirname,"./backend/src/docs/student.yaml"));

const swaggerSpec = {
    openapi: "3.0.0",
    info:{
        title : "Email Allotment",
        version: "1.0.0"
    },
    paths:{
        ...adminDoc.paths,
        // ...superAdminDoc.paths,
        // ...studetDoc.paths
    }
}

export {swaggerSpec, swaggerUi}
