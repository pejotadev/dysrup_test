const Task = require('../models/task');

class TaskRepository {

  getAll() {
    return Task.findAll();
  }

  getById(id) {
    return Task.findByPk(id);
  }

  create(task) {
    return Task.create(task);
  }

  update(id, task) {
    return Task.update(task, { where: { id: id } });
  }

  delete(id) {
    return Task.destroy({ where: { id: id } });
  }
}

module.exports = new TaskRepository();