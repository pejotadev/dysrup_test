const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController.js');

router.post('/create', taskController.createTask);
router.get('/', taskController.show);
router.get('/:id', taskController.findById);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);
router.get('/createTable', taskController.createTable);

module.exports = router;