import "./signup.css";
import { useState } from "react";
import "materialize-css/dist/css/materialize.min.css";
import { useNavigate } from "react-router";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
    if (
      password.length >= 8 &&
      password.length <= 30 &&
      password === passwordVerification
    ) {
      setErrorMessage("");
      return true;
    } else if (password.length < 8 || password.length > 30) {
      setErrorMessage(
        "Password should be between 8 to 30 characters (whitespaces will be ignored)"
      );
      return false;
    } else if (password != passwordVerification) {
      setErrorMessage("Password in both the input fields were not same.");
      return false;
    }
  };

  const onSignUp = (event: any) => {
    if (
      emailValidation() &&
      passwordValidation() &&
      name.length > 5 &&
      name.length < 20
    ) {
      navigate("/login");
      return;
    }
    console.log(event);
  };

  return (
    <div className="signup_root">
      <form className="signup-form" action="javascript:void(0);">
        <h1>Sign Up</h1>
        <div className="form-field">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="email"
            id="email"
            pattern="^[a-zA-Z0-9_-]{1,16}$"
            placeholder="Enter email "
            className="white-text"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-field">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="username"
            id="username"
            pattern="^[A-Za-z ]{5, 30}$"
            placeholder="Enter full name"
            className="white-text"
            onChange={(event) => setName(event.target.value)}
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
            placeholder="Enter password"
            className="white-text"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-field">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="password_verification"
            id="password_verification"
            className="white-text"
            placeholder="Enter password again"
            onChange={(event) => setPasswordVerification(event.target.value)}
            required
          />
          <label htmlFor="password_verification">Password (verification)</label>
        </div>
        <button type="submit" value="SignUp" className="btn" onClick={onSignUp}>
          SignUp
        </button>
        <div style={{ textAlign: "center", marginTop: "1em" }}>
          Already have an account? <a href="/login">Log In</a>
        </div>
      </form>
    </div>
  );
}
