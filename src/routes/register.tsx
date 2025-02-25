import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import "./routes-styles/modal-style.css";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  return (
    <>
      <div id="registerModal" className="modal" style={{ display: "flex" }}>
        <div className="modal-content">
          <button
            className="close-btn"
            onClick={() => {
              router.navigate({ to: "/home" });
            }}
          >
            X
          </button>
          <h2>Register</h2>

          <div className="input-group">
            <label htmlFor="name">First Name</label>
            <input type="text" id="name" placeholder="Enter your first name" />
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter your last name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select id="role" disabled>
              <option value="client">Client</option>
              <option value="worker">Worker</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <div className="phone-group">
              <input type="text" id="areaCode" placeholder="Area Code" />
              <input type="text" id="phonePart1" placeholder="First Part" />
              <input type="text" id="phonePart2" placeholder="Second Part" />
            </div>
          </div>

          <button className="login-btn">Register</button>
          <Link to="/login" className="register-link">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </>
  );
}
