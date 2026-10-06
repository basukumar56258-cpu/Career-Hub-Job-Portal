<div align="center">

# CareerHub

### Find your next opportunity. Build what comes next.

A modern, full-stack job portal connecting candidates with growing companies.

[![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-111111?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

[Features](#-what-you-can-do) · [Get started](#-get-started) · [Demo account](#-demo-account)

</div>

---

## ✨ What you can do

| For candidates | For recruiters |
| --- | --- |
| Discover and search job listings | Publish and manage job openings |
| View role details and apply | Review applications and update candidate status |
| Track application progress from a dashboard | Manage the hiring pipeline from a recruiter dashboard |

CareerHub also includes secure registration and login, JWT authentication, and role-based access control.

## 🧰 Built with

| Frontend | Backend | Data and authentication |
| --- | --- | --- |
| React 19, Vite, React Router | Node.js, Express 5 | MongoDB, Mongoose |
| Lucide icons, custom CSS | REST API | JWT, bcrypt |

## 🚀 Get started

### Requirements

- Node.js 18 or later and npm
- MongoDB locally or a MongoDB Atlas connection

### Install

From the project root:

```bash
npm install
npm run install:all
```

Create the backend environment file on Windows:

```powershell
Copy-Item server\.env.example server\.env
```

Update `server/.env` with your MongoDB connection and a private JWT secret:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/careerhub
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://127.0.0.1:5173
ALLOW_RECRUITER_REGISTRATION=true
```

For local development, start the frontend and API together:

```bash
npm run dev
```

On Windows, you can also use `start.bat` after creating `server/.env`.

| Service | URL |
| --- | --- |
| CareerHub web app | [http://127.0.0.1:5173](http://127.0.0.1:5173) |
| API health check | [http://127.0.0.1:5000/api/health](http://127.0.0.1:5000/api/health) |

## 🔐 Demo account

Use the seeded recruiter account to explore recruiter features:

```text
Email:    recruiter@careerhub.local
Password: recruiter123
```

Candidates can create an account from the registration page. Demo accounts are for local development only.

## 🗂️ Project structure

```text
CareerHub/
├── client/                 # React + Vite application
│   └── src/
│       ├── components/     # Shared UI components
│       ├── context/        # Authentication state
│       └── pages/          # Home, jobs, dashboards, and auth
├── server/                 # Express API and MongoDB models
│   ├── src/
│   └── test/               # Backend integration tests
├── package.json            # Root development scripts
├── start.bat               # Windows quick start
└── README.md
```

## 🧪 Tests and production build

Run the backend test suite:

```bash
npm test --prefix server
```

Build the frontend for production:

```bash
npm run build --prefix client
```

## 📄 License

This project is open for learning and portfolio use.
