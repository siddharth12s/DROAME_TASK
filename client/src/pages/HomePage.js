import React, { useState, useEffect } from "react";
import "antd/dist/reset.css";
import "../styles/HomePage.css";
import { Modal, Form, Input, Select, message, Table, DatePicker,Button } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import moment from "moment";
import Spinner from "./../components/Spinner";
// import Analytics from "./../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);
  const [freq, setfreq] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  // const [type, setType] = useState("all");
  // const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [bookings, setBookings] = useState(false);

  //table data

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Name",
      dataIndex: "CustomerName",
      key: "CustomerName",
    },
    {
      title: "Phone Number",
      dataIndex: "CustomerPhone",
      key: "CustomerPhone",
    },
    {
      title: "Aadhar Number",
      dataIndex: "CustomerAADHAR",
      key: "CustomerAADHAR",
    },
    {
      title: "Email Address",
      dataIndex: "CustomerEmail",
      key: "reference",
    },
    {
      title: "Actions",

      render: (text, record) => {
        return (
          <div>
            <EditOutlined
              onClick={() => {
                setEditable(record);
                setShowModal(true);
              }}
            />
            <DeleteOutlined
              className="mx-2"
              onClick={() => {
                deleteHandler(record);
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Booking",

      render: (text, record) => {
        return (
          <div>
            <Button type="primary" block value={allCustomers} onClick={handleBookings}>
              See Bookings
            </Button>
          </div>
        );
      },
    },
  ];

  //useEffect
  useEffect(() => {
    //getAll Customers
    const getAllCustomers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/customers/get-customers", {
          freq,
          selectedDate,
        });
        setLoading(false);
        setAllCustomers(res.data);
        // console.log(res.data)
      } catch (error) {
        console.log(error);
        message.error("Issue with fetching customers");
      }
    };
    getAllCustomers();
  }, [freq, selectedDate]);

  //delete handler
  const deleteHandler = async (record) => {
    try {
      setLoading(true);
      await axios.post("/customers/delete-customers", {
        CustomerId: record._id,
      });
      setLoading(false);
      message.success("Customer deleted successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Issue with deleting customer");
    }
  };

  //Form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/customers/edit-customers", {
          payload: {
            ...values,
          },
          CustomerId: editable._id,
        });
        setLoading(false);
        message.success("Customer updated successfully");
      } else {
        await axios.post("/customers/add-customers", {
          ...values,
        });
        setLoading(false);
        message.success("Customer added successfully");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add Customer");
    }
  };

  const handleBookings = (e,data) => {
    setBookings(true)
    console.log(data)
  }

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Filter</h6>
          <Select value={freq} onChange={(values) => setfreq(values)}>
            <Select.Option value="7">Last 1 week</Select.Option>
            <Select.Option value="30">Last 1 month</Select.Option>
            <Select.Option value="90">Last 3 months</Select.Option>
            <Select.Option value="365">Last 1 year</Select.Option>
            <Select.Option value="custom">Custom date</Select.Option>
          </Select>
          {freq === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div>
          <button className="btn btn-danger" onClick={() => setShowModal(true)}>
            Add New
          </button>
        </div>
      </div>
      <div className="content">
          <Table
            rowKey={(rec) => rec._id}
            columns={columns}
            dataSource={allCustomers}
          />
      </div>
      <Modal
        title={editable ? "Edit Customer" : "Add Customer"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Customer Name" name="CustomerName">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Customer Email" name="CustomerEmail">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Customer AADHAR" name="CustomerAADHAR">
            <Input type="amount" />
          </Form.Item>
          <Form.Item label="Customer Phone Number" name="CustomerPhone">
            <Input type="amount" />
          </Form.Item>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
