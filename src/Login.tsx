import React, { ReactElement, useState } from "react";

export default function Login(): ReactElement {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const userLogin = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, pass: pass }),
    };
    fetch(process.env.REACT_APP_API + "/login", requestOptions)
      .then((res) => res.status)
      .then((status) => {(status === 200) ? alert('Welcome back!') 
                                          : alert('Incorrect username/password')})
      .catch((error) => console.log(error));
  };

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  const updatePass = (event) => {
    setPass(event.target.value);
  };

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
  );
}
