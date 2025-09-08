[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&width=435&lines=%F0%9F%92%AC+iChat+Applicatioin)](https://git.io/typing-svg)

<img width="1360" height="1128" alt="ichat-App" src="https://github.com/user-attachments/assets/a639016f-a5a6-430f-a3a6-0bdc721e7f40" />


## Full-Stack Developer 
## GitHub Repository: [Ichat-App](https://github.com/ayushpanwar2014/Ichat-App) | Remote  

---

<article>
  <h2>Tech Skills 🛠️</h2>

  <!-- Skillicons for supported skills -->
  <img src="https://skillicons.dev/icons?i=html,css,js,react,nodejs,expressjs,mongodb,git,github&perline=5" alt="Tech Stack" />
  
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![WebSockets](https://img.shields.io/badge/WebSockets-333333?style=for-the-badge&logo=websocket&logoColor=white)
![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![REST APIs](https://img.shields.io/badge/REST%20APIs-6C63FF?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</article>

<article>


## Overview
iChat is a MERN stack real-time chat application designed to support thousands of concurrent users. It ensures instant messaging and notifications using Socket.io + WebSockets, with JWT authentication, rotating refresh tokens, and HTTP-only cookies securing user sessions. The app offers group management (create, rename, add/remove, set admins), friend search, and Cloudinary-powered image uploads. A Material UI macOS-inspired interface delivers a smooth UX across desktop and mobile, while Node.js clustering boosts performance by utilizing multiple CPU cores. Deployed on Vercel, iChat is built for scalability, security, and real-time communication.

---

## Features
- Built iChat, a macOS-inspired real-time chat app with secure authentication, group management, notifications, and Cloudinary uploads, deployed on Vercel.
- Real-time messaging & notifications powered by Socket.io + WebSockets
- Friend system with search & add functionality
- Secure authentication with JWT, rotating refresh tokens, and HTTP-only cookies
- Image upload & media handling via Cloudinary integration
- Modern macOS-inspired UI built with Material UI, fully mobile responsive
- Clustered Node.js backend for multi-core performance scaling  
- Optimized MongoDB queries for handling large chat histories 
- RESTful API endpoints for frontend consumption

---

## Environment Variables
The backend requires the following environment variables in a `.env` file:


```bash
PORT=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
MONGODB_URL=
JWT_SECRET=
FRONTEND_URL=
BACKEND_URL=

````
The Frontend requires the following environment variables in a `.env` file:

```bash

VITE_BACKEND_URL = 

````

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ayushpanwar2014/Prescripto.git
````

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Run the backend server:

```bash
npm start
```

4. Set up frontend in `/frontend` and `/admin` folders (React apps) and run with `npm start`.

---

## Backend Dependencies

* argon2
* cloudinary
* cookie-parser
* cors
* dotenv
* express
* express-rate-limit
* helmet
* hpp
* jsonwebtoken
* mongoose
* morgan
* multer
* redis
* zod
* pm2

---

## License

MIT License


