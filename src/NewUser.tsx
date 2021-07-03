import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";

export default function NewUser(): ReactElement {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const addUser = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, pass: pass }),
    };
    fetch(process.env.REACT_APP_API + "/addUser", requestOptions)
      .then((res) => res.status)
      .then((status) => {
        if (status === 200) {
          alert("Account created");
        } else if (status === 400) {
          alert("Username taken");
        }
      })
      .catch((error) => console.log(error));
  };

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  const updatePass = (event) => {
    setPass(event.target.value);
  };

  return (
    <div className="SignUp">
      <h1>Sign Up!</h1>
      <label>
        Username:
        <input type="text" onChange={updateUsername} />
      </label>
      <label>
        Password:
        <input type="text" onChange={updatePass} />
      </label>
      <button onClick={addUser} className="createUser">
        Submit
      </button>
      <div>
        <Link to="/">
          <h3>Go Back</h3>
        </Link>
      </div>
    </div>
  );
}
