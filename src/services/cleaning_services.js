const models = require('../models/index');

class CleaningServices {
  async createService(serviceData) {
    return await models.Shops({ ...serviceData }).save();
  }

  async getAllServices(query, page, limit) {
    return await models.Shops.find({ ...query })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
  }

  async addService(shops) {
    return await models.Shops.insertMany(shops);
  }

  async getServiceByID(serviceID) {
    return await models.Shops.findOne({
      _id: serviceID,
      isDeleted: false,
    }).lean();
  }

  async deleteService(serviceID) {
    return await models.Shops.findByIdAndDelete(serviceID);
  }

  async updateService(serviceID, updateData) {
    return await models.Shops.findByIdAndUpdate(
      serviceID,
      { ...updateData },
      { new: true },
    );
  }
}

module.exports = new CleaningServices();
