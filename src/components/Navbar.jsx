import React from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { currentUser } = auth;
  const handleLogout = async () => {
    try {
      await signOut(auth)
        .then(() => {
          console.log("Sign-out successful.");
        })
        .catch((error) => {
          console.log("Something went wrong during logout: ", { error });
        });
    } catch (err) {}
  };

  return (
    <div className="navbar bg-base-100 justify-between">
      <a className="font-bold btn-ghost text-xl underline">PixPantry</a>
      <div>
        <a className="font-bold btn-ghost text-xl underline mr-5">{currentUser.email}</a>
        <button className="btn btn-error" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
