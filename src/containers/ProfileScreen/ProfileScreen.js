import React from "react";
import "./ProfileScreen.css";

import Nav from "../../components/Nav/Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { netflixavatar } from "../../assets";
import { auth } from "../../firebase";
import Plans from "../../components/Plans/Plans";

function ProfileScreen() {
  const user = useSelector(selectUser);

  return (
    <div className="profile-screen">
      <Nav />
      <div className="profile-screen__body">
        <h1>Edit Profile</h1>
        <div className="profile-screen__info">
          <img src={netflixavatar} className="profile-screen__avatar" alt="profile-avatar" />
          <div className="profile-screen__details">
            <h2>{user.email}</h2>
            <div className="profile-screen__plans">
              <Plans />
              <button
                onClick={() => auth.signOut()}
                className="profile-screen__sign-out"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
