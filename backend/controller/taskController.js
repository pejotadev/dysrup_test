const Task = require('../models/task');

exports.createTable = async function(req, res, next) {
    try {
        await Task.sync();
        res.send("Table created");
    } catch (err) {
        next(err);
    }
}

exports.createTask = async function(req, res, next) {
    try {
        const task = await Task.create(req.body);
        res.send(task);
    } catch (err) {
        next(err);
    }
}

exports.show = async function(req, res, next) {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
}

exports.showProjectTasks = async function(req, res, next) {
    try {
        const tasks = await Task.findAll({ where: { projectId: req.params.id } });
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
}

exports.findById = async function(req, res, next) {
    try {
        const task = await Task.findOne({ where: { id: req.params.id } });
        res.status(200).json(task);
    } catch (err) {
        next(err);
    }
}

exports.update = async function(req, res, next) {
    try {
        await Task.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(await Task.findOne({ where: { id: req.params.id } }));
    } catch (err) {
        next(err);
    }
}

exports.delete = async function(req, res, next) {
    try {
        await Task.destroy({ where: { id: req.params.id } });
        res.status(200).json("Task deleted");
    } catch (err) {
        next(err);
    }
}