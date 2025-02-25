import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useUser } from "../Providers/UserProvider";
import "./root-style.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { authenticatedUser, setAuthenticatedUser } = useUser();
  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="logo">MyLogo</div>
          <ul className="nav-links">
            <li>
              <Link
                to="/home"
                activeProps={{
                  className: "font-bold",
                }}
                activeOptions={{ exact: true }}
              >
                Home
              </Link>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            {authenticatedUser ? (
              <li>
                <a href="#" onClick={() => setAuthenticatedUser(null)}>
                  Log out
                </a>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  activeProps={{
                    className: "font-bold",
                  }}
                  activeOptions={{ exact: true }}
                >
                  Log in
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main className="main-container">
        <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; 2025 MyWebsite. All rights reserved.</p>
      </footer>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
{
  /* <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{" "}
        <Link
          to="/about"
          activeProps={{
            className: "font-bold",
          }}
        >
          About
        </Link>
        <Link
          to="/users"
          activeProps={{
            className: "font-bold",
          }}
        >
          Users
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" /> */
}
