import {
  updateCartCount,
  initCartCountInLocalStorage,
  initProductListInLocalStorage,
} from "./../utils/cart-counter.js";

$(function () {
  const getProduct = (productId) => {
    // fetch response from api
    return fetch(
      `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${productId}`
    )
      .then((response) => {
        // convert response into json
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => console.log("some error occured :", err));
  };

  // grab query string
  const queryString = window.location.search; // ?product_id=${id}
  // parse the query string’s parameters using URLSearchParams
  const urlParams = new URLSearchParams(queryString);
  //  URLSearchParams.get() will return the first value associated with the given search parameter
  const productId = urlParams.get("product_id");

  const renderProduct = () => {
    getProduct(productId).then((product) => {
      // destructuring product
      const {
        name: productName,
        preview,
        photos,
        brand: productBrand,
        description: desc,
        price,
      } = product;

      $("#name").text(productName);
      $("#brand").text(productBrand);
      $("#price").text(price);
      $("#description").text(desc);
      $("#productImg").attr("src", preview);

      // add this functionality only to available preview images only
      $(photos).each((index, photo) => {
        $(`#img${index}`)
          .attr("src", photo)
          .click(showProductPreviewFunctionality);
      });
    });
  };

  const showProductPreviewFunctionality = (event) => {
    $(".previewImg")
      .children()
      .each((index, element) => {
        element.classList.remove("active");
      });
    event.target.classList.add("active");
    $("#productImg").attr("src", `${event.target.src}`);
  };

  const addToCartFunctionality = () => {
    initCartCountInLocalStorage();
    let cartCount = Number(localStorage.getItem("cart-count"));
    // increment cart counter variable
    cartCount++;
    localStorage.setItem("cart-count", cartCount);
    initProductListInLocalStorage();
    let cartProductList = JSON.parse(localStorage.getItem("product-list"));
    getProduct(productId).then((product) => {
      // destructuring product
      const { id, name, preview, price } = product;

      const checkIfProductAlreadyInCart = cartProductList
        .map((product) => product.id)
        .includes(id);
      // if product doesn't exist push product into cart list
      if (!checkIfProductAlreadyInCart) {
        cartProductList.push({
          id,
          title: name,
          preview,
          price,
          count: 1,
        });
      } else {
        // otherwise modify product count of cart product
        cartProductList = cartProductList.map((product) => {
          if (product.id == id) {
            return {
              id,
              title: name,
              preview,
              price,
              count: product.count + 1,
            };
          } else return product;
        });
      }

      // update localStorage product-list
      localStorage.setItem("product-list", JSON.stringify(cartProductList));
      // update cart counter
      updateCartCount();
    });
  };

  // call once when the page is loaded
  updateCartCount();
  renderProduct();
  $("#add-to-cart").click(addToCartFunctionality);
});
