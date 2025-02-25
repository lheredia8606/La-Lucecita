import { useUser } from "../../Providers/UserProvider";
import "./style.css";
const HomePage = () => {
  const { authenticatedUser, setAuthenticatedUser } = useUser();
  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="logo">MyLogo</div>
          <ul className="nav-links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            {authenticatedUser ? (
              <li>
                <a href="#">Log in</a>
              </li>
            ) : (
              <li>
                <a href="#" onClick={() => setAuthenticatedUser(null)}>
                  Log out
                </a>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main className="main-container">
        <h1>Welcome to Our Website</h1>
        <p>
          This is a simple React webpage layout with a navbar, main content
          area, and a footer.
        </p>
      </main>
      <footer className="footer">
        <p>&copy; 2025 MyWebsite. All rights reserved.</p>
      </footer>
    </>
  );
};

export default HomePage;
