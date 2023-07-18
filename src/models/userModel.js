const { DataTypes } = require('sequelize');
const DB = require('../configs/dbConfig');
const bcrypt = require('bcrypt');

module.exports = DB.define(
    'users',
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: [8, 20],
            },
        },
        passwordConfirm: {
            type: DataTypes.STRING,
            validate: {
                isMatch(value) {
                    if (value !== this.password) {
                        throw new Error('Password confirm not match');
                    }
                },
            },
        },
        changePasswordAt: {
            type: DataTypes.DATE,
        },
        role: {
            type: DataTypes.ENUM,
            values: ['user', 'admin'],
            defaultValue: 'user',
        },
    },
    {
        freezeTableName: true,
        hooks: {
            beforeCreate: function (user) {
                user.email = user.email.toLowerCase();
            },
            beforeSave: async function (user) {
                if (user.isNewRecord || user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 12);
                    user.passwordConfirm = undefined;
                }
            },
        },
        defaultScope: {
            attributes: {
                exclude: ['password', 'passwordConfirm', 'role'],
            },
        },
    }
);
