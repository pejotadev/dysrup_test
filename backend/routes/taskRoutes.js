const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController.js');

router.get('/createTable', taskController.createTable);

router.post('/create', taskController.createTask);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);
router.get('/:id', taskController.show);
router.get('/project/:id', taskController.showProjectTasks);
router.get('/find/:id', taskController.findById);



module.exports = router;