const PaymentSession = require("ssl-commerz-node").PaymentSession;
const paymentController = {};

// models
const Cart = require("../models/Cart");
const Profile = require("../models/Profile");

paymentController.initPayment = async (req, res) => {
  const userName = req?.user.name;
  const userEmail = req?.user.email;

  // find data from database using models
  const cart = await Cart.findOne({ userEmail });

  const payment = new PaymentSession(
    true,
    process.env.SSLCOMMERZ_STORE_ID,
    process.env.SSLCOMMERZ_STORE_PASSWORD
  );

  // transaction id and user card items total amound
  console.log(req?.user);
  const userSubId = userName?.slice(0, 5);
  const transactionId = `${userSubId}_${Math.random()
    .toString(36)
    .substr(2, 9)}${new Date().getTime()}`;

  //   const cartAmount = cart.cartList
  console.log(cart);

  // Set the urls
  payment.setUrls({
    success: "https:www.yoursite.com/success", // If payment Succeed
    fail: "https:www.yoursite.com/fail", // If payment failed
    cancel: "https:www.yoursite.com/cancel", // If user cancel payment
    ipn: "https:www.yoursite.com/ipn", // SSLCommerz will send http post request in this link
  });

  // Set order details
  payment.setOrderInfo({
    total_amount: 1570, // Number field
    currency: "BDT", // Must be three character string
    tran_id: transactionId, // Unique Transaction id
    emi_option: 0, // 1 or 0
  });

  // Set customer info
  payment.setCusInfo({
    name: "Simanta Paul",
    email: "simanta@bohubrihi.com",
    add1: "66/A Midtown",
    add2: "Andarkilla",
    city: "Chittagong",
    state: "Optional",
    postcode: 4000,
    country: "Bangladesh",
    phone: "010000000000",
    fax: "Customer_fax_id",
  });

  // Set shipping info
  payment.setShippingInfo({
    method: "Courier", //Shipping method of the order. Example: YES or NO or Courier
    num_item: 2,
    name: "Simanta Paul",
    add1: "66/A Midtown",
    add2: "Andarkilla",
    city: "Chittagong",
    state: "Optional",
    postcode: 4000,
    country: "Bangladesh",
  });

  // Set Product Profile
  payment.setProductInfo({
    product_name: "Computer",
    product_category: "Electronics",
    product_profile: "general",
  });

  const response = await payment.paymentInit();
  res.status(200).send(response);
};

module.exports = paymentController;
