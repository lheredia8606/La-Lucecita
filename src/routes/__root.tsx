import {
  Link,
  Outlet,
  createRootRoute,
  useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useUser } from "../Providers/UserProvider";
import "../styles/root/root-style.css";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { authenticatedUser, setAuthenticatedUser, allUsers } = useUser();
  const router = useRouter();
  const goToMyPage = () => {
    if (!authenticatedUser) {
      router.navigate({ to: "/" });
    }
    if (authenticatedUser?.role === "admin") {
      router.navigate({ to: "/adminPage/UnassignedOrders" });
    } else if (authenticatedUser?.role === "client") {
      router.navigate({ to: "/clientPage/products" });
    } else if (authenticatedUser?.role === "worker") {
      router.navigate({ to: "/workerPage/UnassignedOrders" });
    }
  };
  useEffect(() => {
    const currentUserId = localStorage.getItem("authenticatedUser");
    if (!currentUserId) return;
    try {
      const foundUser = allUsers?.find((user) => user.id === currentUserId);
      if (foundUser) {
        setAuthenticatedUser(foundUser);
      }
    } catch (error) {
      console.error("Failed to parse currentUser from localStorage", error);
    }
  }, [allUsers]);
  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="logo">MyLogo</div>
          <ul className="nav-links">
            <li>
              <Link
                to="/"
                activeProps={{
                  className: "font-bold",
                }}
                activeOptions={{ exact: true }}
              >
                Home
              </Link>
            </li>
            {authenticatedUser && (
              <li>
                <a style={{ cursor: "pointer" }} onClick={goToMyPage}>
                  My Page
                </a>
              </li>
            )}
            <li>
              <a href="#">Services</a>
            </li>
            {authenticatedUser ? (
              <li>
                <a
                  href="#"
                  onClick={() => {
                    localStorage.removeItem("authenticatedUser");
                    setAuthenticatedUser(null);
                  }}
                >
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
