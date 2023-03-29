const express = require("express");

const {
  getAllCustomers,
  addCustomers,
  editCustomer,
  deleteCustomer,
} = require("../controllers/customerCtrl");

//Router object
const router = express.Router();

//routes
//GET customers
router.post("/get-customers", getAllCustomers);

//POST || Add customers
router.post("/add-customers", addCustomers);

//POST || Edit customers
router.post("/edit-customers", editCustomer);

//POST || Delete customers
router.post("/delete-customers", deleteCustomer);

//POST || Register

module.exports = router;
