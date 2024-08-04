import React, { useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        answer,
        newPassword,
      });
      if (res.data.success) {
        alert(res.data.message);
        toast.success(res.data.message, {
          duration: 3000, // Duration in milliseconds (3 seconds in this example)
        });
        navigate("/login");
      } else {
        toast.error(res.data.success);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };

  return (
    <Layout title={"Forgot Password - TechEmporium"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Reset Password</h4>

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
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter name of your best friend"
              type="text"
              required
              className="form-control"
              id="exampleInputAnswer"
            />
          </div>

          <div className="mb-3">
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter Your New Password"
              type="password"
              required
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Reset
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
