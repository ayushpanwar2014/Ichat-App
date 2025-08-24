import express from 'express'
import { verifyToken } from '../../middlewares/user-verify-token.js';
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup } from '../controllers/chat-controllers.js';

const Chat_Router = express.Router();

Chat_Router.post('/', verifyToken, accessChat);
Chat_Router.get('/', verifyToken, fetchChats);
Chat_Router.post('/creategroup', verifyToken, createGroupChat);
Chat_Router.put('/rename', verifyToken, renameGroup);
Chat_Router.put('/groupremove', verifyToken, removeFromGroup);
Chat_Router.put('/groupadd', verifyToken, addToGroup);


export default Chat_Router;