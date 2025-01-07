import React, { useState, useEffect } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
     const [allproducts, setAllProducts] = useState([]);

     const fetchInfo = () => {
          fetch("http://localhost:4000/allproducts")
               .then((res) => res.json())
               .then((data) => setAllProducts(data))
               .catch((error) =>
                    console.error("Error fetching products:", error)
               );
     };

     useEffect(() => {
          fetchInfo();
     }, []);

     const removeProduct = async (id) => {
          await fetch("http://localhost:4000/removeproduct", {
               method: "POST",
               headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({ id }),
          });

          fetch("http://localhost:4000/allproducts")
               .then((res) => res.json())
               .then((data) => setAllProducts(data))
               .catch((error) =>
                    console.error("Error removing product:", error)
               );
     };

     return (
          <div className="listproduct">
               <h1>All Products List</h1>
               <table className="listproduct-table">
                    <thead>
                         <tr>
                              <th>Product</th>
                              <th>Title</th>
                              <th>Old Price</th>
                              <th>New Price</th>
                              <th>Category</th>
                              <th>Remove</th>
                         </tr>
                    </thead>
                    <tbody>
                         {allproducts.map((e) => (
                              <tr key={e.id}>
                                   <td>
                                        <img
                                             className="listproduct-product-icon"
                                             src={e.image}
                                             alt=""
                                        />
                                   </td>
                                   <td>{e.name}</td>
                                   <td>${e.old_price}</td>
                                   <td>${e.new_price}</td>
                                   <td>{e.category}</td>
                                   <td>
                                        <img
                                             className="listproduct-remove-icon"
                                             onClick={() => removeProduct(e.id)}
                                             src={cross_icon}
                                             alt=""
                                        />
                                   </td>
                              </tr>
                         ))}
                    </tbody>
               </table>
          </div>
     );
};

export default ListProduct;
