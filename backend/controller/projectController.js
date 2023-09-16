const Project = require('../models/project');

exports.createTable = async function(req, res) {
    await Project.sync();
    res.send("Table created");
}

exports.getProjects = async function(req, res) {
  const projects = await Project.findAll();
  res.send(projects);
}

exports.getProjectWithTasks = async function(req, res) {
  const project = await Project.findOne({ where: { id: req.params.id }, include: ['tasks'] });
  res.send(project);
}

exports.getProject = async function(req, res) {
  const project = await Project.findOne({ where: { id: req.params.id } });
  res.send(project);
}

exports.updateProject = async function(req, res) {
  await Project.update(req.body, { where: { id: req.params.id } });
  res.send("Project updated");
}

exports.deleteProject = async function(req, res) {
  await Project.destroy({ where: { id: req.params.id } });
  res.send("Project deleted");
}

exports.createProject = async function(req, res) {
  const project = await Project.create(req.body);
  res.send(project);
}

exports.findById = async function (req, res) {
  const project = await Project.findOne({ where: { id: req.params.id } });
  res.send(project);
}