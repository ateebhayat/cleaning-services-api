const express = require('express');
const shopRouter = express.Router();
const audit = require('../middleware/audit.js');
const ShopController = require('../controllers/cleaning_services_controller.js');
const check_auth = require('../middleware/check-auth.js');

const API = {
  GET_ALL_SHOPS: '/',
  GET_INDIVIDUAL_SHOP: '/:shopID',
  ADD_SHOP: '/',
};

// get all shops
shopRouter.get(
  API.GET_ALL_SHOPS,
  audit,
  check_auth,
  ShopController.getAllShops,
);
shopRouter.get(
  API.GET_INDIVIDUAL_SHOP,
  audit,
  check_auth,
  ShopController.getShop,
);
// add shop
shopRouter.post(API.ADD_SHOP, audit, check_auth, ShopController.addShops);
module.exports = shopRouter;
