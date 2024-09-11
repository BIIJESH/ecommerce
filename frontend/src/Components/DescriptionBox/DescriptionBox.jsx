import React from "react";
import "./DescriptionBox.css";
const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews(122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt,
          neque error aperiam repellendus possimus magnam voluptatem in commodi
          reiciendis eos enim ut porro sequi, maxime vitae eum totam
          necessitatibus sunt?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          delectus, quos rem molestiae itaque incidunt distinctio at tempora
          nulla cupiditate reiciendis. Officia eveniet perferendis fugiat, modi
          sit fugit cumque repudiandae.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
