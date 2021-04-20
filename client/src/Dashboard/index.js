import React, { useState, useEffect } from "react";
import styled from "styled-components";
import thinking from "../Assets/undraw_Code_thinking_re_gka2.svg";
import planning from "../Assets/undraw_Scrum_board_re_wk7v.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = ({ flag, setFlag }) => {
  // component level variables
  let user = useSelector((state) => {
    return state.user;
  });
  // component level state
  const [userSoWhat, setUserSoWhat] = useState("");
  //------------useEffect to fetch SO!whats the user has created: triggered by flag for re-render
  useEffect(() => {
    fetch(`/SOwhat/${user._id}`)
      .then((res) => res.json())
      .then((json) => {
        setUserSoWhat(json.SOwhats);
      });
  }, [flag]);
  //-------------console.log block: delete on production-----------------------//
  console.log("This is the current User in Dashboard:", user);
  console.log(
    "This is the saved state for the user SOwhat in dashboard:",
    userSoWhat
  );
  //-------------end of console.log block-------------------------------------//
  if (user.name === "") {
    // this is the welcome dashboard is the user is not signed in-------//

    return (
      <>
        <WelcomeDashboardSignIn>
          <h2>Welcome! Please LogIn or SignUp</h2>
          <p>
            Welcome to SO!what. SO!what is an organizational tool that will help
            you complete tasks quickly and think through ideas step-by-step.
            <strong>SO!what</strong>, We are humbled that you want to try our
            product and want to invite you to sign up below.
          </p>
          <img src={thinking} alt="Thinking person with laptop" />
        </WelcomeDashboardSignIn>
        <AboutUs>
          <h2>About</h2>
          <p>
            SO!what was created, by Andrew Fenrich - Hi, 👋 that's me!, as a
            final project for the Concordia-Bootcamps Web Development Bootcamp,
            but it means so much more.
          </p>
          <p>
            After losing my dream job, as an airline pilot, being diagnosed with
            a chronic illness, and surviving through the global pandemic, I
            asked myself "So what's next?" With that, SO!what was born!
          </p>
          <p>
            SOwhat! Was born of a bad situation, but is a project which has
            greatly enriched my life and, I hope, yours too. Leaning on my
            experience planning events, setting clear goals and having fun,
            SO!what provides a simple way to help YOU make the most of your time
            by answering the five Ws on any task you need to complete, any
            challenge you want to begin, and any dream you want to follow. Thank
            you again for checking out SO!what and please
            <StyledLink to="/signup">Sign Up</StyledLink>
            here.
          </p>
        </AboutUs>
      </>
    );
  } else if (userSoWhat === "") {
    // This is a loading screen to accomodate the fetch for the users so whats
    return <p>loading</p>;
  } else {
    // This is the main signed in dash board

    let lastSoWhat = userSoWhat[userSoWhat.length - 1];
    console.log(lastSoWhat);

    return (
      <>
        <WelcomeDashboard>
          <h2>Welcome Back {user.name}!</h2>
          <p>
            Did you know that you can save up to 10 mins/hour by planning
            e-mails?
          </p>
          <img src={thinking} alt="Thinking person with laptop" />
        </WelcomeDashboard>
        <LastSoWhat>
          <h2>Last SO!what</h2>

          <div>
            <h3> ❕{lastSoWhat.soWhatName}</h3>
            <p>
              {" "}
              <span>Who:</span> {lastSoWhat.who}
            </p>
            <p>
              <span>What:</span> {lastSoWhat.what}
            </p>
            <p>
              <span>Where:</span> {lastSoWhat.where}
            </p>
            <p>
              <span>When:</span> {lastSoWhat.when}
            </p>
            <p>
              <span>Why:</span> {lastSoWhat.why}
            </p>
          </div>
          <LastSoWhatPhotoWrapper>
            <img src={planning} alt="people planning a scrum-board" />
          </LastSoWhatPhotoWrapper>
        </LastSoWhat>
        <OtherInfo>
          <h2>Div Title</h2>
        </OtherInfo>
      </>
    );
  }
};

const WelcomeDashboardSignIn = styled.div`
  position: relative;
  width: 90%;
  height: 25%;
  left: 5%;
  top: 5%;

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
    font-size: 16px;
    line-height: 37px;

    color: #ff808b;
  }
  p {
    position: absolute;
    max-width: 40%;
    left: 10%;
    top: 35%;
    font-style: normal;
    font-size: 13px;
    line-height: 18px;
  }
  img {
    position: absolute;
    left: 60%;
    top: 25%;
    width: 30%;
    height: 70%;
  }
  strong {
    margin-left: 2px;
  }
`;

const AboutUs = styled.div`
  position: relative;
  width: 60%;
  height: 50%;
  top: 7%;
  left: 20%;

  background: #9698d6;
  border-radius: 17px;
  h2 {
    color: whitesmoke;
    padding-top: 20px;
    padding-left: 15px;
    padding-bottom: 0px;
  }
  p {
    color: whitesmoke;
    padding-top: 5px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 15px;
    word-wrap: normal;
    text-indent: 20px;
  }
`;
const StyledLink = styled(Link)`
  color: #ff808b;
  padding-right: 2px;
  padding-left: 2px;
`;
//Signed in style-------------------
const WelcomeDashboard = styled.div`
  position: relative;
  width: 90%;
  height: 22%;
  left: 5%;
  top: 3%;

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
    padding-left: 5%;
    padding-top: 5%;
    padding-bottom: 5px;
    font-size: 20px;
  }
  h3 {
    color: whitesmoke;
    text-align: center;
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 5px;
  }
  div {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    border: 3px solid whitesmoke;
    border-radius: 8px;
    background: #ff808b;
    padding-bottom: 5px;
  }
  p {
    padding-left: 10%;
    color: whitesmoke;
    span {
      color: whitesmoke;
      margin-right: 2px;
      font-weight: bold;
    }
  }
`;
const LastSoWhatPhotoWrapper = styled.section`
  position: relative;
  left: 30%;
  top: 20%;

  img {
    width: 120px;
    height: 100px;
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
    padding-left: 10%;
    padding-top: 3%;
  }
`;

export default Dashboard;
