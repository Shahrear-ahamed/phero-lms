// // Fetch & Form data
// const fetch = require("node-fetch");
// const FormData = require("form-data");

// const paymentData = {
//   store_id: process.env.STOREID,
//   store_passwd: process.env.STOREPASS,
//   total_amount: 100,
//   currency: "EUR",
//   tran_id: "REF123",
//   product_name: "Love",
//   product_profile: "general",
//   product_category: "shoes",
//   success_url: "http://yoursite.com/success",
//   fail_url: "http://yoursite.com/fail",
//   cancel_url: "http://yoursite.com/cancel",
//   cus_name: "Customer Name",
//   cus_email: "cust@yahoo.com",
//   cus_add1: "Dhaka",
//   cus_add2: "Dhaka",
//   cus_city: "Dhaka",
//   cus_state: "Dhaka",
//   cus_postcode: "1000",
//   cus_country: "Bangladesh",
//   cus_phone: "01711111111",
//   cus_fax: "01711111111",
//   shipping_method: "NO",
//   num_of_item: 1,
//   weight_of_items: "100kg",
//   ship_name: "Customer Name",
//   ship_add1: "Dhaka",
//   ship_add2: "Dhaka",
//   ship_city: "Dhaka",
//   ship_state: "Dhaka",
//   ship_postcode: "1000",
//   ship_country: "Bangladesh",
//   multi_card_name: "mastercard,visacard,amexcard",
//   value_a: "ref001_A",
//   value_b: "ref002_B",
//   value_c: "ref003_C",
//   value_d: "ref004_D",
// };

// const fData = new FormData();
// for (const key in paymentData) {
//   fData.append(key, paymentData[key]);
// }

// fetch("https://sandbox.sslcommerz.com/gwprocess/v4/api.php", {
//   method: "POST",
//   body: fData,
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));
