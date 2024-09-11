import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";

const Product = () => {
  const { allproduct } = useContext(ShopContext);
  console.log(allproduct)
  const { productId } = useParams();
  const product = allproduct.find((e) => e.id === Number(productId));
  return (
    <div>
      <Breadcrum product={product} />
    </div>
  );
};

export default Product;
