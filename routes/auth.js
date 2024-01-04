const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');

router.post('/auth/signup',
    UsersController.generatePasswordHash,
    UsersController.signUp
);

router.post('/auth/login',
    UsersController.logIn
);

module.exports = router;