import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios for API calls
import './css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return;

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/token/refresh/', {
        refresh: refreshToken,
      });
      localStorage.setItem('accessToken', response.data.access);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error refreshing token:', error);
      handleLogout(); // Call logout if refreshing fails
    }
  };

  const redirectToGraduatePage = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || isTokenExpired(token)) {
      await refreshToken(); // Refresh token if expired
    }

    if (isLoggedIn) {
      navigate("/graduate");
    } else {
      setShowPopup(true); // Show popup if not logged in
    }
  };

  const isTokenExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="logo navbar-brand">TalentStart</div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href="startups.html">Startups</a>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={redirectToGraduatePage}>Graduate</button>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact.html">Contact us</a>
                </li>
              </ul>
              <div className="ms-auto">
                {isLoggedIn ? (
                  <div className="dropdown">
                    <button 
                      className="btn btn-link dropdown-toggle dropdown-button"
                      onClick={toggleDropdown}
                      style={{ color: '#000', textDecoration: 'none' }}
                    >
                      {user?.email}
                    </button>
                    {showDropdown && (
                      <div className="dropdown-menu dropdown-menu-end show" aria-labelledby="navbarDropdown">
                        <button className="dropdown-item" onClick={() => navigate("/account")}>
                          Your Account
                        </button>
                        <button className="dropdown-item" onClick={handleLogout}>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button className="btn btn-primary me-2" onClick={handleLoginRedirect}>
                      Login
                    </button>
                    <button className="btn btn-secondary" onClick={handleRegisterRedirect}>
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="section" id="banner">
        <div className="content-fit">
          <div className="title" data-before="TalentStart">Talent Start</div>
        </div>
        <img src="/img/flower.png" className="decorate" alt="" style={{ width: "50vw", bottom: 0, right: 0 }} />
        <img src="/img/leaf.png" className="decorate" alt="" style={{ width: "30vw", bottom: 0, left: 0 }} />
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div className="modal" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login Required</h5>
                <button type="button" className="btn-close" onClick={closePopup}></button>
              </div>
              <div className="modal-body">
                <p>You need to login first to access this page.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closePopup}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleLoginRedirect}>Login</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div id="container3D"></div>
      <script type="module" src="/static/js/appp.js"></script>
    </div>
  );
}

export default Home;
