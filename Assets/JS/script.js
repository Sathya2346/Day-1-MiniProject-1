     const btncart = document.querySelector('#cart-icon');
     const carts = document.querySelector('.carts');
     const btnClose = document.querySelector('#cart-close');

     btncart.addEventListener('click', ()=>{
        carts.classList.add('cart-active');
    });
    btnClose.addEventListener('click',()=>{
        carts.classList.remove('cart-active');
    });

    document.addEventListener('DOMContentLoaded',loadfood);

    function loadfood(){
        loadContent();
        updatetotal();
    }
    function loadContent(){
        // remove item from cart

        let  btnremove = document.querySelectorAll('.cart-remove');
        btnremove.forEach((btn)=>{
            btn.addEventListener('click',removeItem);
        });

        // product item change Event 

        let  qtyElement = document.querySelectorAll('.cart-quantity');
        qtyElement.forEach((input)=>{
            input.addEventListener('change',changQty);
        });

        // product cart

        let cartBtn = document.querySelectorAll('.add-cart');
        cartBtn.forEach((btn)=>{
            btn.addEventListener('click',addcart);
        });


    }

    // Remove Item

    function removeItem(){
        if(confirm('Are Your Sure To Remove')){
        let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
        this.parentElement.remove();
        itemList = itemList.filter(el=>el.title!=title);
        loadContent();
        updatetotal();
        };
    }

    // Change Quantity

    function changQty(){
        if(isNaN(this.value) || this.value<1){
            this.value = 1;
        }
        updatetotal();
    }

    let itemList=[];

    // Add to cart

    function addcart(){
        let food = this.parentElement;
        let title= food.querySelector('.food-title').innerHTML;
        let price= food.querySelector('.food-price').innerHTML;
        let imgSrc = food.querySelector('.food-img').src;

        //console.log(title,price,imgSrc);
        let newProduct = {title,price,imgSrc};

        // Check Product Already Excists in cart

        if(itemList.find((el)=>el.title == newProduct.title)){
            alert("Product Already Adden in Cart");
            return;
        }
        else{
            itemList.push(newProduct);
        }

        let newProductElement = createCartProduct(title, price, imgSrc);
        let cartBasket = document.querySelector('.cart-content');
        cartBasket.append(newProductElement);

        loadContent();
        updatetotal();
    }

    function createCartProduct(title,price,imgSrc){

        let cartBox = document.createElement("div");
        cartBox.classList.add("cart-box");

        cartBox.innerHTML = `
        <img src="${imgSrc}" alt="bri" class="cart-img">
        <div class="detail-box">
            <div class="cart-food-title">${title}</div>
            <div class="price-box">
                <div class="cart-price">${price}</div>
                <div class="cart-amt">${price}</div>
            </div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <ion-icon name="trash" class="cart-remove"></ion-icon>
    `;

    return cartBox;
    };

    function updatetotal(){
        const cartItems = document.querySelectorAll('.cart-box');
        const totalValue = document.querySelector('.total-price');
        
        let total = 0;

        cartItems.forEach(prduct=>{
            let priceElement = prduct.querySelector('.cart-price');
            let price = parseFloat(priceElement.innerHTML.replace('Rs.'," "));
            let qty = prduct.querySelector('.cart-quantity').value;
            total +=(price*qty);
            prduct.querySelector('.cart-amt').innerHTML = "Rs."+price*qty;
        });

        totalValue.innerHTML = "Rs." + total;

        // Add Product Count in Cart Icon
        const cartCount = document.querySelector('.product-count');
        let count = itemList.length;
        cartCount.innerHTML = count;
        if(count == 0){
            cartCount.style.display = "none";
        }
        else{
            cartCount.style.display = "inline";
        }
    }