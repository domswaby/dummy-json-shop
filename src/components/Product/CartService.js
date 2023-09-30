export const getProductFromCart = (productId, cart) => {
  let products = cart.products;
  for (let product of products) {
    if (product.id == productId) {
      return product;
    }
  }

  return null;
};

export const updateUserCartProduct = (userCart, product) => {
  let products = userCart.products;
  for (let idx = 0; idx < products.length; idx++) {
    if (products[idx].id === product.id) {
      userCart.products[idx] = products;
    }
  }
  return userCart;
};
