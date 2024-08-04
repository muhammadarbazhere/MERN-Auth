import React from "react";
import Layout from "../Components/Layouts/Layout";

const Policy = () => {
  return (
    <Layout title={"Policy - TechEmporium"}>
      <div className="row policy" style={{ marginTop: "50px" }}>
        <div className="col-md-5" style={{ paddingRight: "10px" }}>
          <img
            src="/Images/privacy-policy.jpg"
            alt="policy-img"
            style={{ width: "100%" }}
          />
        </div>

        <div className="col-md-5 policydata">
          <p className="text-justify mt-2">
            At TechEmporium, we are committed to protecting your privacy. We
            collect personal data such as your name, address, email, and payment
            information to provide and improve our services. Your information is
            used for order processing, communication, and fraud prevention. We
            use Braintree for secure payment processing and do not store your
            credit card details. We implement various security measures to
            safeguard your data, but please be aware that no system is
            completely secure. We do not knowingly collect information from
            children under 13. For any questions or concerns about our privacy
            practices, please contact us at "muhammad.arbazhere@gmail.com".
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
