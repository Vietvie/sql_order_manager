const changedPasswordAfter = function (tokenTimeStamp, changePasswordAt) {
    if (changePasswordAt) {
        return tokenTimeStamp < changePasswordAt.getTime() / 1000;
    }
    return false;
};

module.exports = changedPasswordAfter;
