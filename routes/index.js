const express = require('express');
const router = express.Router();
const todoControllers = require('../controllers/todoController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', authController.checkLogIn, catchErrors(todoControllers.todo));
router.post(
    '/',
    authController.checkLogIn,
    catchErrors(todoControllers.addTodo)
);

router.post(
    '/todo/:id',
    authController.checkLogIn,
    catchErrors(todoControllers.checkStatus)
);

router.post(
    '/deleteTodo/:id',
    authController.checkLogIn,
    catchErrors(todoControllers.deleteTodo)
);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);

router.get('/register', userController.registerForm);
router.post(
    '/register',
    userController.validateRegister,
    userController.register,
    authController.login
);

router.get('/forgotPassword', authController.forgot);
router.post('/forgotPassword', catchErrors(authController.forgotPassword));

router.get('/resetPassword/:token', authController.resetPassword);
router.post(
    '/resetPassword/:token',
    authController.confirmedPassword,
    catchErrors(authController.updatePassword)
);

router.get('/logout', authController.logout);

router.get('/account', authController.checkLogIn, userController.account);
router.post(
    '/account',
    userController.upload,
    catchErrors(userController.resize),
    catchErrors(userController.updateAccount)
);

module.exports = router;
