const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController.js');

router.get('/createTable', projectController.createTable);
router.post('/create', projectController.createProject);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.delete);
router.get('/:id', projectController.findById);
router.get('/', projectController.show);

module.exports = router;