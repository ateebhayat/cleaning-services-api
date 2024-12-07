const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema(
  {
    service_name: {
      type: String,
      required: true,
    },
    service_type: {
      type: String,
    },
    price: {
      type: String,
    },
    duration: {
      type: String,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', // Reference to the User model
    },
  },
  { timestamps: true },
);

module.exports = servicesSchema;
