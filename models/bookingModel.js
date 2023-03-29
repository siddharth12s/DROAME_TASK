const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerID: {
      type: 'string',
      required: true,
    },
    drone_shot_id: {
      type: "Number",
      required: [true, "Drone ID is required"]
    },
    pickup_date: {
      type: "Date",
      required: [true, "Pick up date is required"],
    },
    deposit_date: {
        type: "Date",
        required: [true, "Deposit date is required"]
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);