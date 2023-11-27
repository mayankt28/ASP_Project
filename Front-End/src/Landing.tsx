import "./App.css";
import { useState } from "react";
import "materialize-css/dist/css/materialize.min.css";
import { useNavigate } from "react-router";

export default function Landing() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
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
    console.log(password);
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
    if (emailValidation() && passwordValidation()) {
      navigate("/home");
      return;
    }
    console.log(errorMessage);
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
            className="white-text"
            pattern="^[a-zA-Z0-9_-]{1,16}$"
            placeholder="Enter email address"
            onChange={(event) => setEmail(event.target.value)}
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
            className="white-text"
            placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" value="Login" className="btn" onClick={onLogIn}>
          Login
        </button>

        <div style={{ textAlign: "center", marginTop: "1em" }}>
          Do not have an acccount? <a href="signup">Create One</a>
        </div>
      </form>
    </div>
  );
}
