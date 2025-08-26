import express from 'express'
import { verifyToken } from '../../middlewares/user-verify-token.js';
import { allMessages, sendMessage } from '../controllers/message-controllers.js';

const Message_Router = express.Router();

Message_Router.post('/send', verifyToken, sendMessage)
Message_Router.get('/fetch/:chatID', verifyToken, allMessages)


export default Message_Router;