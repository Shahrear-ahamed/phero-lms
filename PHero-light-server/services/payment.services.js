const Order = require("../models/Payment");
const paymentServices = {};

paymentServices.setOrder = async (orderInfo) => {
  const order = await Order.create(orderInfo);
  console.log(order);
};

module.exports = paymentServices;
