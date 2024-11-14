import React, { useState, useEffect } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = () => {
    fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((error) => console.error('Error removing product:', error));
  };

  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((e) => (
          <div key={e.id}>
            <div className="listproduct-format-main listproduct-format">
              <img className="listproduct-product-icon" src={e.image} alt="" />
              <p>{e.name}</p>
              <p>${e.old_price}</p>
              <p>${e.new_price}</p>
              <p>{e.category}</p>
              <img
                className="listproduct-remove-icon"
                onClick={() => removeProduct(e.id)}
                src={cross_icon}
                alt=""
              />
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
