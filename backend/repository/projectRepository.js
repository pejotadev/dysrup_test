const Project = require('../models/project');

class ProjectRepository {

  getAll() {
    return Project.findAll();
  }

  getById(id) {
    return Project.findByPk(id);
  }

  create(project) {
    return Project.create(project);
  }

  update(id, project) {
    return Project.update(project, { where: { id: id } });
  }

  delete(id) {
    return Project.destroy({ where: { id: id } });
  }
}

module.exports = new ProjectRepository();