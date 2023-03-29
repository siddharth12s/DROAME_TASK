import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import axios from "axios";
import Spinner from "../components/Spinner";
import '../styles/RegisterStyle.css'

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //Form Submission
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/admin/register", values);
      message.success("Registration successfull");
      setLoading(false);
      navigate("/login");
    }
    
    catch (error) {
        console.log(error)
      setLoading(false);
      message.error("Invalid registration details");
    }
    console.log(values);
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/")
    }
   },[navigate])
  return (
    <>
    <div className="bg">
      <div className="register-page">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Registration Form</h1>
          <Form.Item label="Name" name="name">
            <Input className="input"/>
          </Form.Item>
          <Form.Item  label="Email" name="email">
            <Input className="input" type="email" />
          </Form.Item>
          <Form.Item  label="Password" name="password">
            <Input className="input" type="password"/>
          </Form.Item>
          <button className="btn btn-primary">Register</button>
          <Form.Item>
            <Link className= "li"to="/login">Already Registered ? Click here to login</Link>
          </Form.Item>
        </Form>
      </div>
      </div>
      </>
  );
};

export default Register;
