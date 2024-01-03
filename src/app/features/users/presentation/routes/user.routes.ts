import express from 'express';
import { UserController } from '../controllers';
import { createUserValidator } from '../middlewares';
import { updateUserValidator } from '../middlewares/update-user-validator.middleware';

export default () => {
    const router= express.Router();

    const userController = new UserController();

    router.post('/createUser', createUserValidator, userController.createUser)

    router.get('/updateUser', updateUserValidator, userController.getUsers)

    return router;
}