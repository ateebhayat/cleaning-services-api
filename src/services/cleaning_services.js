const models = require('../models/index');

class ShopService {
  async createUser(postData) {
    return await models.Shops({ ...postData }).save();
  }

  async getAllShops(query, page, limit) {
    return await models.Shops.find({ ...query })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
  }

  async getShop(filter) {
    return await models.Shops.findOne({ ...filter });
  }

  async addShops(shops) {
    return await models.Shops.insertMany(shops);
  }

  async getShopByID(userID) {
    return await models.Shops.findOne({ _id: userID, isDeleted: false }).lean();
  }
}

module.exports = new ShopService();
