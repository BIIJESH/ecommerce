import React from "react";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <div className=" container newsletter">
      <h1>Get Exculsive Offers On Your Email</h1>
      <p>Subscribe to our newsletter to stay updated</p>
      <div>
        <input type="email" placeholder="Your Email " />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default Newsletter;
