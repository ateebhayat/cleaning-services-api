const express = require('express');
const serviceRouter = express.Router();
const audit = require('../middleware/audit.js');
const ServicesController = require('../controllers/cleaning_services_controller.js');
const check_auth = require('../middleware/check-auth.js');

const API = {
  GET_ALL_SERVICES: '/',
  GET_INDIVIDUAL_SERVICE: '/:serviceID',
  DELETE_SERVICE: '/delete/:serviceID',
  UPDATE_SERVICE: '/update/:serviceID',

  ADD_SERVICE: '/',
};

serviceRouter.get(
  API.GET_ALL_SERVICES,
  audit,
  check_auth,
  ServicesController.getAllServices,
);
serviceRouter.get(
  API.GET_INDIVIDUAL_SERVICE,
  audit,
  check_auth,
  ServicesController.getService,
);
serviceRouter.post(
  API.ADD_SERVICE,
  audit,
  check_auth,
  ServicesController.addService,
);
serviceRouter.delete(
  API.DELETE_SERVICE,
  audit,
  check_auth,
  ServicesController.deleteService,
);
serviceRouter.put(
  API.UPDATE_SERVICE,
  audit,
  check_auth,
  ServicesController.updateService,
);

module.exports = serviceRouter;
