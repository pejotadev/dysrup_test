const Sequelize = require('sequelize');

const sequelize = new Sequelize('dysruptest', 'root', 'toor', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;