import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import SoWhat from "./SoWhat";
import Settings from "./Settings";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import Dashboard from "./Dashboard";

function App() {
  // component level state ------------------------------------------------
  const [flag, setFlag] = useState(false);
  //---------------------------console.log block delete on production -------------------------//
  //---------------------------end console.log block ------------------------------------------//
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Wrapper>
        <LeftNavPannel>
          <LeftNav />
        </LeftNavPannel>
        <Switch>
          <SwitchWrapper>
            <Route exact path="/signin">
              <SignIn setFlag={setFlag} flag={flag} />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/">
              <Dashboard setFlag={setFlag} flag={flag} />
            </Route>
            <Route exact path="/sowhat">
              <SoWhat setFlag={setFlag} flag={flag} />
            </Route>
            <Route exact path="/settings">
              <Settings setFlag={setFlag} flag={flag} />
            </Route>
          </SwitchWrapper>
        </Switch>
        <RightNavPannel>
          <RightNav flag={flag} />
        </RightNavPannel>
      </Wrapper>
    </BrowserRouter>
  );
}

//----------------------------styling block -----------------------------------//
const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  margin: 0px;
`;

const SwitchWrapper = styled.div`
  width: 68%;
  background-color: #f5f5fb;
`;

const LeftNavPannel = styled.nav`
  width: 12%;
  background-color: whitesmoke;
`;
const RightNavPannel = styled.nav`
  width: 20%;
  background-color: whitesmoke;
`;
export default App;
