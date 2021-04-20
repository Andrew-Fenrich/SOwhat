import React from "react";
import styled from "styled-components";
import thinking from "../Assets/undraw_Code_thinking_re_gka2.svg";
import { useSelector } from "react-redux";
import { SignUp } from "../SignUp";

const Dashboard = () => {
  let user = useSelector((state) => {
    return state.user;
  });
  console.log("This is the current User in Dashboard:", user);
  if (user.name === "") {
    return (
      <>
        <WelcomeDashboard>
          <h2>Welcome! Please LogIn or SignUp</h2>
          <p>
            Welcome to SO!what. SO!what is an organizational tool that will help
            you complete tasks quickly and think through ideas step-by-step.
            <strong>SO!what</strong> We are humbled that you want to try our
            product and want to invite you to sign up below.
          </p>
          <img src={thinking} />
        </WelcomeDashboard>
        <SignUp />
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
        <OtherInfo>
          <h2>Div Title</h2>
        </OtherInfo>
      </>
    );
  }
};

const WelcomeDashboard = styled.div`
  position: relative;
  width: 90%;
  height: 20%;
  left: 5%;
  top: 2%;

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
  width: 35%;
  height: 60%;
  top: 5%;
  left: 5%;

  background: #9698d6;
  border-radius: 17px;
  h2 {
    color: whitesmoke;
    position: absolute;
    left: 10%;
    top: 5%;
  }
`;
const OtherInfo = styled.div`
  position: relative;
  width: 50%;
  height: 60%;
  top: -55%;
  left: 45%;

  background: #ff808b;
  border-radius: 17px;
  h2 {
    color: whitesmoke;
    position: absolute;
    left: 10%;
    top: 5%;
  }
`;
const SignUpBox = styled.div`
  position: relative;
  width: 35%;
  height: 50%;
  top: 15%;
  left: 5%;

  background: #9698d6;
  border-radius: 17px;
  h2 {
    color: whitesmoke;
    position: absolute;
    left: 10%;
    top: 5%;
  }
`;

export default Dashboard;
