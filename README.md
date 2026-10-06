# CareerHub — MERN Job Portal

<div align="center">

![CareerHub Logo](https://img.shields.io/badge/CareerHub-Job%20Portal-0A84FF?style=for-the-badge&logo=react&logoColor=white)

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%2FLocal-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

CareerHub is a modern full-stack job portal where candidates can discover jobs, apply, track their applications, and recruiters can publish roles and manage candidate pipelines smoothly.

## ✨ Features

- Candidate login and registration
- Recruiter login and registration (opt-in security flag)
- JWT-based authentication with role-based access control
- Job listing, search, filtering, and detailed job pages
- Candidate dashboard with application tracking
- Recruiter dashboard for posting jobs and updating application status
- REST API built with Express and MongoDB
- Responsive UI for desktop and mobile screens
- Demo seed data for quick local testing

## 🧩 Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT + bcrypt
- Styling: Custom CSS

## 🏗️ Project Structure

```text
CareerHub/
├── client/                 # React frontend
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── src/
│   ├── test/
│   └── package.json
├── .gitignore
├── README.md
├── install.bat
├── start.bat
├── package.json
└── package-lock.json
```

## 🚀 Local Setup

### Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection
- VS Code

### Windows quick start

1. Open the project in VS Code.
2. Run:

```bash
npm install
npm run install:all
```

3. Create the backend environment file:

```bash
copy server\.env.example server\.env
```

4. Update `server/.env` with your values:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secure_secret
CLIENT_URL=http://127.0.0.1:5173
ALLOW_RECRUITER_REGISTRATION=true
```

5. Start the app:

```bash
start.bat
```

6. Open:

- Frontend: http://127.0.0.1:5173
- Backend health: http://127.0.0.1:5000/api/health

## 🔐 Demo Credentials

### Recruiter
- Email: recruiter@careerhub.local
- Password: recruiter123

### Candidate
- Create a new account from the register page

## 📸 Demo Flow

- Candidate signs up/login
- Candidate browses jobs
- Candidate applies to a role
- Recruiter logs in
- Recruiter posts jobs and manages applications
- Recruiter updates application status

## 🧪 Verification

The application has been validated with backend integration tests and a successful frontend build.

## 📚 Resources

- Uncodemy: https://uncodemy.com/course/full-stack-development-training-course-in-noida
- Uncodemy: https://uncodemy.com/course/full-stack-development-training-course-in-delhi

## 📄 License

This project is open for learning and portfolio use.
