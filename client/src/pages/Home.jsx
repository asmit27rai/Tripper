import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        {isAuthenticated ? (
          <>
            <h1 className="display-3">Welcome User</h1>
            <p className="lead">Are You Plaining Some Journey.</p>
          </>
        ) : (
          <>
            <h1 className="display-3">Welcome to Tripper</h1>
            <p className="lead">Explore your next journey with us.</p>
          </>
        )}
        {isAuthenticated ? (
          <a href="/journeys" className="btn btn-outline-primary">
            See Your Journey Here
          </a>
        ) : (
          <a href="/register" className="btn btn-outline-primary">
            Start Your Journey With Us
          </a>
        )}
      </div>
    </div>
  );
};
