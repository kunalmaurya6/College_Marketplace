import { fetchData } from "../api/server";

const CART_CHANGED_EVENT = "cartChanged";

export const notifyCartChanged = () => {
  window.dispatchEvent(new Event(CART_CHANGED_EVENT));
};

export const listenForCartChanges = (callback) => {
  window.addEventListener(CART_CHANGED_EVENT, callback);
  return () => window.removeEventListener(CART_CHANGED_EVENT, callback);
};

export const getCartProducts = async () => {
  return fetchData("/cart");
};

export const addProductToCart = async (productId) => {
  const response = await fetchData("/cart", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });

  notifyCartChanged();
  return response;
};

export const removeProductFromCart = async (productId) => {
  const response = await fetchData(`/cart/${productId}`, {
    method: "DELETE",
  });

  notifyCartChanged();
  return response;
};
