const bcrypt = require('bcrypt');

const checkPasswordCorrect = async function (inputPassword, password) {
    return await bcrypt.compare(inputPassword, password);
};

module.exports = checkPasswordCorrect;
