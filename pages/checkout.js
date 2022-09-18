import { updateCartCount } from "./../utils/cart-counter.js";

$(function () {
  const renderCart = () => {
    const productList = JSON.parse(localStorage.getItem("product-list"));
    const cartItemContainer = $("#cart-item-container");
    if (!productList) return;
    for (const product of productList) {
      const cardItem = $("<div>")
        .attr("class", "item")
        .appendTo(cartItemContainer);
      $("<img>").attr("src", product.preview).appendTo(cardItem);

      const detailDiv = $("<div>").attr("class", "detail").appendTo(cardItem);
      $("<h3>").text(product.title).appendTo(detailDiv);
      $("<p>").text(`x${product.count}`).appendTo(detailDiv);
      $("<p>")
        .text(`Amount: ${product.price * product.count}`)
        .appendTo(detailDiv);
    }

    const totalCartAmount = productList.reduce((total, product) => {
      return (total += product.price * product.count);
    }, 0);

    $("#total-amount").text(totalCartAmount);
  };

  const placeOrderFunctionality = () => {
    // clear once order is placed
    localStorage.clear();
    // update cart counter
    updateCartCount();

    // API not working
    /* const currentTime = new Date();
    const currenttTimeISOFormat = currentTime.toISOString();
    const productsTosend = JSON.stringify(
      productList.map((product) => typeof product)
    );
    const data = {
      createdAt: currenttTimeISOFormat,
      name: "Ashwell Colt",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/167.jpg",
      id: Math.floor(Math.random() * 1000),
    };

    data[productsTosend] = "";
    console.log(data);

    // https://5d76bf96515d1a0014085cf9.mockapi.io/order
    fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/order?jsoncallback=?", {
      method: "POST",
      headers: data ? { "content-Type": "application/json" } : {},
      body: JSON.stringify(data),
    })
      .then((responseData) => {
        console.log("response from post :", responseData);
      })
      .catch((err) => {
        console.log("some error occured :", err);
      }); */
  };

  // call once when the page is loaded
  updateCartCount();
  renderCart();
  $("#place-order").click(placeOrderFunctionality);
});
