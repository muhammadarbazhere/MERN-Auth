import React from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import SubFooter from "./SubFooter";

const Footer = () => {
  return (
    <div>
      <SubFooter />
      <div className="footer">
        <h4 className="text-center">All Right Reserved &copy; TechEmporium</h4>
        <p className="text-center mt-3">
          <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
          <Link to="/policy">Privacy Policy</Link>
          <div className="footer-social">
            <div className="footer-social--icons">
              <div>
                <Link
                  to="https://www.facebook.com/ArbazAlyanii/"
                  target="_blank"
                  rel="noreferrer"
                  className="Link"
                >
                  <FaFacebookF className="icons" />
                </Link>
              </div>

              <div>
                <Link
                  to="https://www.instagram.com/arbaz.sami.khan?igsh=cWRuc2E0ZTQxOTQw"
                  target="_blank"
                  rel="noreferrer"
                  className="Link"
                >
                  <FaInstagram className="icons" />
                </Link>
              </div>

              <div>
                <Link
                  to="https://wa.me/03104163789"
                  target="_blank"
                  rel="noreferrer"
                  className="Link"
                >
                  <FaWhatsapp className="icons" />
                </Link>
              </div>
            </div>
          </div>
        </p>
      </div>
    </div>
  );
};

export default Footer;
