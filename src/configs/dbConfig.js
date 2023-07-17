const { Sequelize } = require('sequelize');

const DB = new Sequelize(
    'order_manager',
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
    }
);

module.exports = DB;
