import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiLogIn, FiLogOut, FiBell } from "react-icons/fi";
import defaultImage from "../Assets/default-img.png";
import GlobalStyles from "../GlobalStyles";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser } from "../actions";

const RightNav = ({ flag }) => {
  const user = localStorage.getItem("Current User");
  console.log(user);
  const dispatch = useDispatch();

  const userState = useSelector((state) => {
    return state.user;
  });

  const logOutHandler = () => {
    localStorage.removeItem("Current User");
    dispatch(getUser());
  };
  // console.log(flag);
  // useEffect(() => {
  //   console.log(userState);
  // }, [flag]);

  if (user === null) {
    return (
      <Wrapper>
        <LogInOut>
          <NavLink to="/signin">LogIn</NavLink>
          <NavLink to="/signin">
            <FiLogIn />
          </NavLink>
        </LogInOut>
        <div>
          <UserImage src={defaultImage} alt="Default User Image" />
          <h2>Random User</h2>
        </div>
        <ContentWrapper>
          <p>Content</p>
          <p>Content</p>
          <p>Content</p>
          <p>Content</p>
        </ContentWrapper>
        <ReminderWrapper>
          <Reminder>
            <p>Reminder</p>
            <FiBell />
          </Reminder>
        </ReminderWrapper>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <LogInOut>
          <NavLink to="/" onClick={logOutHandler}>
            LogOut
          </NavLink>
          <FiLogOut />
        </LogInOut>
        <div>
          <UserImage src={defaultImage} alt="Default User Image" />
          <h2>Random User</h2>
        </div>
        <ContentWrapper>
          <p>Content</p>
        </ContentWrapper>
        <ReminderWrapper>
          <Reminder>
            <p>Reminder</p>
            <FiBell />
          </Reminder>
        </ReminderWrapper>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LogInOut = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 33.3%;
`;
const Reminder = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`;
const ReminderWrapper = styled.div`
  width: 100%;
`;
const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #f5f5fb;
`;

export default RightNav;
