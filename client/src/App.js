import React from "react";
import "./App.css";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Prices from "./Prices";
import Account from "./Account";

function App(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/prices">
        <Prices />
      </Route>
      <Route path="/account">
        <Account />
      </Route>
    </Switch>
  );
}

export default App;
