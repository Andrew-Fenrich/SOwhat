import React, { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const SignUp = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [user, setUser] = useState("");
  const history = useHistory();
  // const dispatch = useDispatch();

  const handleUserName = (ev) => {
    setUser(ev.target.value);
  };
  const handleEmailChange = (ev) => {
    setEmailValue(ev.target.value);
  };

  const handlePasswordChange = (ev) => {
    setPasswordValue(ev.target.value);
  };
  const handleConfirmPasswordChange = (ev) => {
    setConfirmPasswordValue(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (
      emailValue.includes("@") &&
      passwordValue.length >= 6 &&
      passwordValue === confirmPasswordValue
    ) {
      // dispatch(getUser(emailValue));
      fetch("/users", {
        method: "POST",
        body: JSON.stringify({ name: user, email: emailValue }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("message:", json);
        });

      localStorage.setItem("Current User Email", `${emailValue}`);

      history.push("/");
    } else {
      alert("Invalid credentials");
      console.error("This member does not exist.");
    }
    return setEmailValue("") && setPasswordValue("");
  };

  // focus on input on load
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <Wrapper>
      <Box>
        <SectionTitle>Please fill out the sign up form</SectionTitle>
        <SectionDiv>
          <div>
            <Label for="UserName">User Name</Label>
          </div>
          <div>
            <Input
              type="text"
              id="UserName"
              required
              ref={ref}
              onChange={handleUserName}
            />
          </div>
        </SectionDiv>
        <SectionDiv>
          <div>
            <Label for="email">Email</Label>
          </div>
          <div>
            <Input
              type="text"
              id="email"
              required
              ref={ref}
              onChange={handleEmailChange}
            />
          </div>
        </SectionDiv>
        <SectionDiv>
          <div>
            <Label for="password">Password</Label>
          </div>
          <div>
            <Input
              type="password"
              id="password"
              required
              onChange={handlePasswordChange}
            />
          </div>
        </SectionDiv>
        <SectionDiv>
          <div>
            <Label for="password">Confirm Password</Label>
          </div>
          <div>
            <Input
              type="password"
              id="confirmPassword"
              required
              onChange={handleConfirmPasswordChange}
            />
          </div>
        </SectionDiv>
        <SubmitBtn type="submit" onClick={handleSubmit}>
          Sign Up
        </SubmitBtn>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 95px);
  background-color: #f5f5fb;
`;

const Box = styled.form`
  width: 400px;
  box-shadow: 0 5px 5px #000;
  border: 3px solid #5e81f4;
  border-radius: 8px;
  margin: 20px;
  padding: 30px;
  text-align: center;
  text-decoration: none;
  color: #000;
  background-color: #fff;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  padding: 10px 5px 20px 5px;
`;

const SectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 10px 20px;
`;

const Label = styled.label`
  padding: 10px 0;
`;

const Input = styled.input`
  border: 1px solid #5e81f4;
  border-radius: 2px;
  margin: 5px 0;
  padding: 10px;
  width: 300px;
  &:focus {
    outline: none;
    border: 1px solid black;
  }
`;

const SubmitBtn = styled.button`
  appearance: none;
  border: 2px solid transparent;
  border-radius: 20px;
  background-color: #5e81f4;
  color: white;
  padding: 10px;
  margin: 5px 20px 20px 20px;
  width: 100px;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    outline: none;
    cursor: pointer;
    border: 2px solid #a2a2c2;
    background-color: #a2a2c2;
    color: whitesmoke;
  }
`;