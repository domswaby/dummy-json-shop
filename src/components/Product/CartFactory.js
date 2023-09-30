export const cartFactory = () => {
  let cart = {
    id: 1,
    products: [],
    total: 0,
    discountedTotal: 0,
    userId: null,
    totalProducts: 0,
    totalQuantity: 0,
  };

  return cart;
};
