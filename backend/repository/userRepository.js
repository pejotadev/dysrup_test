const User = require('../models/user');

exports.createUser = (user) => {
    return User.create(user);
};

exports.findUserByEmail = (email) => {
    return User.findOne({ where: { email: email } });
};