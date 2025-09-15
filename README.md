EMAIL-ALLOTMENT
# Full-Stack Authentication System with OTP, JWT, Prisma, and Redis

A secure, scalable, and maintainable authentication system built with *React*, *TailwindCSS*, *Node.js*, *Express*, *Prisma*, *Redis*, and *JWT*, featuring OTP-based login and refresh token management.

This project separates concerns by using **Redis** for temporary OTP storage and **PostgreSQL** (via Prisma) for persistent refresh token management, providing both security and performance.

---

## ✅ Features
- **AdminPanel**, **StudentPanel** & **SuperUserPanel**
- **Signup & Login flows** with email and password validation.
- **OTP-based authentication**, stored temporarily in Redis.
- **JWT access and refresh tokens** for session management.
- **Refresh tokens stored securely** in PostgreSQL using Prisma.
- **Environment-based configuration** using `.env` files.
- **Scalable architecture** with Redis and Kubernetes-ready deployment.
- **Input validation** using Zod and express-validator.
- **Modular structure** for frontend and backend separation.

---

PROJECT_ARCHITECTURE
![architecture](https://github.com/user-attachments/assets/0c3e4738-77c6-45e9-9ffa-c75fb6076e4b)

---

## 📂 Project Structure(till now)

project-root/
├── backend/
│ ├── config/
│ │ └── db.js # Prisma and Redis setup
│ ├── routes/
│ │ └── auth/
│ │ ├── controller.js # Handles requests and responses
│ │ ├── service.js # Business logic including OTP and JWT
│ │ ├── validator.js # Input validation
│ │ └── route.js # API routes
│ ├── prisma/
│ │ └── schema.prisma # Database models
│ ├── .env
│ ├── index.js # Entry point
│ └── package.json
├── frontend/
│ ├── src/ # React components, pages, services
│ └── package.json
├── .gitignore
└── README.md

---

## Technologies Used

| Layer          | Technology      |
|----------------|----------------|
| Backend        | Node.js, Express |
| Database       | PostgreSQL, Prisma |
| Caching        | Redis |
| Authentication | JWT (jsonwebtoken) |
| Validation     | Zod, express-validator |
| Environment   | dotenv |
| Frontend       | React, Vite, Tailwind CSS |

---

## Prerequisites

Ensure the following tools are installed on your system:

✔ [Node.js](https://nodejs.org/en/) (v16 or later)  
✔ [npm](https://www.npmjs.com/get-npm)                                                                                                                                                                                                       
✔ [PostgreSQL](https://www.postgresql.org/download/)  
✔ [Redis](https://redis.io/docs/getting-started/installation/)  
✔ A code editor like [VS Code](https://code.visualstudio.com/)

---

## Project Setup & Installation Instructions

### Clone the repository

git clone https://github.com/ayushagarwalhere/emailAllotment.git
cd emailAllotment

### SETUP BACKEND -
cd backend        
npm install        
create a .env file       
update .env with your database and credentials        
generate prisma client -> npx prisma generate
                          npx prisma migrate dev --name init         
npm start   
                                                              
### SETUP FRONTEND - 
cd ../frontend        
npm install         
create a .env file         
update .env file with your credentials          
npm run dev           

---
                          
                          



