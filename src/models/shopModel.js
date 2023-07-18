const { DataTypes } = require('sequelize');
const DB = require('../configs/dbConfig');

module.exports = DB.define('shops', {
    shopId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    shopname: {
        type: DataTypes.STRING,
        unique: true,
    },
});
