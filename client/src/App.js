import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          Dashboard
        </Route>
        <Route exact path="/sowhat">
          So What
        </Route>
        <Route exact path="/settings">
          Settings
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
