import { ReactElement } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import NewUser from "./NewUser";
import Draft from "./Draft";
import Home from "./Home";

export default function App(): ReactElement {
  return (
    <Router>
      <Switch>
        <Route exact path="/draft">
          <Draft />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/newuser">
          <NewUser />
        </Route>
      </Switch>
    </Router>
  );
}
