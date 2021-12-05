import { ReactElement, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../pages/login";
import NewUser from "../pages/newuser";
import Draft from "../pages/draft";
import Home from "../pages";

export default function App() {

  const [currentUser, setCurrentUser] = useState("");

  return (
    <Router>
      <Switch>
        <Route exact path="/draft">
          <Draft currentUser={currentUser}/>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login setCurrentUser={setCurrentUser}/>
        </Route>
        <Route exact path="/newuser">
          <NewUser />
        </Route>
      </Switch>
    </Router>
  );
}
