const myCart = {
    cart: [
       {
            "sku": "00001",
            "image": "https://sky-static.mavi.com/sys-master/maviTrImages/h31/h6f/9923938648094",
            "productTitle": "Erkek Ceket",
            "price": {
                "defaultPrice": "20",
                "colorIndex": {
                    'green': "0",
                    'red': "5",
                    'blue': "10"
                },
                "sizeIndex": {
                    'S': "15",
                    'M': "20",
                    'L': "30",
                    'XL': "40"
                }
            },
            "selected": ['blue', 'XL'],
            "colors": ['red', 'green', 'blue'],
            "sizes": ['S', 'M', 'L', 'XL'],
            "quantity": 2,
        },
       {
            "sku": "00002",
            "image": "https://sky-static.mavi.com/sys-master/maviTrImages/h31/h6f/9923938648094",
            "productTitle": "Kadın Ceket",
            "price": {
                "defaultPrice": "15",
                "colorIndex": {
                    'green': "0",
                    'red': "5",
                    'blue': "10"
                },
                "sizeIndex": {
                    'S': "15",
                    'M': "20",
                    'L': "30",
                    'XL': "40"
                }
            },
            "selected": ['red', 'S'],
            "colors": ['red', 'green', 'blue'],
            "sizes": ['S', 'M', 'L', 'XL'],
            "quantity": 4,
        },
    ],
    init: () => {
        myCart.generateCartHTML();
        myCart.generateTotals();
    },
    generateCartHTML: () => {
        document.querySelector(".cart-wrapper").innerHTML = null;
        myCart.cart.map((cartItem) => {
            let htmlProductPrice = '<div id="price'+cartItem.sku+'" class = "products-price "><p>' + cartItem.price.defaultPrice + ' TL</p></div>'
            //Products Size
            let htmlTextSize = '<div class = "text-size"><p>Size</p></div>'
            let htmldmSizeActive = ' <div class="dm-size active" onClick="myCart.updateSelectedSizes(this,`'+cartItem.sku+'`)"><span>' + cartItem.sizes[0] + '</span></div>' + ' <div class="dm-size" onClick="myCart.updateSelectedSizes(this, `'+cartItem.sku+'`)"><span>' + cartItem.sizes[1] + '</span></div>' + ' <div class="dm-size" onClick="myCart.updateSelectedSizes(this, `'+cartItem.sku+'`)"><span>' + cartItem.sizes[2] + '</span></div>' + ' <div class="dm-size" onClick="myCart.updateSelectedSizes(this,`'+cartItem.sku+'`)"><span>' + cartItem.sizes[3] + '</span></div>'
            let htmlChooseSize = '<div class = "choose-size '+cartItem.sku+'">' + htmldmSizeActive + '</div>'
            let htmlProductSize = '<div class = "products-size">' + htmlTextSize + htmlChooseSize + '</div>'
            //Products Color
            let htmlInput1 = '<input id="'+cartItem.colors[0] +'" type="radio" name="'+cartItem.sku+'" value="'+cartItem.price.colorIndex.red+'" onClick="myCart.updateColors(this,`'+cartItem.sku+'`,`'+cartItem.price.colorIndex.red+'`)">'
            let htmlInput2 = '<input id="'+cartItem.colors[1] +'" type="radio" name="'+cartItem.sku+'" value="'+cartItem.price.colorIndex.green+'" onClick="myCart.updateColors(this,`'+cartItem.sku+'`,`'+cartItem.price.colorIndex.green+'`)">'
            let htmlInput3 = '<input id="'+cartItem.colors[2] +'" type="radio" name="'+cartItem.sku+'" value="'+cartItem.price.colorIndex.blue+'" onClick="myCart.updateColors(this,`'+cartItem.sku+'`,`'+cartItem.price.colorIndex.blue+'`)">'
            let htmlColorSecond = '<div class="color-second">' + htmlInput1 + htmlInput2 + htmlInput3 + '</div>'
            let htmlColorFirst = '<div class="color-first"><p>Color</p></div>'
            let htmlProductsColor = '<div class="products-color">' + htmlColorFirst + htmlColorSecond + '</div>'
            //Products Header
            let htmlProductsHeader = '<div class="products-header"><p>' + cartItem.productTitle + '</p></div>'
            // Products Text
            let htmlProductsText = '<div class="products-text">' + htmlProductsHeader + htmlProductsColor + htmlProductSize + htmlProductPrice + '</div>'
            // Products Image
            let htmlProductsImage = '<div class="products-image"><img src="' + cartItem.image + '"></div>'
            //Products Counter
            let htmltotalCount = '<div id="'+cartItem.sku+'">' + cartItem.quantity + '</div><i class=" decrement-count fa-regular fa-square-minus" onClick = myCart.updateQuantity("","'+cartItem.sku+'")></i>'
            let htmlProductsCounter = '<div class="products-counter"><i class="increment-count fa-regular fa-square-plus" onClick = myCart.updateQuantity("add","'+cartItem.sku+'")></i>' + htmltotalCount + '</div>'
            //Product
            htmlProduct = '<div class="product">' + htmlProductsImage + htmlProductsText + htmlProductsCounter + '</div>'
            let htmlCartWrapper = document.querySelector(".cart-wrapper");
            htmlCartWrapper.innerHTML += htmlProduct;

        })
    },
    generateTotals: (sku) => {
        let total = myCart.cart.filter(cartItem => cartItem.sku === sku);
        let colorName = total[0].selected[0];
        let sizeName = total[0].selected[1];
        let colorPrice = parseInt(total.map(item=>item.price.colorIndex[colorName]));
        let sizePrice = parseInt(total.map(item=>item.price.sizeIndex[sizeName]));
        let productCounter = total[0].quantity;
        let totalSum = (colorPrice+sizePrice)*productCounter;
        document.getElementById('price'+sku).innerHTML = "<p>"+totalSum+" TL</p>";
        myCart.subTotals();
    },
    subTotals: () =>{
        let arrayPrice = [];
        let dogukan = document.querySelectorAll(".products-price");
        for(let i =0;i<myCart.cart.length;i++){
            arrayPrice.push(parseInt(dogukan[i].innerText.replace(' TL','')));
        }        
        const sum = arrayPrice.reduce((accumulator, value) => {
            return accumulator + value;
          }, 0);
        document.querySelector(".totalprice").innerHTML = "<p>"+sum+" TL</p>";
    },
    removeItemFromCart: (sku) =>{
      myCart.cart = myCart.cart.filter(cartItem => cartItem.sku !== sku);
    },
    updateQuantity: (type, sku) => {
        let foundItem = myCart.cart.find(item =>item.sku===sku);
        let others = myCart.cart.filter(item =>item.sku!==sku);    
        let oldCount = foundItem.quantity;
        if(type === "add"){
            newCount = oldCount + 1; 
            
        }else{
            newCount = oldCount - 1;
            if(newCount<=0){
                myCart.removeItemFromCart(sku);
                myCart.generateCartHTML();
            }
        }
        document.getElementById(sku).innerHTML = newCount;       
       
   
        foundItem.quantity = newCount;
        myCart.cart = [...others, foundItem];       
        
        myCart.generateTotals(sku);
    },

    updateSelectedSizes: (e, sku) => {
      let sizeChange = document.querySelectorAll(".dm-size")
      for(let i = 0; i<sizeChange.length;i++){
       if(sizeChange[i].parentElement.classList[1]===sku){
         sizeChange[i].classList.remove("active")
      }
      e.classList.add("active");
    }
    let a = myCart.cart.filter(item => item.sku === sku)
        a[0].selected[1] = e.innerText
     myCart.generateTotals(sku);
    },
    updateColors: (e,sku, price) => {
        const selectColor = document.querySelector('input[name="'+sku+'"]:checked').id;
        let b = myCart.cart.filter(item => item.sku === sku);
        b[0].selected[0] = e.id 
        myCart.generateTotals(sku);
    },

}

myCart.generateCartHTML();
myCart.updateQuantity();
myCart.updateSelectedSizes();
myCart.updateColors();
myCart.generateTotals();
myCart.subTotals();