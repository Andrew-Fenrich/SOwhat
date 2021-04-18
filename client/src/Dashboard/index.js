import React from "react";
import styled from "styled-components";
import thinking from "../Assets/undraw_Code_thinking_re_gka2.svg";
import { useSelector } from "react-redux";

const Dashboard = () => {
  let user = useSelector((state) => {
    return state.user;
  });
  console.log("This is the current User in Dashboard:", user);
  if (user.name === "") {
    return (
      <>
        <WelcomeDashboard>
          <h2>Welcome! Please LogIn</h2>
          <p>
            Did you know that you can save up to 10mins per hour by planning
            e-mails?
          </p>
          <img src={thinking} />
        </WelcomeDashboard>
      </>
    );
  } else {
    return (
      <>
        <WelcomeDashboard>
          <h2>Welcome Back {user.name}!</h2>
          <p>
            Did you know that you can save up to 10 mins/hour by planning
            e-mails?
          </p>
          <img src={thinking} />
        </WelcomeDashboard>
        <LastSoWhat>
          <h2>Last SO!what</h2>
        </LastSoWhat>
      </>
    );
  }
};

const WelcomeDashboard = styled.div`
  position: relative;
  width: 90%;
  height: 20%;
  left: 5%;
  top: 10%;

  background: #f7e5e9;
  border-radius: 17px;
  h2 {
    position: absolute;
    max-width: 40%;
    left: 10%;
    top: 12%;

    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 37px;

    color: #ff808b;
  }
  p {
    position: absolute;
    max-width: 40%;
    left: 10%;
    top: 40%;
    font-style: normal;
    font-size: 13px;
  }
  img {
    position: absolute;
    left: 60%;
    top: 25%;
    width: 30%;
    height: 70%;
  }
`;

const LastSoWhat = styled.div`
  position: relative;
  width: 40%;
  height: 50%;
  top: 15%;
  left: 5%;

  background: #9698d6;
  border-radius: 17px;
`;
export default Dashboard;
