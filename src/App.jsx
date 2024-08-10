import { Button, Input, Typography } from "antd";
import "./App.css";

import { DollarOutlined } from "@ant-design/icons";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useState } from "react";

function App() {
  const [inputState, setInputState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    amount: "",
  });
  // loading
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const config = {
    public_key: "FLWPUBK_TEST-995d55339f4c8ccc70c0399055fdaedc-X",
    tx_ref: Date.now(),
    amount: inputState.amount,
    currency: "USD",
    payment_options: "card, banktransfer, ussd",
    customer: {
      email: `${inputState.email}`,
      phone_number: `${inputState.phoneNumber}`,
      name: `${inputState.firstName} ${inputState.lastName}`,
    },
    customizations: {
      title: "Donation",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const onFinish = () => {
    setLoading(true);
    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        closePaymentModal(); // this will close the modal programmatically
        setLoading(false);
      },
      onClose: () => {},
    });
    // reset values
    setInputState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      amount: "",
    });
  };

  return (
    <div className="bg-[#E3E5F5] flex justify-center min-h-screen">
      <div className="bg-white md:max-w-[80%] w-full">
        <div className="border-b py-5 mb-5 md:mb-10 md:px-10 px-5">
          <h1 className="text-3xl font-bold text-slate-800">Donation Form</h1>
        </div>
        <div className=" md:px-10 px-5">
          <div className="grid md:grid-cols-2 gap-0 md:gap-4">
            <div className="mb-4">
              <Typography>First Name</Typography>
              <Input
                placeholder="Input first name"
                name="firstName"
                size="large"
                onChange={handleChange}
                value={inputState.firstName}
              />
            </div>
            <div className="mb-4">
              <Typography>Last Name</Typography>
              <Input
                placeholder="Input last name"
                name="lastName"
                size="large"
                onChange={handleChange}
                value={inputState.lastName}
              />
            </div>
          </div>
          <div className="md:w-1/2 mb-4">
            <Typography>Email</Typography>
            <Input
              placeholder="Input email"
              name="email"
              size="large"
              onChange={handleChange}
              value={inputState.email}
            />
          </div>
          <div className="md:w-1/2 mb-4">
            <Typography>Phone Number</Typography>
            <Input
              placeholder="Input phone number"
              name="phoneNumber"
              size="large"
              onChange={handleChange}
              value={inputState.phoneNumber}
            />
          </div>

          {/* amount */}
          <div className="mb-4">
            <Typography>Amount</Typography>
            <Input
              prefix={<DollarOutlined />}
              placeholder="Input amount"
              size="large"
              onChange={handleChange}
              name="amount"
              value={inputState.amount}
            />
          </div>

          {/* button */}

          <Button
            className="w-fit"
            type="primary"
            htmlType="submit"
            size="large"
            onClick={onFinish}
            loading={loading}
          >
            Donate
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
