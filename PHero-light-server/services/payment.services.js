const Order = require("../models/Payment");
const paymentServices = {};

paymentServices.setOrder = async (orderInfo) => {
  await Order.create(orderInfo);
};

module.exports = paymentServices;
