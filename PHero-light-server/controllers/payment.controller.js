const fetch = require("node-fetch");
const FormData = require("form-data");
const { setOrder } = require("../services/payment.services");

//
const paymentController = {};

// models
const Cart = require("../models/Cart");
const Profile = require("../models/Profile");
const Order = require("../models/Order");
const Payment = require("../models/Payment");

// Request a session
// Payment process
// Recieve IPN

// this is for payment ipn message
paymentController.ipnMessage = async (req, res) => {
  try {
    const payment = req?.body;
    const transaction_id = payment.transaction_id;
    console.log(req?.body);

    if (payment?.status === "VALID") {
      const orderSt = await Order.updateOne(
        { transaction_id },
        { status: "Complete" }
      );
      const cartS = await Cart.updateOne({ userId }, { cartList: [] });
      console.log(orderSt, cartS);
    } else {
      await Order.deleteOne({ transaction_id });
    }
    await Payment.create(payment);
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

// this is for init a new payment
paymentController.initPayment = async (req, res) => {
  try {
    const userId = req?.user?.id;

    // find data from database using models
    const cart = await Cart.findOne({ userId });
    const profile = await Profile.findOne({ userId });

    // transaction id and user card items total amound
    const transactionId = `phl_${Math.random()
      .toString(36)
      .substr(2, 9)}${new Date().getTime()}`;

    const paymentData = {
      // store info
      store_id: process.env.SSLCOMMERZ_STORE_ID,
      store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,

      // this is for order info
      total_amount: 100,
      currency: "BDT",
      tran_id: transactionId,
      emi_option: 0,

      // product profile
      product_name: "Love",
      product_profile: "general",
      product_category: "shoes",

      // urls for payment session
      success_url: "http://yoursite.com/success",
      fail_url: "http://yoursite.com/fail",
      cancel_url: "http://yoursite.com/cancel",
      ipn_url: "https://phero-light.vercel.app/api/v1/payment/ipn",

      // customer info
      cus_name: "Customer Name",
      cus_email: "cust@yahoo.com",
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",

      // shipping info
      shipping_method: "NO", //Shipping method of the order. Example: YES or NO or Courier
      num_of_item: 1,
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: "1000",
      ship_country: "Bangladesh",
    };

    // convert object to formdata
    const fData = new FormData();
    for (const key in paymentData) {
      fData.append(key, paymentData[key]);
    }

    const response = await fetch(
      `https://sandbox.${process.env.SSL_SESSION_API}`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
        // referrer: "no-referrer", // no-referrer, *client
        body: fData,
      }
    );
    const data = await response.json();

    // if payment init is success then we can store our payment in order
    if (data.status === "SUCCESS") {
      const order = {
        cartList: cart.cartList,
        transaction_id: transactionId,
        user: userId,
        address: profile?.address,
        sessionKey: data?.sessionkey,
      };

      await setOrder(order);
    }

    res.status(200).send(data);
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

module.exports = paymentController;
