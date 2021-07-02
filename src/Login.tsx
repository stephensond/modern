import React, { ReactElement, useState } from "react";
import { setConstantValue } from "typescript";

export default function Login(): ReactElement {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [currentUser, setCurrentUser] = useState("")

  const userLogout = () => {
    setCurrentUser('');
    setUsername('');
    setPass('')
  }

  const userLogin = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, pass: pass }),
    };
    fetch(process.env.REACT_APP_API + "/login", requestOptions)
      .then((res) => {if (res.status === 200) {alert('Welcome back!');
                                              return res.json()}
                         else {alert('Incorrect username/password')}})
      .then(j => {setCurrentUser(j['username'])})
      .catch((error) => console.log(error));
  };

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  const updatePass = (event) => {
    setPass(event.target.value);
  };

if (currentUser === '') {
  return (
    
    <div className="Login">
      <label>
        Username:
        <input type="text" onChange={updateUsername} />
      </label>
      <label>
        Password:
        <input type="text" onChange={updatePass} />
      </label>
      <button onClick={userLogin} className="login">
        Submit
      </button>
    </div>
  )}
  else {return <div className="Login">Logged in as {currentUser }
                <button className = 'logout'
                        onClick = {userLogout}>
                    Logout
                </button>
                </div>}
  ;
}
