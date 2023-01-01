const { Schema, model } = require("mongoose");

const purchasedCoursesSchema = new Schema({}, { timestamps: true });

const PurchasedCourse = model("Purchased_course", purchasedCoursesSchema);
module.exports = PurchasedCourse;
