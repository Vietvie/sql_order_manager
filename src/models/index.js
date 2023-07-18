const DB = require('../configs/dbConfig');
const shopModel = require('./shopModel');
const userModel = require('./userModel');

const Users = userModel;
const Shops = shopModel;

//relationsive
Shops.belongsTo(Users, { foreignKey: 'ownerId' });

DB.sync({ force: false, alter: true });

module.exports = {
    Users,
    Shops,
};
