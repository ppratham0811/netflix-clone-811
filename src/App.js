import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeScreen from "./containers/HomeScreen/HomeScreen";
import LoginScreen from "./containers/LoginScreen/LoginScreen";
import ProfileScreen from "./containers/ProfileScreen/ProfileScreen";

import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // Logged out
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route end path="/profile" element={<ProfileScreen />} />
            <Route end path="/" element={<HomeScreen />} />
          </Routes>
        )}
        {/* <Routes>
          <Route end path="/" element={<HomeScreen />} />
          <Route end path="/login" element={<LoginScreen />} />
        </Routes> */}
      </Router>
    </div>
  );
}

export default App;
