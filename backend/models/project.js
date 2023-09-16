const Sequelize = require('sequelize');
const sequelize = require('../db/database');
const User = require('./user');
const Task = require('./task');

const Project = sequelize.define('project', {
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
  description: {
    type: Sequelize.STRING,
    allowNull: true
    },
  status: {
    type: Sequelize.ENUM('active', 'inactive', 'completed'),
    allowNull: false,
    defaultValue: 'active'
  },
  initial_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  final_date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  }
});

Project.belongsTo(User);
Project.hasMany(Task);

module.exports = Project;