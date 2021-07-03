import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";

interface LoginProps {
  setCurrentUser: (newUser: string) => void
}

export default function Login(props: LoginProps): ReactElement {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const userLogout = () => {
    setCurrentUser("");
    setUsername("");
    setPass("");
  };

  const userLogin = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, pass: pass }),
    };
    fetch(process.env.REACT_APP_API + "/login", requestOptions)
      .then((res) => {
        if (res.status === 200) {
          alert("Welcome back!");
          return res.json();
        } else {
          alert("Incorrect username/password");
        }
      })
      .then((j) => {
        props.setCurrentUser(j["username"]);
      })
      .catch((error) => console.log(error));
  };

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  const updatePass = (event) => {
    setPass(event.target.value);
  };

  if (currentUser === "") {
    return (
      <div className="Login">
        <h1>Log in!</h1>
        <label>
          Username:
          <input type="text" onChange={updateUsername} />
        </label>
        <label>
          Password:
          <input type="text" onChange={updatePass} />
        </label>
        <Link to="/draft">
          <button onClick={userLogin} className="login">
            Submit
          </button>
        </Link>
        <div>
          <Link to="/">
            <h3>Go Back</h3>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Login">
        <h1>Log in!</h1>
        Logged in as {currentUser}
        <button className="logout" onClick={userLogout}>
          Logout
        </button>
      </div>
    );
  }
}
