const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/createUser', userController.createUser);
router.get('/createTable', userController.createTable);


module.exports = router;