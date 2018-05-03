// an array with all of our cart items
var cart = [];
var sum = 0;
var getPic;

var updateCart = function () {
    // TODO: Write this function. In this function we render the page.
    // Meaning we make sure that all our cart items are displayed in the browser.
    // Remember to empty the "cart div" before you re-add all the item elements.
    if(cart.length === 0){
        //TODO remove total sum line;
        $('.cart-list').empty();
    }

    $('.cart-list').empty();
    var title, price, amount;

    for (var i = 0; i < cart.length; i++) {
        title = cart[i].title;
        price = cart[i].price;
        amount = cart[i].amount;
        var minus = `<i class="fa fa-minus btn-remove" data-title= "`+title+`"></i>`;

        $('.cart-list').append(`<div data-title ="` + title + `">` + title + " - $" + price + " (" + amount + ")  " + minus +"</div>");

    }

    $('.total').text(sum);
    bindEvents();
    localStorage.setItem('itemsArray', JSON.stringify(cart));
    localStorage.setItem('totalSum' , JSON.stringify(sum));
}


var addItem = function (item) {
    var title = item.closest('.card').data().name;
    var price = item.closest('.card').data().price;
    var checkIndex  = checkItemInList(title);

    if(checkIndex === -1){
        var item_cart = {
            title: title,
            price: price,
            amount: 1
        }
        cart.push(item_cart);
    }

    else{
        cart[checkIndex].amount++;
    }

    sum+=price;
    updateCart();
}

var clearCart = function () {
    cart = [];
    $('.cart-list').empty();
    sum = 0;
    $('.total').text(sum);
}

//return index of item or -1 if missing
var checkItemInList = function(title){
    var ans = -1;

    for (var i = 0; i < cart.length; i++) {
        if(cart[i].title === title){
            ans = i;
        }
    }
    return ans;
}

var deleteItemArray = function (ind) {
    sum-=cart[ind].price;
    if(cart[ind].amount === 1){
        cart.splice(ind,1);
    }
    else{
        cart[ind].amount--;
    }
}

var addItemToList = function (){

}

var bindEvents = function (){
    $('.btn-remove').on('click',function () {
        var deleteItem = $(this).data().title
        //$(this).closest('div').remove();
        var index  = checkItemInList(deleteItem);
        deleteItemArray(index);
        updateCart();
    })
}

$('.view-cart').on('click', function () {
    $('.shopping-cart').toggleClass('show');
});


$('.container').on('click','.buybox', function () {
    // TODO: get the "item" object from the page
    var item = $(this);
    addItem(item);
    updateCart();
});

$('.clear-cart').on('click', function () {
    clearCart();
});


$('#img-file').change(function (event) {
    getPic = URL.createObjectURL(event.target.files[0]);
});

$('#save').on('click',function () {
    var title = $('#product-name').val();
    var price = $('#product-price').val();




    //var pic = "http://qnimate.com/wp-content/uploads/2014/03/images2.jpg"
    //console.log(pic);

    // language=HTML
    var string =
        `<div class="col-md-4">
        <div class="card-container">
          <div class="card item" item data-name="${title}" data-price="${price}">
            <div class="pricebox">
              <p class="price"> $${price} </p>
            </div>
            <div class="buybox">
              <p class="add-to-cart"> ADD TO CART </p>
            </div>
            <div class="card-inner">
            <img src="${getPic}" class="proimage">
        </div>
      </div>
        </div>`

    $('.container').append(string);
})
// update the cart as soon as the page loads!
cart = JSON.parse(localStorage.getItem('itemsArray')) || [];
sum = JSON.parse(localStorage.getItem('totalSum'))
updateCart();



