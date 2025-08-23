import express from 'express'
import { allUsers, authUser, login, logout, register,   } from '../controllers/user-controllers.js';
import { validate } from '../../middlewares/validator-middleware.js';
import { user_login_schema, user_register_schema } from '../zod-validators/user-auth-validator.js';
import { verifyRefreshTokenAndLogout, verifyToken } from '../../middlewares/user-verify-token.js';
import upload from '../../middlewares/multer.js';

const User_Router = express.Router();

User_Router.post('/register', upload.single('image'), validate(user_register_schema), register);
User_Router.post('/logout', verifyToken, verifyRefreshTokenAndLogout, logout);
User_Router.post('/login', validate(user_login_schema), login);
User_Router.get('/getuser', verifyToken, authUser);
User_Router.get('/alluser', verifyToken, allUsers);


export default User_Router;