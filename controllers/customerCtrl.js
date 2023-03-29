const Customer = require("../models/customerModel");
const moment = require("moment");

const getAllCustomers = async (req, res) => {
  try {
    const { freq, selectedDate } = req.body;
    const allCustomers = await Customer.find({
      ...(freq !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(freq), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
    });
    if (allCustomers.length > 0) {
      res.status(201).send(allCustomers);
    } else {
      res.status(404).send({ message: "No Customers found" });
    }
  } catch (error) {
    res.status(404).send({ message: "Error Occured", error });
  }
};

const addCustomers = async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    await newCustomer.save();
    res.status(201).send(newCustomer);
  } catch (e) {
    res.status(404).send(e);
  }
};

const editCustomer = async (req, res) => {
  try {
    await Customer.findOneAndUpdate(
      {
        _id: req.body.CustomerId,
      },
      req.body.payload
    );

    res.status(200).send("Edited Customer successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    await Customer.findOneAndDelete({ _id: req.body.CustomerId });
    res.status(200).send("Customer deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllCustomers,
  addCustomers,
  editCustomer,
  deleteCustomer,
};
