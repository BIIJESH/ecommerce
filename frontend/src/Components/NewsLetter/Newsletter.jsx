import React from "react";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <div className="newsletter">
      <h1>Get Exculsive Offers On Your Email</h1>
      <p>Subscribe to our newsletter to stay updated</p>
      <div>
        <input type="email" placeholder="your Email Id " />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default Newsletter;
