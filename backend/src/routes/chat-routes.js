import express from 'express'
import { verifyToken } from '../../middlewares/user-verify-token.js';
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup } from '../controllers/chat-controllers.js';

const Chat_Router = express.Router();

Chat_Router.post('/', verifyToken, accessChat);
Chat_Router.get('/', verifyToken, fetchChats);
Chat_Router.post('/creategroup', verifyToken, createGroupChat);
Chat_Router.put('/renamechatgroup', verifyToken, renameGroup);
Chat_Router.put('/addtogroup', verifyToken, addToGroup);
Chat_Router.put('/removefromgroup', verifyToken, removeFromGroup);


export default Chat_Router;