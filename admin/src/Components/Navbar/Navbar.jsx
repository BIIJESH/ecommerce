import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/nav-logo.svg";
import navProfile from "../../assets/nav-profile.svg";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="" className="navlogo" />
      <h1>LUXIFY</h1>
      <img src={navProfile} alt="" className="navProfile" />
    </div>
  );
};

export default Navbar;
