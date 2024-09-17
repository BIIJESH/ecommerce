import React from "react";
import "./Offers.css";
import exculsive_image from "../Assets/exclusive_image.png";

const Offers = () => {
  return (
    <div className="container offers">
      <div className="offers-left">
        <p>Just for You!</p>
        <h1>An Exclusive Offers</h1>
        <h6>
          Discover unbeatable deals on our top-selling products, handpicked to
          give you the best value.{" "}
        </h6>
        <button>Check Now</button>
      </div>
      <div className="offers-right">
        <img src={exculsive_image} alt="" />
      </div>
    </div>
  );
};

export default Offers;
