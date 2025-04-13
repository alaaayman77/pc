import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import "./Signup.css";
import Logo from "../../assets/images/logo.svg";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/facebook";
import axios from "axios";

const Signup = () => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onFinish = async (values) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        {
          username: values.username,
          email: values.email,
          password: values.password,
        }
      );

      if (response.data.success) {
        setSuccessMessage(response.data.message);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong! Please try again."
      );
    }
  };

  return (
    <div className="register_container">
      <div className="register_logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="register_primary">
        <div className="register_title">
          <h1>Create Account</h1>

          {/* Alerts for error or success messages */}
          {/* Alerts for errors or success */}
          {errorMessage && (
            <Alert message={errorMessage} type="error" showIcon />
          )}
          {successMessage && (
            <Alert message={successMessage} type="success" showIcon />
          )}
        </div>
        <div className="register_main">
          <div className="register_header">
            <h4>Sign up</h4>
          </div>
          <div className="register_form">
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              layout="vertical"
              style={{ minWidth: 400 }}
              scrollToFirstError
            >
              <Form.Item
                name="username"
                label={<span style={{ color: "white" }}>Username</span>}
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label={<span style={{ color: "white" }}>E-mail</span>}
                rules={[
                  { type: "email", message: "The input is not valid E-mail!" },
                  { required: true, message: "Please input your E-mail!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label={<span style={{ color: "white" }}>Password</span>}
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters long!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label={<span style={{ color: "white" }}>Confirm Password</span>}
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="register_footer">
            <div className="divider-container">
              <span className="divider-line"></span>
              <span className="divider-text">or</span>
              <span className="divider-line"></span>
            </div>
            <div className="register_icons">
              <FcGoogle size={30} />
              <GrApple size={30} />
              <SocialIcon
                url="www.facebook.com"
                style={{ width: 35, height: 35 }}
              />
            </div>
            <div className="register_text">
              <p>Already have an account? Log in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
