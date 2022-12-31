const Order = require("../models/Order");
const paymentServices = {};

paymentServices.setOrder = async (orderInfo) => {
  console.log(orderInfo);
  const order = await Order.create(orderInfo);
  console.log(order);
};

module.exports = paymentServices;
