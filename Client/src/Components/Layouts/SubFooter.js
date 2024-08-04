import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SubFooter = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <section className="contact-short">
        <div className="grid grid-two-column contact-section">
          <div className="grid-text">
            <h3>Ready to get started</h3>

            <h3>Talk to us today</h3>
          </div>

          <div className="grid-btn">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/contact")}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .iSIFGq {
    margin: 0;
  }

  .btn {
    padding: 15px 30px;
  }

  .contact-short {
    max-width: 60vw;
    margin: auto;
    padding: 3rem 6rem;
    background-color: #f6f8fa;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    transform: translateY(50%);

    .grid div:last-child {
      justify-self: end;
      align-self: center;
    }

    .grid {
      display: flex;
      justify-content: space-between;
    }
  }

  h3 {
    margin: 0px;
    font-size: 20px;
    font-weight: 500;
  }

  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    .contact-short {
      max-width: 80vw;
      margin: auto;
      transform: translateY(50%);
      text-align: center;
      padding: 1px;
    }

    .contact-short .grid div:last-child {
      justify-self: center;
    }

    .contact-section {
      width: 100% !important;
      display: grid;
      gap: 2rem;
      padding: 25px 25px 25px 25px;
    }

    .grid-text {
      width: 50% !important;
      text-align: left;
    }

    .grid-btn {
      width: 50% !important;
      text-align: right;
    }

    .grid-btn .btn {
      padding: 12px 25px !important;
      font-size: 14px;
    }

    .grid-text h3 {
      margin: 0px !important;
      font-size: 18px !important;
      font-weight: 500 !important;
    }
  }

  @media only screen and (max-width: 767px) and (min-width: 320px) {
    .contact-short {
      max-width: 80vw;
      margin: auto;
      transform: translateY(50%);
      text-align: center;
      padding: 1px;
    }

    .contact-short .grid div:last-child {
      justify-self: center;
    }

    .contact-section {
      //   width: 100% !important;
      display: grid;
      gap: 2rem;
      padding: 15px 5px 15px 5px;
    }

    .grid-text {
      width: 50% !important;
    }

    .grid-btn {
      width: 50% !important;
    }

    .grid-btn .btn {
      padding: 5px 10px !important;
      font-size: 12px;
    }

    .grid-text h3 {
      margin: 0px !important;
      font-size: 13px !important;
      font-weight: 400 !important;
    }
  }
`;

export default SubFooter;
