import React, { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";
import "./Confirmation.css";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();
  const { userInfo, transactionHistory } = useContext(AppContext);

  // Get the user's order history
  const userOrderHistory = transactionHistory[userInfo.id] || [];

  // Find the most recent order for the user
  let mostRecentOrder = null;
  let mostRecentTimestamp = 0;

  userOrderHistory.forEach((order) => {
    const orderTimestamp = new Date(order.timestamp).getTime();
    if (orderTimestamp > mostRecentTimestamp) {
      mostRecentTimestamp = orderTimestamp;
      mostRecentOrder = order;
    }
  });
const goToHistory = () => {
  navigate("/transactions");
}
  return (
    <div>
      <NavBar />
      <div className="confirmation-wrap">
        <h2>Order Confirmation</h2>
        {mostRecentOrder && (
          <div className="order-details">
            <h3>Your Order Details:</h3>
            <div className="order-details-info">
              <p>
                Date: {new Date(mostRecentOrder.timestamp).toLocaleString()}
              </p>
              <p>Total Price: ${mostRecentOrder.total}</p>
              <p>Total Quantity: {mostRecentOrder.totalQuantity}</p>
            </div>
            {/* Render the order items */}
            <div className="order-items">
              {mostRecentOrder.products.map((product) => (
                <div key={product.id} className="product-item">
                  <div>
                    <p>{product.title}</p>
                  </div>
                  <div className="product-details-wrap">
                    <p>Price: ${product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Total: ${product.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="go-to-history-button-wrap" onClick={goToHistory}>
        <button>Go to transaction history</button>
      </div>
    </div>
  );
};

export default Confirmation;

// import React, { useContext } from "react";
// import { AppContext } from "../../Contexts/AppContext";
// import "./Confirmation.css";
// import NavBar from "../NavBar/NavBar";

// const Confirmation = () => {
//   const { userInfo, transactionHistory } = useContext(AppContext);

//   // Assuming userInfo.id is 5, get the user's order history
//   const userOrderHistory = transactionHistory[userInfo.id] || [];

//   return (
//     <div>
//       <NavBar />
//       <div className="confirmation-wrap">
//         <h2>Confirmation</h2>
//         {userOrderHistory.map((order, index) => (
//           <div key={index} className="order-details">
//             <h3>Order {index + 1}</h3>
//             <p>Date: {new Date(order.timestamp).toLocaleString()}</p>
//             <p>Total Price: ${order.total}</p>
//             <p>Total Quantity: {order.totalQuantity}</p>
//             {/* Render the order items */}
//             <div className="order-items">
//               {order.products.map((product) => (
//                 <div key={product.id} className="product-item">
//                   <p>{product.title}</p>
//                   <p>Price: ${product.price}</p>
//                   <p>Quantity: {product.quantity}</p>
//                   <p>Total: ${product.total}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Confirmation;
