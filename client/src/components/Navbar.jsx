import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <a
          className="navbar-brand"
          href="/"
          style={{ fontFamily: '"Pacifico", cursive' }}
        >
          Tripper
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" />
          <div className="d-flex flex-column flex-lg-row align-items-center">
            {isAuthenticated ? (
              <>
                <a
                  href="/plan"
                  className="btn btn-outline-primary mx-2 my-1 my-lg-0"
                >
                  Plan Journey
                </a>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger mx-2 my-1 my-lg-0"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/register"
                  className="btn btn-outline-success mx-2 my-1 my-lg-0"
                >
                  Register
                </a>
                <a
                  href="/login"
                  className="btn btn-outline-primary mx-2 my-1 my-lg-0"
                >
                  Login
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
