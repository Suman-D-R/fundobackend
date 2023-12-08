import express from 'express';
import * as userController from '../controllers/user.controller';
import * as userUtils from '../utils/user.util';
import { newUserValidator, passwordValidater } from '../validators/user.validator';

const router = express.Router();

//route to create a new user
router.post('', newUserValidator, userController.userRegistration);

//route to login user
router.post('/login', userController.loginUser);

//route to forget password
router.post('/forgetpassword',userController.forgetpassword)

//route to reset password
router.post('/resetpassword/:token',passwordValidater,userController.resetPassword)


export default router;
