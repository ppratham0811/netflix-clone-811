import React, { useState } from "react";
import "./LoginScreen.css";

import { NetflixLogo } from "../../assets";

import SignInScreen from "../SignInScreen/SignInScreen";
import { useNavigate } from "react-router-dom";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="loginscreen">
      <div className="loginscreen__background">
        <img
          onClick={() => navigate("/")}
          className="loginscreen__logo"
          src={NetflixLogo}
          alt="netflix-logo"
        />
        <button onClick={() => setSignIn(true)} className="loginscreen__signin">
          Sign In
        </button>

        <div className="loginscreen__gradient" />
      </div>

      <div className="loginscreen__body">
        {signIn ? (
          <SignInScreen />
        ) : (
          <>
            <h1>Unlimited movies, TV shows and more.</h1>
            <h2>Watch Anywhere. Cancel at any time.</h2>
            <form className="loginscreen__form" action="">
              <p>
                Ready to watch? Enter your email to create or restart your
                membership.
              </p>
              <div className="loginscreen__form-div">
                <input type="text" placeholder="Email Address" />
                <button onClick={() => setSignIn(true)}>Get Started</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
