import React from "react";
import styled from "styled-components";

const Trusted = () => {
  return (
    <Wrapper className="brand-section">
      <div>
        <h3>Trusted By 1000+ Companies</h3>
        <div className="brand-section-slider">
          {/* my 1st img  */}
          <div className="slide">
            <img
              src="https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image2.png"
              alt="trusted-brands"
            />
          </div>
          <div className="slide">
            <img
              src="https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image3.png"
              alt="trusted-brands"
            />
          </div>
          <div className="slide">
            <img
              src="https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image4.png"
              alt="trusted-brands"
            />
          </div>
          <div className="slide">
            <img
              src="https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image6.png"
              alt="trusted-brands"
            />
          </div>
          <div className="slide">
            <img
              src="https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image8.png"
              alt="trusted-brands"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 2rem 5rem 2rem;
  background-color: #f6f8fa;

  .brand-section {
    padding: 12rem 0 0 0;
  }
  h3 {
    text-align: center;
    text-transform: capitalize;
    color: rgba(29, 29, 29, 0.8);
    font-size: 1.5rem;
    font-weight: bold;
  }

  img {
    min-width: 6rem;
    height: 6rem;
  }

  .brand-section-slider {
    margin-top: 3.2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
  }

  @media only screen and (max-width: 767px) and (min-width: 320px) {
    padding: 3rem 1.5rem 3rem 1.5rem;
    background-color: #f6f8fa;

    h3 {
      text-align: center;
      text-transform: capitalize;
      color: rgba(29, 29, 29, 0.8);
      font-size: 1.3rem;
      font-weight: bold;
    }

    .brand-section-slider {
      margin-top: 3.2rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
    }
  }
`;

export default Trusted;
