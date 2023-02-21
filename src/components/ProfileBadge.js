import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "./profile-badge.scss";

const ProfileBadge = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const handleClick = (menuOpen) => {
    if (isAuthenticated) {
      setMenuOpen(menuOpen);
      return;
    } else {
      loginWithRedirect();
    }
  };

  return (
    <div
      onClick={() => handleClick(!menuOpen)}
      className="profile-badge-container"
    >
      <div className="profile-badge-information-container">
        <img
          className="profile-badge-icon"
          src={isAuthenticated ? user.picture : "./default-avatar.webp"}
          alt={isAuthenticated ? user.name : "default avatar"}
        />
        <div className="profile-badge-name-container">
          <p className="profile-badge-user-name">
            {isAuthenticated
              ? user.name === user.email
                ? user.nickname
                : user.name
              : "Log In"}
          </p>

          <p className="profile-badge-user-email">
            {isAuthenticated ? user.email : "Please log in to print."}
          </p>
        </div>
      </div>

      {menuOpen ? (
        <div className="profile-badge-menu">
          <button
            className="profile-badge-logout"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Sign Out
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileBadge;
