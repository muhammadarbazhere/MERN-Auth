import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="grid">
        <div className="hero-section-data">
          <p className="intro-data">Welcome to </p>
          <h1>TechEmporium</h1>
          <p>
            Your one-stop destination for cutting-edge technology products.
            Explore our wide range of gadgets, electronics, and accessories to
            elevate your digital lifestyle
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
        {/* our homepage image  */}
        <div className="hero-section-image">
          <figure>
            <img
              src="/Images/hero-section.jpg"
              alt="hero-section-img"
              className="img-style"
            />
          </figure>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 10rem 4rem 0rem 4rem;

  img {
    min-width: 10rem;
    height: 10rem;
  }

  .grid {
    display: flex;
    justify-content: space-between;
    // display: grid;
    // grid-template-columns: repeat(2, 1fr);
  }

  .hero-section-data {
    width: 45%;
    padding-top: 40px;

    p {
      margin: 1rem 0.5rem;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    .intro-data {
      margin-bottom: 0;
    }
  }

  .hero-section-image {
    width: 49%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 40%;
      top: -3.5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 90%;
    height: auto;
  }


  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    padding: 2rem 2rem 0rem 2rem;

  img {
    min-width: 10rem;
    height: 10rem;
  }

  .grid {
    display: flex;
    justify-content: space-between;
    grid-gap : 3rem;
    // display: grid;
    // grid-template-columns: repeat(2, 1fr);
  }

  .hero-section-data {
    width: 47%;
    padding-top: 40px;

    p {
      margin: 1rem 0.5rem;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    .intro-data {
      margin-bottom: 0;
    }
  }

  .hero-section-image {
    width: 49%;
    height: auto;
    display: flex;
    padding-top: 65px ;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;

    &::after {
      content: "";
    width: 90%;
    height: 100%;
    background-color: rgba(81, 56, 238, 0.4);
    position: absolute;
    left: 10%;
    top: -2rem;
    z-index: -1;
    }
  }
  .img-style {
    width: 90%;
    height: auto;
  }

    
  }




  @media only screen and (max-width: 767px) and (min-width: 320px) {
    padding: 0rem 2rem 0rem 2rem;

    .hero-section-data {
      width: 100%;
      padding-top: 20px;
      display: flex;
      flex-direction: column;

      p {
        margin: 0rem;
        text-align: center;
        font-size: 15px;
      }

      .btn{
        margin : 10px 0px ;
      }

      h1 {
        text-align: center;
        text-transform: capitalize;
        font-size: 15px;
        font-weight: bold;
      }

      .intro-data {
        margin-bottom: 0;
      }
    }

    .grid {
      display: grid;
      grid-gap: 2rem;
      grid-template-columns: repeat(1, 1fr);
    }

    .container {
      margin: 0px;
    }

    .hero-section-image {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .img-style {
      width: 90%;
      height: auto;
    }

    figure::after {
      content: "";
      width: 90%;
      height: 100%;
      left: 28px;
      top: -14%;
      background-color: rgba(81, 56, 238, 0.4);
  }
    }
  }
`;

export default HeroSection;
