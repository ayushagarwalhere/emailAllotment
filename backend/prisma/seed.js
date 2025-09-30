
import { RoleType } from "@prisma/client";
import { prisma } from "../src/config/db.js";

async function main(){
    const roles = [RoleType.ADMIN, RoleType.STUDENT, RoleType.SUPERADMIN];
    for(const role of roles){
        await prisma.role.upsert({
            where:{role :role},
            update:{},
            create:{role : role},
        });
        console.log("roles updated")
    }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});