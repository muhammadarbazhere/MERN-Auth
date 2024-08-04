import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PageNavigation = ({ title }) => {
  return (
    <Wrapper>
      <NavLink to="/products">Products </NavLink>/ {title}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 7rem;
  background-color: #f6f8fa;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 2.2rem;
  padding-left: 1.2rem;

  NavLink {
    font-size: 2.2rem;
  }

  @media only screen and (max-width: 767px) and (min-width: 320px) {
    height: 5rem;
    background-color: #f6f8fa;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.5rem;
    padding-left: 1.2rem;

    NavLink {
      font-size: 1.5rem;
    }
  }
`;

export default PageNavigation;
