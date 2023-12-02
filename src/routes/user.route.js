import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//route to create a new user
router.post('', newUserValidator, userController.userRegistration);

//route to login user
router.post('/login', userController.loginUser);


//route to get a single user by their user id
router.get('/:email', userController.getUser);

//route to update a single user by their user id
router.put('/:_id',newUserValidator, userController.updateUser);

//route to delete a single user by their user id
router.delete('/:_id',newUserValidator, userController.deleteUser);

export default router;
