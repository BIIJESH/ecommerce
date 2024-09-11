import React from "react";
import "./Offers.css";
import exculsive_image from "../Assets/exclusive_image.png";

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <p>Offers For you</p>
        <p>Only ON BEST SELLERS PRODUCTS</p>
        <button>Check Now</button>
      </div>
      <div className="offers-right">
        <img src={exculsive_image} alt="" />
      </div>
    </div>
  );
};

export default Offers;