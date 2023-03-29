const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    CustomerName: {
      type: "String",
      required: [true, "Customer Name is required"],
    },
    CustomerPhone: {
      type: "Number",
      required: [true, "Phone Number is required"]
    },
    CustomerAADHAR: {
      type: "Number",
      required: [true, "AADHAR is required"],
    },
    CustomerEmail: {
      type: "string",
    },
    date: {
      type: "Date",
      default: Date.now(),
    }, 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
