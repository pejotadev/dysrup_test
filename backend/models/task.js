const Sequelize = require('sequelize');
const sequelize = require('../db/database');

const Task = sequelize.define('task', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  projectId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'projects',
      key: 'id'
    }
  },
  status: {
    type: Sequelize.ENUM('active', 'inactive', 'completed'),
    allowNull: false,
    defaultValue: 'active'
  },
  final_date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

module.exports = Task;