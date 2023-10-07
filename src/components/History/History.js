import React from "react";
import "./History.css";
import NavBar from "../NavBar/NavBar";
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";

const History = () => {
  const { userInfo, transactionHistory } = useContext(AppContext);
  const currentUserId = userInfo.id;

  // Check if the current user's history exists in the object
  const currentUserHistory = transactionHistory[currentUserId] || [];

  // Create a new array with updated transaction IDs
  const historyWithUpdatedIds = currentUserHistory.map(
    (transaction, index) => ({
      ...transaction,
      id: index + 1, // Assign the index + 1 as the new ID
    })
  );

  // Sort transactions by timestamp in descending order
  const sortedHistory = historyWithUpdatedIds.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div>
      <NavBar />
      <div className="history-wrap">
        <h2>Transaction History</h2>
        {sortedHistory.length > 0 ? (
          <div className="user-history">
            <h3 className="history-user-header">Username: {userInfo.username}</h3>
            {sortedHistory.map((transaction) => (
              <div key={transaction.id} className="transaction-table">
                <h4>Transaction ID: {transaction.id}</h4>
                <p>
                  Date & Time:{" "}
                  {new Date(transaction.timestamp).toLocaleString()}
                </p>
                <div className="history-table-wrap">
                  <table className="history-table">
                    <thead>
                      <tr className="table-head-tr">
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transaction.products.map((product) => (
                        <tr key={product.id} className="table-body-tr">
                          <td>{product.title}</td>
                          <td>${product.price.toFixed(2)}</td>
                          <td>{product.quantity}</td>
                          <td>${product.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>Total Amount: ${transaction.total.toFixed(2)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No transaction history available for User ID: {currentUserId}</p>
        )}
      </div>
    </div>
  );
};

export default History;
