const Project = require('../models/project');

exports.createTable = async function(req, res, next) {
    try {
        await Project.sync();
        res.send("Table created");
    } catch (err) {
        next(err);
    }
}

exports.createProject = async function(req, res, next) {
    try {
        const project = await Project.create({ ...req.body, userId: req.user.id });
        res.send(project);
    } catch (err) {
        next(err);
    }
}

exports.show = async function(req, res, next) {
    try {
        const projects = await Project.findAll({ where: { userId: req.user.id } });
        if (!projects) throw new Error('No projects found');
        res.status(200).json(projects);
    } catch (err) {
        next(err);
    }
}

exports.findById = async function(req, res, next) {
    try {
        const project = await Project.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!project) throw new Error('Project not found');
        res.status(200).json(project);
    } catch (err) {
        next(err);
    }
}

exports.update = async function(req, res, next) {
    try {
        const project = await Project.update(req.body, { where: { id: req.params.id, userId: req.user.id } });
        if (!project) throw new Error('Project not found');
        res.status(200).json("Project updated");
    } catch (err) {
        next(err);
    }
}

exports.delete = async function(req, res, next) {
    try {
        await Project.destroy({ where: { id: req.params.id, userId: req.user.id } });
        res.status(200).json("Project deleted");
    } catch (err) {
        next(err);
    }
}