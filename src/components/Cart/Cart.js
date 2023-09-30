import React, { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";
import "./Cart.css";
import NavBar from "../NavBar/NavBar";

const Cart = () => {
  const { cart, setCart, userInfo } = useContext(AppContext);

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

    // Filter out the product with the given productId
    // const updatedProducts = cart[userInfo.id].products.filter(
    //   (product) => product.id !== productId
    // );

    // // Update the cart with the new product list
    // setCart({
    //   ...cart,
    //   [userInfo.id]: {
    //     ...cart[userInfo.id],
    //     products: updatedProducts,
    //   },
    // });
  };

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
              <th>Action</th> {/* Add a new column for the Remove button */}
            </tr>
          </thead>
          <tbody>
            {cart[userInfo.id].products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>${product.total}</td>
                <td>
                  <button onClick={() => removeItemFromCart(product.id)}>
                    Remove
                  </button>
                </td>
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
