const { Users } = require('../models');

exports.newUser = async (req, res, next) => {
    console.log('test');

    try {
        const newUser = await Users.create({
            name: 'Viet',
            email: 'viet@123.com',
            password: 'newpassword',
            passwordConfirm: 'newpassword',
        });

        console.log(newUser);

        res.status(200).json('OK');
    } catch (error) {
        console.log(error);
    }
};
