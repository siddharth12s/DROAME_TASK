import React, { useState, useEffect } from "react";
import "antd/dist/reset.css";
import "../styles/HomePage.css";
import {
  Modal,
  Form,
  Input,
  Select,
  message,
  Table,
  DatePicker,
  Button,
} from "antd";
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

const BookingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);
    const [selectedDate, setSelectedDate] = useState([]);
    
    const columns = [
        {
          title: "Drone Id",
          dataIndex: "drone_shot_id",
          key: "drone_shot_id",
        },
        {
          title: "Pick Up Date",
          dataIndex: "pick_up_date",
          key: "pick_up_date",
        },
        {
          title: "Deposit Date",
          dataIndex: "deposit_date",
          key: "deposit_date",
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
        },]
    
    
        useEffect(() => {
            //getAll Transactions
            const getAllBookings = async () => {
              try {
                const user = JSON.parse(localStorage.getItem("user"));
                setLoading(true);
                const res = await axios.post("/customers/get-customers", {
                  customerId: 
                });
                setLoading(false);
                setAllCustomers(res.data);
                // console.log(res.data)
              } catch (error) {
                console.log(error);
                message.error("Issue with fetching transaction");
              }
            };
            getAllTransactions();
          }, [freq, selectedDate]);
    return <Layout>
      
  </Layout>;
};

export default BookingPage;
