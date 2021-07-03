import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function Home(): ReactElement {
  return (
    <div>
      <h1>Welcome to Modern Fantasy!</h1>
      <div>
        <Link to="/login"><h3>Log in</h3></Link>
      </div>
      <div>
        <Link to="/newuser"><h3>Sign up</h3></Link>
      </div>
    </div>
  );
}
