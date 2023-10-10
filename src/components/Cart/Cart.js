import React, { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";
import "./Cart.css";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { cartFactory } from "../Product/CartFactory";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart, userInfo, transactionHistory, setTransactionHistory } =
    useContext(AppContext);

  const removeItemFromCart = (productId) => {
    console.log(productId);
    const userCart = cart[userInfo.id];
    for (let i = 0; i < userCart.products.length; i++) {
      if (userCart.products[i].id == productId) {
        userCart.total -= userCart.products[i].total;
        userCart.totalQuantity -= userCart.products[i].quantity;
        userCart.totalProducts -= 1;
        userCart.discountedTotal =
          userCart.total > 1000
            ? userCart.total - userCart.total * 0.2
            : userCart.total;
        userCart.products.splice(i, 1);
        break;
      }
    }
    setCart({ ...cart, [userInfo.id]: userCart });
    console.log("Removed items from cart");
    console.log("New user cart: " + JSON.stringify(cart[userInfo.id]));
  };
  const handleInstantCheckout = () => {
    // Display a confirmation dialog

    const userConfirmation = window.confirm(
      "Do you really want to buy all this stuff?"
    );

    // If the user clicks "OK" (true), navigate to "/confirmation"
    if (userConfirmation) {
      // Assuming transactionHistory and navigate are defined somewhere
      if (!(userInfo.id in transactionHistory)) {
        // Create a new array for the user's transaction history if it doesn't exist
        transactionHistory[userInfo.id] = [];
      }
      const timestamp = new Date().toISOString();
      let oldCart = cart[userInfo.id];
      oldCart.timestamp = timestamp;
      // Push the current cart to the user's transaction history
      transactionHistory[userInfo.id].push(oldCart);

      // Update the transactionHistory object
      setTransactionHistory({
        ...transactionHistory,
      });
      let newCart = cartFactory();
      newCart.id = userInfo.id;
      newCart.userId = userInfo.id;
      setCart({ ...cart, [userInfo.id]: newCart });

      // Log the updated transaction history
      console.log(JSON.stringify(transactionHistory));

      // Navigate to "/confirmation" (assuming navigate is correctly defined)
      navigate("/confirmation"); // You can also use react-router for navigation
    }
    // If the user clicks "Cancel" (false), do nothing
  };

  return (
    <div>
      <NavBar />
      <div className="cart-container">
        <h2 className="cart-header">Your Cart</h2>
        {cart[userInfo.id].products.length === 0 ? (
          <p className="empty-cart-message">Nothing in your cart yet!</p>
        ) : (
          <>
            <div className="cart-table-wrap">
              <table className="cart-table">
                <thead>
                  <tr className="table-head-tr">
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>{" "}
                    {/* Add a new column for the Remove button */}
                  </tr>
                </thead>
                <tbody>
                  {cart[userInfo.id].products.map((product) => (
                    <tr key={product.id} className="table-body-tr">
                      <td>{product.title}</td>
                      <td>${product.price}</td>
                      <td>{product.quantity}</td>
                      <td>${product.total}</td>
                      <td>
                        <button
                          className="delete-item-button"
                          onClick={() => removeItemFromCart(product.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="checkout-button-wrap">
              <button onClick={handleInstantCheckout}>Instant Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
