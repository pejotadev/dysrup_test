const Sequelize = require('sequelize');
const sequelize = require('../db/database');

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
    allowNull: false
    },
  status: {
    type: Sequelize.ENUM('active', 'inactive', 'completed'),
    allowNull: false
  },
  initial_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  final_date: {
    type: Sequelize.DATE,
    allowNull: false
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

module.exports = Project;