const Order = require("../models/Order");
const paymentServices = {};

paymentServices.setOrder = async (orderInfo) => {
  await Order.create(orderInfo);
};

module.exports = paymentServices;
