import {
  createFileRoute,
  Link,
  Router,
  useRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import "./routes-styles/modal-style.css";
import { useUser } from "../Providers/UserProvider";
import { ErrorModal } from "../Components/ErrorModal/ErrorModal";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { allUsers, setAuthenticatedUser } = useUser();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [modalErrorMessage, setModalErrorMessage] = useState("");
  const router = useRouter();
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = allUsers?.find((user) => {
      return user.email.toLowerCase() === emailInput.toLowerCase();
    });
    if (!user) {
      setShowModalError(true);
      setModalErrorMessage("No user found!");
    } else if (user.password !== passwordInput) {
      setShowModalError(true);
      setModalErrorMessage("Wrong password!");
    } else {
      localStorage.setItem("authenticatedUser", user.id);
      let toRoute = "";
      if (user.role === "admin") {
        toRoute = "/adminUser";
      } else if (user.role === "worker") {
        toRoute = "/workerUser";
      } else {
        toRoute = "/clientUser";
      }
      setAuthenticatedUser(user);
      router.navigate({ to: toRoute });
    }
  };

  return (
    <>
      {showModalError && (
        <ErrorModal
          message={modalErrorMessage}
          onClose={() => {
            setShowModalError(false);
          }}
        />
      )}
      {!showModalError && (
        <div className="modal" id="loginModal" style={{ display: "flex" }}>
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => {
                router.navigate({ to: "/" });
              }}
            >
              X
            </button>
            <h2>Login</h2>
            <form onSubmit={handleOnSubmit}>
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
              <Link to="/register" className="register-link">
                Register
              </Link>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
