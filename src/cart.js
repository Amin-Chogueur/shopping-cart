let selectedProducts=JSON.parse(localStorage.getItem("selectedProducts")) || [];

let counter=document.getElementById("counter")
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
getTotal()

let myProducts=document.getElementById("my-products");
let myproductshead=document.getElementById("my-products-head")

 /* function total bill */
  function getTotalBill(){
    let totalBill=0
   for(let i=0;i<data.length;i++){
    for(let j=0;j<selectedProducts.length;j++){
        if(data[i].id===selectedProducts[j].id){
            totalBill+=data[i].price*selectedProducts[j].quantity
            break;
        }
    }
   }
   return totalBill
 }

function read(){
    let total=getTotalBill()
    if(selectedProducts.length>=1){
       return (
        myProducts.innerHTML=selectedProducts.map((selecteditem)=>{
        let  search=data.find(item=>item.id===selecteditem.id)
        return (
            myproductshead.innerHTML=`
            <h2 id="total-bill">total bill:${total}$</h2>
            <div class="btns">
                <button onclick=checkeout()>check out</button>
                <button onclick="deletAll()">delete all</button>
            </div>
            `,
        `
        <div  class="my-product" >
            <img src=${search.image}>
            <div class="my-product-desc">
                <h3>${search.title}</h3>
                <span class="my-product-price">${search.price}$</span>
                <p id="total-price-${search.id}">Total: ${selecteditem.quantity*search.price}$</p>
                    <div class="my-product-control">
                        <div class="control">
                            <button id="product-decress"  onclick=decressProduct(${search.id})>-</button>
                            <span id="product-quantitiy-${search.id}">${selecteditem.quantity}</span>
                            <button id="product-incress" onclick=incressProduct(${search.id})>+</button>
                        </div>
                    </div>
                    <button onclick="delet(${search.id})">delete</button>
            </div><!--product-desc  -->
        </div><!-- product -->
    `
    )}).join(""))
    }
    else{
        return( 
                myProducts.innerHTML="",
                myproductshead.innerHTML=`
        <h2 >your cart is empty </h2>
        <div class="btns">
        <a href="./index.html">back to clothing store</a>
        </div>
    `)
    }
}
read()
/* function decress Product */

function decressProduct(idToDn){
    let searchItem=selectedProducts.find((item)=>item.id===idToDn)
    if(searchItem===undefined)return;
    else if(searchItem.quantity===0 ) return; 
    else{
            searchItem.quantity-=1;
    }
    updateQuantity(idToDn)
    selectedProducts=selectedProducts.filter(product=>product.quantity!==0)
    read()
    localStorage.setItem("selectedProducts",JSON.stringify(selectedProducts))
    
}
/* function incress Product */
function incressProduct(idToIN){
    let search=selectedProducts.find(item=>item.id===idToIN)
    search.quantity+=1
    updateQuantity(idToIN)
    localStorage.setItem("selectedProducts",JSON.stringify(selectedProducts))
    read()
}
/* function update Product */
function updateQuantity(idToUpdate){
    ProductToUpdate=selectedProducts.find((product)=>{
        return product.id===idToUpdate
    })
        document.getElementById(`product-quantitiy-${idToUpdate}`).innerHTML=ProductToUpdate.quantity
        getTotal()
        getTotalBill()
}

/* function delete product */

function delet(id){
    selectedProducts=selectedProducts.filter(item=>item.id!==id)
    localStorage.setItem("selectedProducts",JSON.stringify(selectedProducts))
    getTotal()
    read()
}
/* function delete all product */

function deletAll(){
    localStorage.clear()
    selectedProducts=[]
    getTotal()
    read()
}

/* function check out */
let cancel=document.getElementById("cancel-btn")
let over=document.getElementById("over")
function checkeout(){
    over.style.display="block"
}
cancel.onclick=function(){
    over.style.display="none"
}

