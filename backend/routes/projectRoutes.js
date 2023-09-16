const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController.js');

router.post('/create', projectController.createProject);
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;