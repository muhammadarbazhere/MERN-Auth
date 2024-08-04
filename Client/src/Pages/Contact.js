import React from "react";
import Layout from "../Components/Layouts/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact - TechEmporium"}>
      <div className="row contactus">
        <div className="col-md-6" style={{ paddingRight: "10px" }}>
          <img
            src="/Images/app-contact-banner.jpg"
            alt="contact-img"
            style={{ width: "100%" }}
          />
        </div>

        <div className="col-md-4 contactdata" style={{ paddingLeft: "10px" }}>
          <h1 className="bg-dark p-2 text-white text-center">Contact Us</h1>
          <p className="text-justify mt-2">
            For any queries or information about our products, feel free to call
            us anytime. We are here to assist you.
          </p>
          <p className="mt-3">
            <BiMailSend /> : muhammad.arbazhere@gmail.com
          </p>

          <p className="mt-3">
            <BiPhoneCall /> : 03104163789
          </p>

          <p className="mt-3">
            <BiSupport /> : 1800-000-000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
