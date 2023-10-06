import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { AppContext } from "../../Contexts/AppContext";
import "../Gallery/Gallery.css";
import { Spinner } from "@chakra-ui/spinner";
import "./Product.css";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { cartFactory } from "./CartFactory";
import { getProductFromCart, updateUserCartProduct } from "./CartService";

const Product = () => {
  const { userInfo, setCart, cart } = useContext(AppContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showMinQuantityMessage, setShowMinQuantityMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Add this state

  // Define the fetchProductById function outside of useEffect
  const fetchProductById = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        // Handle error if the request is not successful
        console.error("Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  const onAddToCart = () => {
    // show error if quantity is less than 1
    if (quantity < 1) {
      setShowMinQuantityMessage(true);
      setTimeout(() => {
        setShowMinQuantityMessage(false);
      }, 3000);
    } else {
      let userCart = cart[userInfo.id];
      let cartProduct = getProductFromCart(product.id, userCart);
      let cartDidntExist = cartProduct ? false : true;

      if (cartProduct === null) {
        // Create a new product object with initial values
        cartProduct = {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 0, // Initialize quantity to 0
          total: 0, // Initialize total to 0
        };
      }

      // Update cartProduct based on the quantity
      cartProduct.quantity += quantity;
      cartProduct.total = cartProduct.price * cartProduct.quantity;

      // Update userCart
      userCart.total += cartProduct.total;

      // Apply discount if total exceeds 1000
      if (userCart.total > 1000) {
        userCart.discountedTotal = userCart.total - userCart.total * 0.2;
      }

      // Update totalQuantity and totalProducts
      userCart.totalQuantity += quantity;
      userCart.totalProducts = userCart.products.length;

      if (cartDidntExist) {
        // Push the new cartProduct object to the products array
        userCart.products.push(cartProduct);
      } else {
        // Update the existing cartProduct in the products array
        const updatedProducts = userCart.products.map((p) =>
          p.id === cartProduct.id ? cartProduct : p
        );
        userCart.products = updatedProducts;
      }

      // Update the cart state
      setCart({ ...cart, [userInfo.id]: userCart });
      console.log("Cart Updated successfully");
      console.log(userCart.products);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  //   const onAddToCart = () => {
  //     // show error if quantity is less than 1
  //     if (quantity < 1) {
  //       setShowMinQuantityMessage(true);
  //       setTimeout(() => {
  //         setShowMinQuantityMessage(false);
  //       }, 3000);
  //     } else {
  //       // You can use the quantity value here as needed
  //       let userCart = cart[userInfo.id];
  //       let cartProduct = getProductFromCart(product.id, userCart);
  //       let cartDidntExist = cartProduct ? false : true;
  //       if (cartProduct === null) {
  //         cartProduct = product;
  //       }
  //       let addTotal = Number(product.price) * quantity;
  //       if (!("total" in cartProduct)) {
  //         cartProduct["total"] = 0;
  //       }
  //       cartProduct["total"] += addTotal;
  //       userCart.total += cartProduct["total"];
  //       if (userCart.total > 1000) {
  //         userCart["discountedTotal"] = userCart.total - userCart.total * 0.2;
  //       }

  //       if (!("quantity" in cartProduct)) {
  //         cartProduct["quantity"] = 0;
  //       }
  //       cartProduct["quantity"] += quantity;
  //       userCart["totalQuantity"] += cartProduct["quantity"];

  //       userCart["totalProducts"] = userCart.products.length;

  //       if (cartDidntExist) {
  //         userCart.products.push(cartProduct);
  //       } else {
  //         userCart = updateUserCartProduct(userCart, cartProduct);
  //       }
  //       setCart({ ...cart, [userInfo.id]: userCart });

  //       console.log("Cart Updated successfully");
  //       console.log(userCart.products);
  //     }
  //   };

  useEffect(() => {
    // Call the fetchProductById function when the component mounts
    fetchProductById();
  }, [id]);

  return (
    <div className="product-container">
      <NavBar />
      {product ? (
        <div className="product-wrap">
          <div className="product-image-wrap">
            <img src={product.thumbnail} alt={`Image ${product.id}`} />
          </div>
          <div className="product-details-wrap">
            <div className="product-details">
              <h2>{product.title}</h2>
              <p>
                <span>ID:</span> {product.id}
              </p>
              <p>
                <span>Title:</span> {product.title}
              </p>
              <p>
                <span>Description:</span> {product.description}
              </p>
              <p>
                <span>Brand:</span> {product.brand}
              </p>
              <p>
                <span>Category:</span> {product.category}
              </p>
              <p>
                <span>Price:</span> ${product.price}
              </p>

              <p>
                <span>Rating:</span> {product.rating}
              </p>
              <p>
                <span>Stock:</span> {product.stock}
              </p>
            </div>
          </div>
          <div className="add-container">
            <p>Quantity:</p>
            <div className="number-select-wrap">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div className="add-button-wrap">
              <button className="add-button" onClick={onAddToCart}>
                Add to Cart
              </button>
              {showMinQuantityMessage && (
                <p className="min-quantity-message">Minimum quantity is 1.</p>
              )}
              {showSuccessMessage && (
                <p className="success-message">{`${product.title} (Quantity: ${quantity}) added to the cart.`}</p>
              )}
            </div>
          </div>

          {/* Add more product details as needed */}
        </div>
      ) : (
        <div className="product-spinner-wrap">
          <p>Loading product...</p>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Product;
