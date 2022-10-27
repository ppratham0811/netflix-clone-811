import React, { useRef } from "react";
import "./SignInScreen.css";

import { auth } from "../../firebase";

function SignInScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).then((regUser) => {
      console.log(regUser);
    }).catch((error) => {
      alert(error.message);
    })
  };

  return (
    <div className="signin-screen">
      <form>
        <h1>Sign In</h1>
        <input
          ref={emailRef}
          type="email"
          name="email"
          id="signin-email"
          placeholder="Email Address"
        />
        <input
          ref={passwordRef}
          type="password"
          name="password"
          id="signin-password"
          placeholder="A secret between us."
        />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>

        <h4>
          <span className="signin-screen__gray">New to Netflix? </span>
          <span className="signin-screen__signupnow" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignInScreen;
