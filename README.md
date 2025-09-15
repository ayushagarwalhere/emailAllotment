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


