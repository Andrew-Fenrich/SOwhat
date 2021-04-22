import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiLogIn, FiLogOut, FiBell } from "react-icons/fi";
import defaultImage from "../Assets/default-img.png";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser } from "../actions";

const RightNav = ({ flag }) => {
  // utility functions----------
  const dispatch = useDispatch();

  // compnent level state-------

  const [reminder, setReminder] = useState([]);

  // component variables--------

  // user info grabbed from REDUX store----

  let userState = useSelector((state) => {
    return state.user;
  });

  // user's avatar variable: set as variable to swap between default and user uploaded img
  let profilePicture = userState.imgUrl;

  // log out clears redux store and user state
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

  // use Effect for fetch
  useEffect(() => {
    if (userState._id !== "") {
      fetch(`/SOwhat/${userState._id}`)
        .then((res) => res.json())
        .then((json) => {
          setReminder([...json.SOwhats]);
        });
    } else {
    }
  }, [flag, userState._id]);
  //--------------------------Console.log block delete on production-------------------------//
  //----------------------------------End Console log block----------------------------------//

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
          {/* Keeping this image here: not 100% if I like look without this image */}
          {/* <UserImage src={defaultImage} alt="Default User Image" /> */}
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
          <StyleButtonLink to="/settings">
            <button>+</button>
          </StyleButtonLink>
          <h2>{userState.name}</h2>
        </PhotoUser>
        <ReminderWrapper>
          <Reminder>
            <p>Reminder</p>
            <FiBell />
          </Reminder>
          <ul>
            {reminder.map((input) => {
              if (input.flag) {
                return (
                  <li key={input._id} value={input.soWhatName}>
                    ⭐{input.soWhatName}
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
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
const Reminder = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  color: #a2a2c2;
`;
const ReminderWrapper = styled.div`
  width: 100%;
  ul {
  }
  li {
    border: 4px solid #f7e5e9;
    border-radius: 8px;
    background: #5e81f4;
    color: whitesmoke;
    padding: 2px;
    margin: 5px 2px 0px 2px;
  }
`;
const UserImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 5px solid #9698d6;
`;
const PhotoUser = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    position: absolute;
    border: 2px solid #ff808b;
    color: #ff808b;
    background: whitesmoke;
    right: 10%;
    top: 65%;
    border-radius: 50%;
    :hover {
      background: #9698d6;
    }
    :focus {
      outline: none;
    }
  }
  h2 {
    color: #ff808b;
  }
`;
const StyleButtonLink = styled(Link)`
  color: #ff808b;
`;

export default RightNav;
