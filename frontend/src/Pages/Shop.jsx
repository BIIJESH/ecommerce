import React, { useRef } from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewCollections from "../Components/NewCollections/NewCollections";
import Newsletter from "../Components/NewsLetter/Newsletter";

const Shop = () => {
  const newCollectionsRef = useRef(null);

  const handleClick = () => {
    newCollectionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Hero onScrollToCollections={handleClick} />
      <Popular />
      <Offers />
      <NewCollections ref={newCollectionsRef} />
      <Newsletter />
    </div>
  );
};

export default Shop;
