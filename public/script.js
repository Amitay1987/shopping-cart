// an array with all of our cart items
var cart = [];
var sum = 0;
var updateCart = function () {
  // TODO: Write this function. In this function we render the page.
  // Meaning we make sure that all our cart items are displayed in the browser.
  // Remember to empty the "cart div" before you re-add all the item elements.
    if(cart.length === 0){
        return;
    }

    $('.cart-list').empty();
    var title;
    var price;

    for (var i = 0; i < cart.length; i++) {
        title = cart[i].title;
        price = cart[i].price;
        $('.cart-list').append("<div>" + title + " - $" + price + "</div>");
    }
    console.log(sum);
    $('.total').text(sum);
}


var addItem = function (item) {
    var title = item.closest('.card').data().name;
    var price = item.closest('.card').data().price;

    var item_cart = {
        title: title,
        price: price,
    }

    cart.push(item_cart)
    sum+=item_cart.price;
    updateCart();
}

var clearCart = function () {
  cart = [];
  $('.cart-list').empty();
  sum = 0;
  $('.total').text(sum);
}

$('.view-cart').on('click', function () {
  $('.shopping-cart').toggleClass('show');
});


$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page
  var item = $(this);
  addItem(item);
  updateCart();
});

$('.clear-cart').on('click', function () {
    clearCart();
});

// update the cart as soon as the page loads!
updateCart();


