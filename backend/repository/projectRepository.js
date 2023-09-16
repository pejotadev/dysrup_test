const Project = require('../models/project');

class ProjectRepository {

  getAll(userId) {
    return Project.findAll({ where: { userId: userId } });
  }

  getById(id, userId) {
    return Project.findByPk(id, { where: { userId: userId } });
  }

  create(project, userId) {
    return Project.create({ ...project, userId: userId });
  }

  update(id, project, userId) {
    return Project.update(project, { where: { id: id, userId: userId } });
  }

  delete(id, userId) {
    return Project.destroy({ where: { id: id, userId: userId } });
  }
}

module.exports = new ProjectRepository();