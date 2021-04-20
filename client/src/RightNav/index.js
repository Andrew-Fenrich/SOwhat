import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiLogIn, FiLogOut, FiBell } from "react-icons/fi";
import defaultImage from "../Assets/default-img.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser, logOut } from "../actions";

const RightNav = ({ flag }) => {
  const dispatch = useDispatch();
  const [localUser, setLocalUser] = useState(
    JSON.parse(localStorage.getItem("Current User")) || ""
  );

  let userState = useSelector((state) => {
    return state.user;
  });
  let profilePicture = userState.imgUrl;
  console.log(profilePicture);
  const logOutHandler = () => {
    localStorage.removeItem("Current User");
    dispatch(
      getUser({
        user: "",
        _id: "",
        name: "",
        delete: "",
        imgUrl: "",
        status: "no user",
      })
    );
  };

  useEffect(() => {
    console.log(userState);
    console.log(localUser);
    console.log(flag);
  }, [logOutHandler]);

  if (userState.user === "") {
    return (
      <Wrapper>
        <LogInOut>
          <NavLink to="/signin">LogIn</NavLink>
          <NavLink to="/signin">
            <FiLogIn />
          </NavLink>
        </LogInOut>
        <PhotoUser>
          <UserImage src={defaultImage} alt="Default User Image" />
          {/* <h2>Random User</h2> */}
        </PhotoUser>
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
        <PhotoUser>
          <UserImage
            src={profilePicture === "undefined" ? defaultImage : profilePicture}
            alt="Default User Image"
          />
          <h2>{userState.name}</h2>
        </PhotoUser>
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
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 2px solid #f5f5fb;
`;
const PhotoUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default RightNav;
