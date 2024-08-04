import React from "react";
import styled from "styled-components";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";

const Services = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-three-column">
          <div className="services-1">
            <div>
              <TbTruckDelivery className="icon" />
              <h3>Super Fast and Free Delivery.</h3>
            </div>
          </div>

          <div className="services-2">
            <div className="services-colum-2">
              <div>
                <MdSecurity className="icon" />
                <h3>Non-contact Shipping</h3>
              </div>
            </div>
            <div className="services-colum-2">
              <div>
                <GiReceiveMoney className="icon" />
                <h3>Money-back Guaranteed</h3>
              </div>
            </div>
          </div>

          <div className="services-3">
            <div>
              <RiSecurePaymentLine className="icon" />
              <h3>Super Secure Payment System</h3>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 0rem 4rem 0rem 4rem;

  .grid {
    gap: 3rem;
    display: flex;
  }

  .services-1,
  .services-2,
  .services-3 {
    width: auto;
    height: 20rem;
    display: flex;
    padding: 22px;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: #f6f8fa;
    text-align: center;
    border-radius: 2rem;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }

  .services-2 {
    padding: 0px;
    gap: 4rem;
    background-color: transparent;
    box-shadow: none;

    .services-colum-2 {
      background: #f6f8fa;
      display: flex;
      flex-direction: row;
      flex: 1;
      justify-content: center;
      align-items: center;
      border-radius: 2rem;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

      div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding: 20px;
      }
    }
  }

  h3 {
    margin-top: 1.4rem;
    font-size: 20px;
    font-weight: 400;
  }

  .icon {
    width: 5rem;
    height: 5rem;
    padding: 1rem;
    border-radius: 50%;
    background-color: #fff;
    color: #5138ee;
  }

  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    padding: 0rem 2rem 0rem 2rem;
    display: flex;
    justify-content: center;

    .container{
      padding: 5rem 0;
      margin: 0px;
    }

    .grid {
      gap: 2rem;
      display: flex;
    }
  
    .services-1,
    .services-2,
    .services-3 {
      width: auto;
      height: 20rem;
      display: flex;
      padding: 22px;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      background: #f6f8fa;
      text-align: center;
      border-radius: 2rem;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    }
  
    .services-2 {
      padding: 0px;
      gap: 2rem;
      background-color: transparent;
      box-shadow: none;
  
      .services-colum-2 {
        background: #f6f8fa;
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: center;
        align-items: center;
        border-radius: 2rem;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  
        div {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          padding: 20px;
        }
      }
    }
  
    h3 {
      margin-top: 1.4rem;
      font-size: 20px;
      font-weight: 400;
    }
  
    .icon {
      width: 5rem;
      height: 5rem;
      padding: 1rem;
      border-radius: 50%;
      background-color: #fff;
      color: #5138ee;
    }
      
  }


  @media only screen and (max-width: 767px) and (min-width: 320px) {
    padding: 2px;

    .container{
      padding: 15px 0px;
      margin : 0px;
    }

    .grid {
      gap: 1.5rem;
      display: grid;
      padding: 20px;
    }

    .services-1,
    .services-3 {
      width: auto;
      height: 10rem;
      display: block;
      padding: 15px;
      background: #f6f8fa;
      text-align: center;
      border-radius: 2rem;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    }

    .services-2 {
      display: none;

      
    h3 {
      margin-top: 0.4rem;
      font-size: 20px;
      font-weight: 400;
    }

    .icon {
      width: 5rem;
      height: 5rem;
      padding: 1rem;
      border-radius: 50%;
      background-color: #fff;
      color: #5138ee;
    }
  }
`;

export default Services;
