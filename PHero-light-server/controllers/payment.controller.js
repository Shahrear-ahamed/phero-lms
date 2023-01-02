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
const PurchasedCourse = require("../models/Purchased_course");

// Request a session
// Payment process
// Recieve IPN

// this is for payment ipn message
paymentController.ipnMessage = async (req, res) => {
  try {
    const payment = req?.body;
    const transaction_id = payment?.tran_id;

    if (payment?.status === "VALID") {
      const order = await Order.findOneAndUpdate(
        { transaction_id },
        { status: "Complete" }
      );
      const carts = await Cart.findOne({ userId: order?.user });

      // add course in purchased curses
      await PurchasedCourse.updateOne(
        { userId: order?.user },
        { $push: { courseList: carts?.cartList } }
      );

      // update and remove user cart
      await Cart.updateOne({ userId: order?.user }, { cartList: [] });
    } else {
      // if payment is failed then delete this order
      await Order.deleteOne({ transaction_id });
    }

    // payment are save here is valid or faild or cencel
    await Payment.create(payment);

    // send response
    res.status(200).send("IPN");
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

// this is for init a new payment
paymentController.initPayment = async (req, res) => {
  try {
    const userId = req?.user?.id;

    // find data from database using models
    const profile = await Profile.findOne({ userId });
    const cart = await Cart.findOne({ userId })
      .populate({
        path: "cartList.courseId",
        select: "title thumbnail price",
      })
      .select("userId cartList");

    // transaction id and user card items total amound
    const transactionId = `phl_${Math.random()
      .toString(36)
      .substr(2, 9)}${new Date().getTime()}`;

    const courseAmount = cart?.cartList
      .map((c) => c.courseId?.price)
      .reduce((a, b) => a + b, 0);

    const productNames = cart?.cartList.map((c) => c.title).join(" ,");

    const paymentData = {
      // store info
      store_id: process.env.SSLCOMMERZ_STORE_ID,
      store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,

      // this is for order info
      total_amount: courseAmount,
      currency: "BDT",
      tran_id: transactionId,
      emi_option: 0,

      // product profile
      product_name: productNames,
      product_category: "digital-product",
      product_profile: "non-physical-goods",

      // urls for payment session
      success_url: "https://phero-lms.onrender.com/api/v1/success",
      fail_url: "https://phero-lms.onrender.com/api/v1/fail",
      cancel_url: "https://phero-lms.onrender.com/api/v1/cancel",
      ipn_url: "https://phero-lms.onrender.com/api/v1/payment/ipn",

      // customer info
      cus_name: profile?.name,
      cus_email: profile?.email,
      cus_add1: profile?.address?.address1,
      cus_add2: profile?.address?.address2,
      cus_city: profile?.address?.city,
      cus_state: profile?.address?.state,
      cus_postcode: profile?.address?.postcode,
      cus_country: profile?.address?.country,
      cus_phone: profile?.mobile,

      // shipping info
      shipping_method: "NO", //Shipping method of the order. Example: YES or NO or Courier
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
