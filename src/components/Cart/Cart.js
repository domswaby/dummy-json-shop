import React from "react";
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";
import "./Cart.css";
import NavBar from "../NavBar/NavBar";

const Cart = () => {
  const { cart, setCart, userInfo } = useContext(AppContext);

  return (
    <div>
      <NavBar />
      <div className="cart-container">
        <h2>Your Cart</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart[userInfo.id].products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>${product.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Display total and other cart information here */}
      </div>
    </div>
  );
};

export default Cart;
