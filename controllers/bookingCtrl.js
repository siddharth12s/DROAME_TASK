const Bookings = require("../models/bookingModel");
const moment = require("moment");
const crypto = require("crypto");

const getAllBookings = async (req, res) => {
    try {
      const customerId = req.body
      const allBookings = await Bookings.find({customerID: customerId})
    if (allBookings.length > 0) {
      res.status(201).send(allBookings);
    } else {
      res.status(404).send({ message: "No Bookings found" });
    }
  } catch (error) {
    res.status(404).send({ message: "Error Occured", error });
  }
};

const addBookings = async (req, res) => {
    try {
    const newBooking = await Booking.create(req.body);
    await newBooking.save();
    res.status(201).send(newBooking);
  } catch (e) {
    res.status(404).send(e);
  }
};

const editBooking = async (req, res) => {
  try {
    await Booking.findOneAndUpdate(
      {
        _id: req.body.BookingId,
      },
      req.body.payload
    );

    res.status(200).send("Edited Booking successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteBooking = async (req, res) => {
  try {
    await Booking.findOneAndDelete({ _id: req.body.BookingId });
    res.status(200).send("Booking deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllBookings,
  addBookings,
  editBooking,
  deleteBooking,
};
