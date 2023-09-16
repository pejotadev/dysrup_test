const express = require('express');
const router = express.Router();
const taskRoutes = require('../controller/taskController.js');
const projectRoutes = require('../controller/projectController.js');
// Routes
router.get('/create/database', taskRoutes.createDB);
router.get('/task/create/table', taskRoutes.createTable);
router.post('/create/task', taskRoutes.insertData);
router.get('/tasks', taskRoutes.show);
router.get('/task/:id', taskRoutes.findById);
router.put('/task/:id', taskRoutes.update);
router.delete('/task/:id', taskRoutes.delete);

router.get('/projects', projectRoutes.show);
router.get('/project/:id', projectRoutes.findById);
router.put('/project/:id', projectRoutes.update);
router.delete('/project/:id', projectRoutes.delete);
router.post('/create/project', projectRoutes.createProject);




module.exports = router;