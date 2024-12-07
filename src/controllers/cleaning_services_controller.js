const JWT = require('../helpers/jwt/jwtHelper');
const ShopServices = require('../services/cleaning_services');

const { wrapAsync } = require('../utils/wrapAsync');

const getAllShops = async (req, res) => {
  const { page = 1, limit = 10, searchTerm, category } = req.body;

  let query = { isDeleted: false };
  if (category) {
    query.category = category;
  }
  if (searchTerm) {
    query = {
      ...query,
      $or: [{ shop_name: { $regex: searchTerm, $options: 'i' } }],
    };
  }
  const shops = await ShopServices.getAllShops(query, page, limit);

  return res.json({
    data: shops,
    currentPage: page,
    nextPage: shops.length < limit ? null : page + 1,
    message: 'Shops found successfully',
  });
};
const createShops = async (req, res) => {
  const { ...rest } = req.body;

  // Save all shops to the database
  const response = await ShopServices.addShops(rest);

  res.status(200).json({
    shops: response,
  });
};

const getShop = async (req, res) => {
  const { shopID } = req.params;
  const shop = await ShopServices.getShopByID(shopID);

  return res.json({
    data: shop,
    message: 'Shop found successfully',
  });
};

const ShopController = {
  getAllShops: wrapAsync(getAllShops),
  addShops: wrapAsync(createShops),
  getShop: wrapAsync(getShop),
};

module.exports = ShopController;
