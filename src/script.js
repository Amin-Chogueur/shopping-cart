let selectedProducts=localStorage.getItem("selectedProducts") ? JSON.parse(localStorage.getItem("selectedProducts")) : [];

let products=document.getElementById("products");
let counter=document.getElementById("counter")
/* function read data */
function readData(){
    let quantitiy=0;
        let items=data.map((product)=>{
            for(let i=0;i<selectedProducts.length;i++){
                if(selectedProducts[i].id===product.id){
                     quantitiy=selectedProducts[i].quantity;
                     break;
                }else{
                    quantitiy=0
                }
            }
        return `
            <div id="${product.id}" class="product" >
                <img src=${product.image} alt="shirt">
                <div class="product-desc">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                        <div class="product-control">
                            <span class="product-price">${product.price}$</span>
                            <div class="control">
                                <button onclick=decressProduct(${product.id})  id="product-decress">-</button>
                                <span id="product-quantitiy-${product.id}">${quantitiy}</span>
                                <button onclick=incressProduct(${product.id}) id="product-incress">+</button>
                            </div>
                        </div>
                </div><!--product-desc  -->
            </div><!-- product -->
        `
        }).join("")
        products.innerHTML=items;
        getTotal()
    }
readData()

/* function incress Product */

function incressProduct(idToIncress){
    let searchItem=selectedProducts.find((item)=>item.id===idToIncress)
    if(searchItem===undefined){
        selectedProducts.push({
            "id":idToIncress,
            "quantity":1
           })
    }
    else{
        searchItem.quantity++
    }
    updateQuantity(idToIncress)
    localStorage.setItem("selectedProducts",JSON.stringify(selectedProducts))
   
}
function decressProduct(idTodecress){
    let searchItem=selectedProducts.find((item)=>item.id===idTodecress)
        if(searchItem===undefined)return;
        else if(searchItem.quantity===0 )return; 
        else{
            searchItem.quantity-=1;
        }
        updateQuantity(idTodecress)
        selectedProducts=selectedProducts.filter(product=>product.quantity!==0)
        localStorage.setItem("selectedProducts",JSON.stringify(selectedProducts))
}
function updateQuantity(idToUpdate){
    ProductToUpdate=selectedProducts.find((product)=>{
        return product.id===idToUpdate
    })
        document.getElementById(`product-quantitiy-${idToUpdate}`).innerHTML=ProductToUpdate.quantity
        getTotal()
}

/* function get total */

function getTotal(){
    let total=0
    for(let i=0;i<selectedProducts.length;i++){
        total+=selectedProducts[i].quantity
    }
    if(total<1){
        counter.style.display="none"
    }
    else{
        counter.style.display="block"
        counter.innerHTML=total
    }
    
}
