import React, { useContext, useRef, useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import dropdown from "../Assets/nav_dropdown.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const navigate = useNavigate();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  // Check authentication on component load
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("auth-token"); // Remove token from localStorage
    setIsAuthenticated(false); // Update authentication status
    navigate("/login"); // Redirect to login page
  };

  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <Link to="/" style={{ textDecoration: "none" }}>
          <p>LUXIFY</p>
        </Link>
      </div>
      <img
        src={dropdown}
        className="nav-dropdown"
        onClick={dropdown_toggle}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link to="/" style={{ textDecoration: "none" }}>
            Shop
          </Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link to="/mens" style={{ textDecoration: "none" }}>
            Men
          </Link>
          {menu === "mens" && <hr />}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link to="/womens" style={{ textDecoration: "none" }}>
            Womens
          </Link>
          {menu === "womens" && <hr />}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link to="/kids" style={{ textDecoration: "none" }}>
            Kids
          </Link>
          {menu === "kids" && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        {isAuthenticated ? (
          <>
            {/* Show logout button when authenticated */}
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Show login button when not authenticated */}
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
          </>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="Cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
