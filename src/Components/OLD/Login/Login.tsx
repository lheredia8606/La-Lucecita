import { useState } from "react";
export const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  return (
    <>
      <div className="modal" id="loginModal" style={{ display: "flex" }}>
        <div className="modal-content">
          <h2>Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                }}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            <a href="#" className="register-link">
              Register
            </a>
          </form>
        </div>
      </div>
    </>
  );
};
