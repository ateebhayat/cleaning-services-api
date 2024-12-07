const JWT = require('../helpers/jwt/jwtHelper');
const CleaningServices = require('../services/cleaning_services');

const { wrapAsync } = require('../utils/wrapAsync');

const getAllServices = async (req, res) => {
  const { page = 1, limit = 10, searchTerm, category } = req.body;

  let query = { isDeleted: false };
  if (category) {
    query.category = category;
  }
  if (searchTerm) {
    query = {
      ...query,
      $or: [{ service_name: { $regex: searchTerm, $options: 'i' } }],
    };
  }
  const services = await CleaningServices.getAllServices(query, page, limit);

  return res.json({
    data: services,
    currentPage: page,
    nextPage: shops.length < limit ? null : page + 1,
    message: 'Service found successfully',
  });
};
const createService = async (req, res) => {
  const { ...rest } = req.body;

  // Save all shops to the database
  const response = await CleaningServices.createService(rest);

  res.status(200).json({
    services: response,
  });
};

const getService = async (req, res) => {
  const { serviceID } = req.params;
  const services = await CleaningServices.getServiceByID(serviceID);

  return res.json({
    data: services,
    message: 'Service deleted successfully',
  });
};
const deleteService = async (req, res) => {
  const { serviceID } = req.params;
  const services = await CleaningServices.deleteService(serviceID);

  return res.json({
    data: services,
    message: 'Service found successfully',
  });
};
const updateService = async (req, res) => {
  const { serviceID } = req.params;
  const updatedServiceData = req.body;
  const services = await CleaningServices.updateService(
    serviceID,
    updatedServiceData,
  );

  return res.json({
    data: services,
    message: 'Service updated successfully',
  });
};

const ShopController = {
  getAllServices: wrapAsync(getAllServices),
  addService: wrapAsync(createService),
  getService: wrapAsync(getService),
  deleteService: wrapAsync(deleteService),
  updateService: wrapAsync(updateService),
};

module.exports = ShopController;
