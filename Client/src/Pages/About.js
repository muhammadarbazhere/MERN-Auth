import React from "react";
import Layout from "../Components/Layouts/Layout";

const About = () => {
  return (
    <Layout title={"About us - TechEmporium"}>
      <div className="row aboutus">
        <div className="col-md-5" style={{ paddingLeft: "10px" }}>
          <img
            src="/Images/about-us.png"
            alt="about-img"
            style={{ width: "100%" }}
          />
        </div>

        <div className="col-md-5 aboutdata" style={{ paddingLeft: "10px" }}>
          <p className="mt-2" style={{ textAlign: "justify" }}>
            <b>Welcome to TechEmporium!!!</b> We are your one-stop online store
            for the latest in electronics, gadgets, and tech accessories. With
            an extensive range of products, you can easily filter by price range
            and category to find exactly what you need. Our advanced search
            functionality ensures you can locate products quickly using
            keywords. At TechEmporium, we prioritize your security with
            Braintree's credit card payment method, guaranteeing safe
            transactions. Our robust admin panel allows us to keep our inventory
            up-to-date by adding, updating, or deleting products efficiently.
            Our mission is to provide an exceptional online shopping experience,
            offering top-quality tech products at competitive prices, backed by
            excellent customer service. Thank you for choosing TechEmporium,
            where we bring the best in technology to your doorstep.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
