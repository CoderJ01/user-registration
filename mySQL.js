const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.CLEAR_DB_DATABASE);

module.exports = sequelize;