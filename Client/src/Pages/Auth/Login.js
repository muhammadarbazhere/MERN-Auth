import React, { useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import "../../Styles/AuthStyle.css";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        alert(res.data.message);
        toast.success(res.data.message, {
          duration: 3000, // Duration in milliseconds (3 seconds in this example)
        });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error("Invalid Credential..");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };

  return (
    <Layout title={"Login - TechEmporium"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Login Form</h4>

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
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>

          <p>
            Create new account : <NavLink to="/register">Register</NavLink>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
