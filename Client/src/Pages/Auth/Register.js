import React, { useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/AuthStyle.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });

      if (res.data.success) {
        alert(res.data.message);
        toast.success(res.data.message, {
          duration: 7000, // Duration in milliseconds (7 seconds in this example)
        });
        navigate("/login");
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };

  return (
    <Layout title={"Register - TechEmporium"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Register Form</h4>
          <div className="mb-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              placeholder="Enter Your Name"
              className="form-control"
              id="exampleInputName"
            />
          </div>

          <div className="mb-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              type="email"
              required
              className="form-control"
              id="exampleInputEmail1"
            />
          </div>

          <div className="mb-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              type="password"
              required
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div className="mb-3">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Your Phone no"
              type="text"
              required
              className="form-control"
              id="exampleInputPhone"
            />
          </div>

          <div className="mb-3">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your Address..."
              type="text"
              required
              className="form-control"
              id="exampleInputAnswer"
            />
          </div>

          <div className="mb-3">
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="What is your best friend name?"
              type="text"
              required
              className="form-control"
              id="exampleInputAnswer"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <p>
            Already have an account : <NavLink to="/login">Login</NavLink>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
