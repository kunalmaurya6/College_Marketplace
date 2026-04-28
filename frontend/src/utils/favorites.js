const FAVORITES_KEY = "collegeMarketplaceFavorites";
const FAVORITES_CHANGED_EVENT = "favoritesChanged";

const getProductId = (product) => product?._id || product?.id;

export const getFavoriteProducts = () => {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    return Array.isArray(favorites) ? favorites : [];
  } catch (error) {
    console.error("Unable to load favorite products:", error);
    return [];
  }
};

export const isFavoriteProduct = (productId) => {
  if (!productId) {
    return false;
  }

  return getFavoriteProducts().some((product) => getProductId(product) === productId);
};

export const toggleFavoriteProduct = (product) => {
  const productId = getProductId(product);

  if (!productId) {
    return false;
  }

  const favorites = getFavoriteProducts();
  const isAlreadyFavorite = favorites.some((item) => getProductId(item) === productId);
  const updatedFavorites = isAlreadyFavorite
    ? favorites.filter((item) => getProductId(item) !== productId)
    : [...favorites, product];

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));

  return !isAlreadyFavorite;
};

export const listenForFavoriteChanges = (callback) => {
  const handleChange = () => callback();

  window.addEventListener(FAVORITES_CHANGED_EVENT, handleChange);
  window.addEventListener("storage", handleChange);

  return () => {
    window.removeEventListener(FAVORITES_CHANGED_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
  };
};
