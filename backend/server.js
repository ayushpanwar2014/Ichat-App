import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

import { errorMiddlewares } from './middlewares/error-middlewares.js';
import { securityMiddleware } from './middlewares/security-middlewares.js';
import { connectCloudinary } from './config/cloudinary.js';
import { dbConnected } from './config/dbConnect.js';

import User_Router from './src/routes/user-routes.js';
import Chat_Router from './src/routes/chat-routes.js';
import Message_Router from './src/routes/message-routes.js';
import { socketHandler } from './socket/websocket.js';

dotenv.config();

// app config
const app = express();
const PORT = process.env.PORT || 7060;

// create http server
const httpServer = createServer(app);

// socket.io server
const io = new Server(httpServer, {
    pingTimeout: 60000, //after 60s user is not active it will off
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    },
});

socketHandler(io);

// connect cloudinary
connectCloudinary().then(() => console.log('Cloudinary Connected ✅'));

// security middlewares
securityMiddleware(app);

// core middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));

// get ip address
app.set('trust proxy', false);

// api routes
app.use('/api/user', User_Router);
app.use('/api/chat', Chat_Router);
app.use('/api/message', Message_Router);

// error middleware
app.use(errorMiddlewares);


// init DB + start server
const initAPP = async () => {
    await dbConnected();
};

initAPP()
    .then(() => {
        httpServer.listen(PORT, () => {
            console.log(`🚀 Server is running on PORT: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database Connection Failed!', err);
    });
