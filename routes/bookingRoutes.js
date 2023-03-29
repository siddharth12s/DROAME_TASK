const express = require("express");

const {
    getAllBookings,
    addBookings,
    editBooking,
    deleteBooking,
} = require("../controllers/bookingCtrl");

//Router object
const router = express.Router();

//routes
//GET bookings
router.get("/get-bookings", getAllBookings);

//POST || Add bookings
router.post("/add-bookings", addBookings);

//POST || Edit bookings
router.post("/edit-bookings", editBooking);

//POST || Delete bookings
router.post("/delete-bookings", deleteBooking);

module.exports = router;