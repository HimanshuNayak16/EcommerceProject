const updateCartCount = () => {
  initCartCountInLocalStorage();
  $("#cart-count").text(localStorage.getItem("cart-count"));
};

const initCartCountInLocalStorage = () => {
  if (!localStorage.getItem("cart-count")) {
    localStorage.setItem("cart-count", 0);
  }
};

const initProductListInLocalStorage = () => {
  if (!localStorage.getItem("product-list")) {
    localStorage.setItem("product-list", JSON.stringify([]));
  }
};

export {
  updateCartCount,
  initCartCountInLocalStorage,
  initProductListInLocalStorage,
};
