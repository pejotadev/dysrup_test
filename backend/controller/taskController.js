const Task = require('../models/task');

exports.createTable = async function(req, res) {
    await Task.sync();
    res.send("Table created");
}

exports.createTask = async function(req, res) {
    const task = await Task.create(req.body);
    res.send(task);
}

exports.show = async function(req, res) {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
}

exports.showProjectTasks = async function(req, res) {
    const tasks = await Task.findAll({ where: { projectId: req.params.id } });
    res.status(200).json(tasks);
}

exports.findById = async function(req, res) {
    const task = await Task.findOne({ where: { id: req.params.id } });
    res.status(200).json(task);
}

exports.update = async function(req, res) {
    await Task.update(req.body, { where: { id: req.params.id } });
    res.status(200).json("Task updated");
}

exports.delete = async function(req, res) {
    await Task.destroy({ where: { id: req.params.id } });
    res.status(200).json("Task deleted");
}