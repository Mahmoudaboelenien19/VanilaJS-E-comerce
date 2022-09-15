cont=document.querySelector(".detail-container")

product=JSON.parse(localStorage.product)
let detailsFunction=(x)=>{
   cont.innerHTML=  `<div  class="detail-page centered" >

    <img src=${x.image}>
    <div class="content centered">
    <span class="details centered"> ${x.title}</span>
    <span> $${x.price}</span>
    <button class="to-cart" >
<i class="fa-solid fa-cart-shopping"></i>add to cart</button>
    </div>`
   
    }
if(localStorage.itemDetails){
    idOfProduct=+(localStorage.itemDetails)
    detailsItem=product.find(item=>item.id==idOfProduct)
    detailsFunction(detailsItem)}


