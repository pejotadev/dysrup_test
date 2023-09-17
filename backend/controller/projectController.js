const Project = require('../models/project');
const User = require('../models/user');
const Task = require('../models/task');
const jwt = require('jsonwebtoken');

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
        const token = req.headers.authorization;
        const tokenWithoutBearer = token.replace('Bearer ', '');
        const decodedToken = jwt.decode(tokenWithoutBearer);
        const project = await Project.create({ ...req.body, userId: decodedToken.userId });
       res.send(project);
    } catch (err) {
        console.log(req.user.id);
        console.log(req.body);
        next(err);
    }
}

exports.show = async function(req, res, next) {
    try {
        const projects = await Project.findAll({
            include: [{
                model: User,
                attributes: ['name']
            }]
        });
        if (!projects) throw new Error('No projects found');
        res.status(200).json(projects);
    } catch (err) {
        next(err);
    }
}

exports.findById = async function(req, res, next) {
    try {
        
        const project = await Project.findOne({
            where: { id: req.params.id },
            include: [{
                model: User,
                attributes: ['name']
            },
            {
                model: Task
            }]});

        if (!project) throw new Error('Project not found');
        res.status(200).json(project);
    } catch (err) {
        next(err);
    }
}

exports.update = async function(req, res, next) {
    try {
        const project = await Project.update(req.body, { where: { id: req.params.id } });
        if (!project) throw new Error('Project not found');
        res.status(200).json(await Project.findOne({ where: { id: req.params.id }}));
    } catch (err) {
        next(err);
    }
}

exports.delete = async function(req, res, next) {
    try {
        await Project.destroy({ where: { id: req.params.id } });
        res.status(200).json(await Project.findAll({
            include: [{
                model: User,
                attributes: ['name']
            }]
        }));
    } catch (err) {
        next(err);
    }
}