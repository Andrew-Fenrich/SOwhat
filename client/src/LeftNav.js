// imports required
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// variable to assist NavLink styling/finding which link is active
const activeClassName = "nav-item-active";

//Component
const LeftNav = () => {
  return (
    <Wrapper>
      <div>
        <img />
        <h2>SO!what</h2>
      </div>
      <StyledLink to="/" exact>
        DashBoard
      </StyledLink>
      <StyledLink to="/sowhat">SO!what</StyledLink>
      <StyledLink to="/settings">Settings</StyledLink>
    </Wrapper>
  );
};

//Styling

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: black;
  }
  margin: 10px;
`;

//Export
export default LeftNav;
