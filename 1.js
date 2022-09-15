const productDiv = document.getElementById("products");
const cartcont = document.querySelector(".cart-cont");
const cart = document.querySelector(".cart");
const icon = document.querySelector("#count");
const close= document.querySelector(".fa-x");
const username=document.querySelector(".username");
const logged=document.getElementById("logged-nav");
const unlogged=document.getElementById("unlogged-nav");
const form=document.getElementById("search")
const btn=document.querySelector(".search-icon")
const search=document.getElementById("search-inp")
const searchResult=document.querySelector(".search-result")

let count =0


let cartarr = [];

if(localStorage.name){
logged.style.display="block"
  unlogged.style.display="none"
  
} 
else {    logged.style.display="none"
  unlogged.style.display="block"  
}

username.innerHTML=localStorage.name||"guest"

icon.onclick = () => {
  cartcont.classList.add("active");
  document.body.classList.add("active");

}


close.onclick = () => {
  cartcont.classList.remove("active");
  document.body.classList.remove("active");
};
class Products {
  async fetched() {
    try {
      const response = await fetch("products.json");
      const data = await response.json();
      let products = data.items;
      products = products.map((product) => {
        const { title, price } = product.fields;
        const { id } = product.sys;
        const image = product.fields.image.fields.file.url;
        return { title, price, id, image };
      });

      return products;
    } catch (err) {
      console.log(err);
    }
  }
}

class Storage {
  static addingtolocal = (c) => {
    localStorage.setItem("product", JSON.stringify(c));
  };
  static addingcarttolocal = (c) => {
    localStorage.setItem("cart", JSON.stringify(c));
  };
  static gettingcarttolocal = (c) => {
    return localStorage.cart ? JSON.parse(localStorage.cart) : []; //محتاجة ريترن عشان لما استدعيها تجبلي خرج لكن اللي فوق  بيعماو
  };
  static itemdetails=()=>{
    [...document.querySelectorAll(".content")].forEach(item=>{
      item.addEventListener("click",(e)=>{
        if(e.target.classList.contains("details")){
        localStorage.setItem("itemDetails",e.target.parentElement.parentElement.parentElement.id)}
      })
    })
      }
      static itemdetailsfromsearch=()=>{
        [...document.querySelectorAll(".search-result-parts")].forEach(item=>{
          item.addEventListener("click",(e)=>{
        
              console.log(e.target.id)
            localStorage.setItem("itemDetails",e.target.id)
            location="itemdetails.html"
          })
        })
          }
}
if (localStorage.cart) {
  cartarr = Storage.gettingcarttolocal();
} else {
  cartarr = [];
}
class ShowDATA {
  showdata = (x) => {
    for (let i = 0; i < x.length; i++) {
      let xx = `<div  class="pro" id=${x[i].id}>
<button class="to-cart"data-id=${x[i].id} >
<i class="fa-solid fa-cart-shopping"></i>add to cart</button>
<img src=${x[i].image}>
<div class="content">
<span > <a   href="itemdetails.html"class="details">${x[i].title}</a></span>
<span> $${x[i].price}</span></div>
</div>`;
// 
      productDiv.insertAdjacentHTML("beforeend", xx);
    }

  };
  static setvalues(arr) {
    let count = 0;

    let total = 0;
    arr.map((e) => {
      count += e.mount;
      total += e.price * e.mount;
    });
    icon.innerHTML = `${count}`;
    document.getElementById("total").innerHTML = `Total price:$ ${parseFloat(total.toFixed(2))}`;
  }

  static cartdata(x) {
    cart.innerHTML = "";

    for (let i = 0; i < x.length; i++) {
      let xx = `<div  class="show-cart" id=${x[i].id}>
       
        <img src=${x[i].image}>
        <div class="content">
        <span> ${x[i].title}</span>
        <span> $${x[i].price}</span>
        <span class="del" data-id=${x[i].id}> remove</span>
        </div>
        <div id="arrows" data-id=${x[i].id}>
       
        <i class="fa-solid fa-arrow-up"></i>
        <span id="mount">${x[i].mount}</span>
         <i class="fa-solid fa-arrow-down"></i>
        </div>
        </div>`;

      cart.insertAdjacentHTML("afterbegin", xx);
    }
    cart.classList.add("active");
    document.body.classList.add("active");
    s.delete(x);
    s.deleteAll(x);
    s.mountfunction(x);
    ShowDATA.setvalues(x)
  }
  delete = (x) => {
    document.querySelectorAll(".show-cart").forEach((ele, index) => {

      ele.addEventListener("click", (e) => {
        const id=e.target.dataset.id
        if (e.target.classList.contains("del")) {
          cartarr = x.filter((e, i) => e.id!= id);
          Storage.addingcarttolocal(cartarr); //   x.splice(i,1)

          ShowDATA.cartdata(cartarr);



         const removedfromcart=   [...document.querySelectorAll(".to-cart")].find(button => 

   button.dataset.id==id)

   if(removedfromcart){       
        removedfromcart.innerHTML = "add to cart";
        removedfromcart.disabled = false;}        
        
      };
               }
      );
    });
  };

  
  deleteAll = (x) => {
    const clear = document.querySelector(".clear");

    clear.addEventListener("click", () => {
      cartarr = x.filter((e) => e.id == "jc;hkidf");
      Storage.addingcarttolocal(cartarr); 

      ShowDATA.cartdata(cartarr);

      buttons = [...document.querySelectorAll(".to-cart")].forEach((button) => {
       
        button.innerHTML = "add to cart";
        button.disabled = false;
       
      
    });
   }) 

};
  mountfunction = (x) => {
    const mounts = document.querySelectorAll("#arrows");
    mounts.forEach((e) =>
      e.addEventListener("click", (e) => {

        const id = e.target.parentElement.dataset.id;
        const g = x.find((e) => e.id == id);

        if (g) {
          if (e.target.classList.contains("fa-arrow-up")) {
            g.mount += 1;
          } else if(e.target.classList.contains("fa-arrow-down")){

            if(g.mount<=0)return;
           
                g.mount -= 1;         
           
          }
        }
        Storage.addingcarttolocal(cartarr); 
        ShowDATA.cartdata(cartarr);
      })
  
    );

  
  };

  static search(products){


search.addEventListener("keyup",(e)=>{
  const x=e.target.value
 
const k = products.filter(product=> product.title.includes(x));
// ShowDATA.downSearch()

searchResult.innerHTML="";
if(k){
  k.forEach(e=>  searchResult.innerHTML+=`<a  href="itemdetails.html" class="search-result-parts  " id=${e.id}>${e.title}</a>`  
     )

    }

  if(e.target.value==""){
    searchResult.innerHTML=""

//    s.showdata(products);
// ShowDATA. cartFunction(products)
   
 } 
    Storage.itemdetailsfromsearch()

 ShowDATA.hover()


})
   

  }

  static cartFunction(products){
   const buttons = [...document.querySelectorAll(".to-cart")];

    buttons.forEach((button) => {
      ShowDATA.cartdata(cartarr);

      const incart = cartarr.find((item) => item.id == button.dataset.id);
      if (incart) {
        button.innerHTML = "in cart";
        button.disabled = true;
      }
      button.addEventListener("click", (e) => {
        if(e.target.classList.contains("to-cart")){
        if(localStorage.name==null){
       location="login.html"
            
          }
          else {    
        
            const m = { ...products.find((e) => e.id == button.dataset.id), mount: 1 };
        cartarr = [...cartarr, m];
        cartcont.classList.add("active");

        ShowDATA.cartdata(cartarr);
        e.target.innerHTML = "in cart";
        e.target.disabled = true;
        Storage.addingcarttolocal(cartarr);  }

      } });
    });
  }

  static hover(){
[...document.querySelectorAll(".search-result-parts")].forEach(e=>{
    e.addEventListener("mouseover",()=>{
      search.value=e.innerText

  } )
//   e.addEventListener("click",(e)=>{
//     if(e.target.classList.contains(""))
//     console.log(e.target)
//     localStorage.itemDetails=e.target.id
//     // search.value=e.innerText
// } )

 }) }


//  static downSearch(){  
//    search.addEventListener("keyup",(e)=>{
//      e.preventDefault()
//      if(e.keyCode==40){  
//        console.log(count)
       
//             const filteredArr= [...document.querySelectorAll(".search-result-parts")]
//             filteredArr.forEach(e=>e.classList.remove("actived")    ) 
//             filteredArr[count].classList.add("actived")
            
//           }
//           // filteredArr.forEach(e=>{
            
            
//             count+=1
//   // }      )
// } )
//  }
  static clicksearch(products){


    form.addEventListener("click",(e)=>{
      e.preventDefault()
      if(e.target.classList.contains('search-icon') ){
      let x=search.value.trim().toLowerCase()
    
    const k = products.filter(product=> product.title.includes(x));
    
    if(k){
      productDiv.innerHTML="";
    
      s.showdata(k);  
    ShowDATA. cartFunction(k)
    search.value=""
    searchResult.innerHTML=""
    
    }
    
      if(x==""){
        productDiv.innerHTML=""
    
       s.showdata(products);
    ShowDATA. cartFunction(products)
    
  }
    

    }
    
    
    })
    }
}

x = new Products();
m = new ShowDATA();
mm = new ShowDATA();
s = new ShowDATA();
x.fetched()
  .then((products) => {

    Storage.addingtolocal(products);
    m.showdata(products);
    ShowDATA. cartFunction(products)
    Storage.itemdetails(products)
    ShowDATA.search(products);
    ShowDATA. clicksearch(products)

    
  });






