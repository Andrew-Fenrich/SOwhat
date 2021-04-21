// imports required
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiHome, FiBookOpen, FiSettings } from "react-icons/fi";
import masterPlan from "./Assets/undraw_Master_plan_re_jvit.svg";

// variable to assist NavLink styling/finding which link is active
const activeClassName = "nav-item-active";

//Component
const LeftNav = () => {
  let user = useSelector((state) => {
    return state.user;
  });
  console.log("This is the current User in LeftNav:", user);
  if (user.name === "") {
    return (
      <Wrapper>
        <LinkWrapper>
          <div>
            <h2>SO!what</h2>
          </div>
          <StyledLink to="/" exact>
            <FiHome />
            DashBoard
          </StyledLink>
        </LinkWrapper>
        <PhotoWrapper>
          <MasterPlan src={masterPlan} />
        </PhotoWrapper>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <LinkWrapper>
          <div>
            <h2>SO!what</h2>
          </div>
          <StyledLink to="/" exact>
            <FiHome />
            DashBoard
          </StyledLink>
          <StyledLink to="/sowhat">
            <FiBookOpen />
            SO!what
          </StyledLink>
          <StyledLink to="/settings">
            <FiSettings />
            Settings
          </StyledLink>
        </LinkWrapper>
        <PhotoWrapper>
          <MasterPlan src={masterPlan} />
        </PhotoWrapper>
      </Wrapper>
    );
  }
};

//Styling

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding-top: 10px;
`;
const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 25%;
`;
const StyledLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: black;
  }
  margin: 10px;
`;

const MasterPlan = styled.img`
  width: 50%;
  height: 100%;
`;

//Export
export default LeftNav;
