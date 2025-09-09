import prisma from '../config/prismaClient.js';

const IsAdmin = async (req,res,next)=>{
    console.log("hitting the isAdmin route");
    const userData = req.user;
    const user = await prisma.user.findUnique({
        where : {email : userData.email},
    });
    if(user.role == "ADMIN"){
        next();
    }else{
        res.status(401).json({message : "Access denied"});
    }
}

export default IsAdmin