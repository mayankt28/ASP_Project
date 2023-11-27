import "./App.css";
import { useState } from "react";
import "materialize-css/dist/css/materialize.min.css";

export default function Landing() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const emailValidation = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!regEx.test(email) && email !== "") {
      setErrorMessage("Invalid email");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const passwordValidation = () => {
    if (password.length >= 8 && password.length <= 30) {
      setErrorMessage("");
      return true;
    } else {
      setErrorMessage(
        "Password should be between 8 to 30 characters (whitespaces will be ignored)"
      );
      return false;
    }
  };

  const onLogIn = (event: any) => {
    if (!emailValidation() && !passwordValidation()) {
      return;
    }
    console.log(event);
  };

  return (
    <div className="landing_root">
      <form className="login-form" action="javascript:void(0);">
        <h1>Login</h1>
        <div className="form-field">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="email"
            id="email"
            className="form-field"
            pattern="^[a-zA-Z0-9_-]{1,16}$"
            placeholder="Enter email address"
            required
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-field">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="password"
            id="password"
            className="form-field"
            placeholder="Enter password"
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" value="Login" className="btn">
          Login
        </button>
      </form>
    </div>
  );
}
