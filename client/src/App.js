import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Wrapper>
        <LeftNav>
          <p>logo</p>
          <p>DashBoard</p>
          <p>SO!what</p>
          <p>Settings</p>
        </LeftNav>
        <Switch>
          <SwitchWrapper>
            <Route exact path="/">
              Dashboard
            </Route>
            <Route exact path="/sowhat">
              So What
            </Route>
            <Route exact path="/settings">
              Settings
            </Route>
          </SwitchWrapper>
        </Switch>
        <RightNav>
          <p>Logout</p>
          <p>Photo</p>
          <p>Top SO!whats</p>
          <p>Reminders</p>
        </RightNav>
      </Wrapper>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  margin: 0px;
`;

const SwitchWrapper = styled.div`
  width: 68%;
  background-color: #f5f5fb;
  border: 2px solid black;
`;

const LeftNav = styled.nav`
  width: 12%;
  background-color: whitesmoke;
  border: 2px solid blue;
`;
const RightNav = styled.nav`
  width: 20%;
  background-color: whitesmoke;
  border: 2px solid red;
`;
export default App;
