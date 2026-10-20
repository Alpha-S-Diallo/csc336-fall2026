let products = [
    { id: 1, name: "Pro Soccer Cleats", price: 129.99, description: "Lightweight cleats that make you 0% faster but 100% more confident.", image: "cleats.png", category: "sports",selected: false},
    { id: 2, name: "High-Top Basketball Shoes", price: 149.99, description: "Guaranteed to help you get rejected at the rim in style.", image: "goofy.png", category: "sports",selected: false },
    { id: 3, name: "Leg Day Excuse Generator", price: 4.99, description: "A deck of 52 premium excuses. Never squat again.", image: "excuse.png", category: "sports",selected: false },
    { id: 4, name: "Protein Powder (Unflavored Regret)", price: 59.99, description: "25g protein per scoop. Tastes like chalk and ambition.", image: "protein.png", category: "utilities",selected: false },
    { id: 5, name: "Rubber Duck Debugger", price: 9.99, description: "Explain your bug to the duck. The duck already knows. The duck judges.", image: "rubber_duck.png", category: "utilities",selected: false },
    { id: 6, name: "Works On My Machine Sticker", price: 2.99, description: "Official certification for code that has never seen production..... Docker smh what is that ?!!?!?", image: "works.png", category: "utilities" ,selected: false},
  ];

  let products_copy = [
    { id: 1, name: "Pro Soccer Cleats", price: 129.99, description: "Lightweight cleats that make you 0% faster but 100% more confident.", image: "cleats.png", category: "sports",selected: false},
    { id: 2, name: "High-Top Basketball Shoes", price: 149.99, description: "Guaranteed to help you get rejected at the rim in style.", image: "goofy.png", category: "sports",selected: false },
    { id: 3, name: "Leg Day Excuse Generator", price: 4.99, description: "A deck of 52 premium excuses. Never squat again.", image: "excuse.png", category: "sports",selected: false },
    { id: 4, name: "Protein Powder (Unflavored Regret)", price: 59.99, description: "25g protein per scoop. Tastes like chalk and ambition.", image: "protein.png", category: "utilities",selected: false },
    { id: 5, name: "Rubber Duck Debugger", price: 9.99, description: "Explain your bug to the duck. The duck already knows. The duck judges.", image: "rubber_duck.png", category: "utilities",selected: false },
    { id: 6, name: "Works On My Machine Sticker", price: 2.99, description: "Official certification for code that has never seen production..... Docker smh what is that ?!!?!?", image: "works.png", category: "utilities" ,selected: false},
  ];
// constant
  let cart =[]
  let categories = ["all","sports","utilities"]
  let select = document.createElement("select")
  let addSelectedCart = document.createElement("button")
  let sort = document.createElement("select")
  let options = ["price:high to low","price:low to high"]
  let form = document.querySelector("#productForm")
  let KEY ="prod"
  let resetButton = document.createElement("button")
  resetButton.innerHTML= "Reset to Default"
  let ep = document.createElement("p")
  



// divs (or at least the ones that i made in html which r scoped for whole js )
  let filterDiv = document.querySelector("#filterDiv");
  let product_div = document.querySelector("#productDiv");
  let cartDiv = document.querySelector("#cartDiv");
  filterDiv.append(resetButton)


  for(let choice of options){
   let c =  document.createElement("option")
   c.innerHTML = choice
   c.value = choice
   sort.append(c)
    
  }
  sort.addEventListener("change",()=>{
    product_div.innerHTML =""
    if (sort.value === "price:high to low"){
        products.sort((a, b) => b.price - a.price)
     }
     else {products.sort((a, b) => a.price - b.price)}
     render(products)
  })
  filterDiv.append(sort)

  
 
 addSelectedCart.addEventListener("click",()=>{
    let selectedItems = products.filter(s =>s.selected === true)
    selectedItems.forEach((item)=>cart.push(item))
    products.forEach((pro)=>pro.selected = false)
    product_div.innerHTML =""
    renderList()
    render(products)
    
 })

  filterDiv.append(select)
  filterDiv.append(addSelectedCart)

function makeFilter(categories){
    for(let category of categories){
        let option= document.createElement("option")
        select.append(option)
        option.innerHTML = category
        option.value = category
    };
}

function saveProducts() {
    let jsonV = JSON.stringify(products)
    localStorage.setItem(KEY, jsonV)
}

document.addEventListener("DOMContentLoaded", (event) => {
    let localStorageData = localStorage.getItem(KEY)

    if (localStorageData !== null) {
        products = JSON.parse(localStorageData)
    }

    filter()
    render(products)
    renderList()
    makeFilter(categories)
    resetButton.addEventListener("click",()=>{
        product_div.innerHTML =""
        localStorage.removeItem(KEY)
        products = products_copy
        render(products)

    
      })
    
})

function render(products){

    products.forEach(product=>{
            let cardDiv = document.createElement("div")
            let addButton = document.createElement("button")
            let addCheckBox = document.createElement("input")
            addCheckBox.type = "checkbox"
            addCheckBox.addEventListener("change",() => {
                product.selected = addCheckBox.checked
                if(product.selected === true){
                    cardDiv.classList.add("highlight") 
            
                }
                else{
                    cardDiv.classList.remove("highlight")
                }

            renderList()

            })
                       
            cardDiv.classList.add("cardDiv")

            let name = document.createElement("p")
            let price = document.createElement("p")
            let description = document.createElement("p")
            let image = document.createElement("img")
            let category = document.createElement("p")

            name.innerHTML = product.name
            price.innerHTML = product.price
            description.innerHTML = product.description
            image.src = product.image
            category.innerHTML = product.category
            addButton.innerHTML = "Add to Cart"

            addButton.addEventListener("click", event => {
                cart.push(product)
                renderList()
            })
            cardDiv.append(addCheckBox)
            cardDiv.append(name)
            cardDiv.append(price)
            cardDiv.append(description)
            cardDiv.append(image)
            cardDiv.append(category)
            cardDiv.append(addButton)
            product_div.append(cardDiv)
        
        });
}
function renderList(){
    cartDiv.innerHTML =""
    
    let cartList = document.createElement("ul")
    let cartPrice = document.createElement("p")
    let price = total()
    let selectedItems = products.filter(s =>s.selected === true)
    cartPrice.innerHTML = price
    cartDiv.append(cartList)
    cartDiv.append(cartPrice)

    if(selectedItems.length !==0){
        addSelectedCart.innerHTML = "Add " + selectedItems.length + " Items to Cart"
        addSelectedCart.disabled = false
    }

    else{
         addSelectedCart.innerHTML = "Select Items to Add to Cart"
         addSelectedCart.disabled = true

         
    }

    cart.forEach(item => {
        let listItem = document.createElement("li")
        listItem.innerHTML = item.name + " $"+item.price
        cartList.append(listItem)
        
        
    })

    let clearButton = document.createElement("Button")
     clearButton.innerHTML = "Clear Cart"
     clearButton.classList.add("cardDiv")
     clearButton.addEventListener("click",() =>{ 
    cart = []
     renderList()}
    )
     cartDiv.append(clearButton)
}

function total(){
    let sum = 0
    let total = cart.map(item=>item.price)

    total.forEach(amount =>{sum = sum + amount
    })
    let i = cart.length

    return "Total: $" +sum+ " "  +"("  +i + " items)"
}

function filter() {
    select.addEventListener("change", (event) => {
        product_div.innerHTML = "";

        if(event.target.value =="all"){
            render(products)
        } else{
            let filtered = products.filter(item => item.category === event.target.value);       
            render(filtered)
        }     
    });
}
   


form.addEventListener("submit", (event) => {
    event.preventDefault()
    ep.innerHtml = ""
    let userFormData = new FormData(form)

    let name = userFormData.get("name")
    let price = Number(userFormData.get("price"))
    let description = userFormData.get("description")
    let image = userFormData.get("image")
    let category = userFormData.get("category")

    if(description.length <=0){
        alert("There must be a description")
        return
    }

    if(description.length <20){
        
       
        ep.innerHTML = "Description must be at least 20 letters"
        let fd = document.querySelector("#formDiv")
        fd.append(ep)  
        return   
    }

    if (name === "" || price <= 0) {
        alert("Must have a price and name")
        return
    }

    products.push({
        id: products.length + 1,
        name: name,
        price: price,
        description: description,
        image: image,
        category: category,
        selected: false
    })

    saveProducts()

    product_div.innerHTML = ""
    render(products)
    form.reset()   
})





