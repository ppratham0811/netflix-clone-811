import React, { useEffect, useState } from "react";
import "./Nav.css";

import { NetflixLogo, netflixavatar } from "../../assets";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => navigate("/")}
          className="nav__logo"
          src={NetflixLogo}
          alt="netflix-logo"
        />
        <img
          onClick={() => navigate("/profile")}
          className="nav__avatar"
          src={netflixavatar}
          alt="netflix-avatar"
        />
      </div>
    </div>
  );
}

export default Nav;
