const DB = require('../configs/dbConfig');
const shopModel = require('./shopModel');
const userModel = require('./userModel');

const User = userModel;
const Shop = shopModel;

//methods

//relationsive
Shop.belongsTo(User, { foreignKey: 'ownerId' });
User.hasMany(Shop, { foreignKey: 'ownerId' });

DB.sync({ force: true, alter: true });

module.exports = {
    User,
    Shop,
};
