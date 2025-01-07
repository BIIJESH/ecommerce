import React, { useContext } from "react";
import "./CartItem.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
     const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
          useContext(ShopContext);
     return (
          <div className="container cartitems">
               <table className="cartitems-table">
                    <thead>
                         <tr>
                              <th>Products</th>
                              <th>Title</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Total</th>
                              <th>Remove</th>
                         </tr>
                    </thead>
                    <tbody>
                         {all_product.map((e) => {
                              if (cartItems[e.id] > 0) {
                                   return (
                                        <tr key={e.id}>
                                             <td>
                                                  <img
                                                       src={e.image}
                                                       alt=""
                                                       className="carticon-product-icon"
                                                  />
                                             </td>
                                             <td>{e.name}</td>
                                             <td>${e.new_price}</td>
                                             <td>
                                                  <button className="cartitems-quantity">
                                                       {cartItems[e.id]}
                                                  </button>
                                             </td>
                                             <td>
                                                  $
                                                  {e.new_price *
                                                       cartItems[e.id]}
                                             </td>
                                             <td>
                                                  <img
                                                       className="cartitems-remove-icon"
                                                       src={remove_icon}
                                                       onClick={() => {
                                                            removeFromCart(
                                                                 e.id
                                                            );
                                                       }}
                                                       alt=""
                                                  />
                                             </td>
                                        </tr>
                                   );
                              }
                              return null;
                         })}
                    </tbody>
               </table>
               <div className="cartitems-down">
                    <div className="cartitems-total">
                         <div>
                              <div className="cartitems-total-item">
                                   <p>Subtotal</p>
                                   <p>${getTotalCartAmount()}</p>
                              </div>
                              <hr />
                              <div className="cartitems-total-item">
                                   <p>Shipping Fee</p>
                                   <p>Free</p>
                              </div>
                              <hr />
                              <div className="cartitems-total-item">
                                   <h3>Total</h3>
                                   <h3>${getTotalCartAmount()}</h3>
                              </div>
                         </div>
                         <div className="checkout-wrap">
                              <div className="cartitems-promocode">
                                   <div className="cartitems-promobox">
                                        <p>
                                             If you have a promo code, Enter it
                                             here
                                        </p>
                                        <input
                                             type="text"
                                             placeholder="promo code"
                                        />
                                        <button>Submit</button>
                                   </div>
                              </div>
                              <button className="checkout-btn">PROCEED TO CHECKOUT</button>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default CartItems;
