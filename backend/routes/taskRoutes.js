const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController.js');

router.get('/createTable', taskController.createTable);

router.get('/create', taskController.createTask);


module.exports = router;