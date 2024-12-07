const mongoose = require('mongoose');
const userSchema = require('./user_model');
const servicesSchema = require('./services_model');

const models = {
  Users: mongoose.model('users', userSchema),
  Shops: mongoose.model('services', servicesSchema),
};
module.exports = models;
