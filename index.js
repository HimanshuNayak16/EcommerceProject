import { updateCartCount } from "./utils/cart-counter.js";

$(function () {
  // slick settings for carousel
  $("#banner").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    dots: true,
    arrows: false,
  });

  const getProducts = () => {
    // fetch response from api
    return fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/product")
      .then((response) => {
        // convert this response to json
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => console.log("some error occured :", err));
  };

  // select clothing cards container
  const clothingCardsContainer = $("#clothingCards");
  // select accessories cards container
  const accessoriesCardsContainer = $("#accessoriesCards");

  const renderProduct = (product, cardContainer) => {
    // destructuring product object
    const { id, brand, name, preview, price } = product;

    // create a card and append it to cardContainer div
    const card = $("<div>")
      .attr({
        id: `${id}`,
        class: "card",
      })
      .appendTo(cardContainer);

    // create a link to get into product.html page and append it to card
    const productLink = $("<a>")
      .attr({
        id: `product_id_${id}`,
        href: `pages/product.html?product_id=${id}`,
      })
      .appendTo(card);

    // create a image container div and append it to product link
    const imgDiv = $("<div>").attr({ class: "img" }).appendTo(productLink);
    // create a img element and append it to image container div
    $("<img>").attr("src", preview).appendTo(imgDiv);
    // create a details container div and append it to product link
    const productDetailsDiv = $("<div>")
      .attr("class", "details")
      .appendTo(productLink);
    // create a h3 element and append it to details container div
    $("<h3>").text(name).appendTo(productDetailsDiv);
    // create a h4 element and append it to details container div
    $("<h4>").text(brand).appendTo(productDetailsDiv);
    // create a h5 element and append it to details container div
    $("<h5>").text(`Rs ${price}`).appendTo(productDetailsDiv);
  };

  const renderAllCards = () => {
    getProducts().then((products) => {
      for (const product of products) {
        // if isAccessory property is true render it inside accessories cards container otherwise render it inside clothing cards container
        renderProduct(
          product,
          product.isAccessory
            ? accessoriesCardsContainer
            : clothingCardsContainer
        );
      }
    });
  };

  updateCartCount();
  renderAllCards();
});
