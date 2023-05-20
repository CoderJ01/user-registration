const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.CLEAR_DB_DATABASE, 
    process.env.CLEAR_DB_USERNAME, 
    process.env.CLEAR_DB_PASSWORD, 
    {
        host: process.env.CLEAR_DB_HOST,
        dialect: 'mysql'
    }
);

module.exports = sequelize;