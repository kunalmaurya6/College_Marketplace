import { fetchData } from "../api/server";

const CART_SESSION_KEY = "collegeMarketplaceCartSession";
const CART_CHANGED_EVENT = "cartChanged";

const createSessionId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `cart-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const getCartSessionId = () => {
  let sessionId = localStorage.getItem(CART_SESSION_KEY);

  if (!sessionId) {
    sessionId = createSessionId();
    localStorage.setItem(CART_SESSION_KEY, sessionId);
  }

  return sessionId;
};

const cartHeaders = () => ({
  "Content-Type": "application/json",
  "x-cart-session-id": getCartSessionId(),
});

export const notifyCartChanged = () => {
  window.dispatchEvent(new Event(CART_CHANGED_EVENT));
};

export const listenForCartChanges = (callback) => {
  window.addEventListener(CART_CHANGED_EVENT, callback);
  return () => window.removeEventListener(CART_CHANGED_EVENT, callback);
};

export const getCartProducts = async () => {
  return fetchData("/cart", {
    headers: {
      "x-cart-session-id": getCartSessionId(),
    },
  });
};

export const addProductToCart = async (productId) => {
  const response = await fetchData("/cart", {
    method: "POST",
    headers: cartHeaders(),
    body: JSON.stringify({ productId }),
  });

  notifyCartChanged();
  return response;
};

export const removeProductFromCart = async (productId) => {
  const response = await fetchData(`/cart/${productId}`, {
    method: "DELETE",
    headers: {
      "x-cart-session-id": getCartSessionId(),
    },
  });

  notifyCartChanged();
  return response;
};
