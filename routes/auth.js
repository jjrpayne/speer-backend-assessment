const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');

router.post('/api/auth/signup',
    UsersController.generatePasswordHash,
    UsersController.signUp
);

router.post('/api/auth/login',
    UsersController.logIn
);

module.exports = router;