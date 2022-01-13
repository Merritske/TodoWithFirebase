let inputL = document.querySelector(".todo-items-wrapper")
let input = document.querySelector(".new-todo-input")
const [todoN] = document.querySelector(".input")
let all = document.querySelector(".all")
let list = []

let count =0

input.addEventListener("submit", inputfunc)

function inputfunc(e){
e.preventDefault()
let obj = {
todoN : todoN.value
}
list.push(obj)


inputL.innerHTML += `<div class="todo-items">
<div class="todoItems">
<div class="check">
<div class="checked">
<img
    src="https://www.freeiconspng.com/uploads/black-check-tick-icon-4.png"
    width="25" alt="black check tick icon" />

</div></div>
<div class="todo-item">
<p>${obj.todoN}</p>
</div></div> <button onclick="remove(this)">X</button></div>`

count ++
all.innerHTML = `${count} totaal`

db.collection("TodoItems").add({
    text: todoN.value ,
    status: "active"
})
todoN.value =""

}

//data van storage nemen met voor elk object een uniek ID
function getItems(){
    db.collection("TodoItems").onSnapshot((snapshot)=>{
let storeItems =[]
       snapshot.docs.forEach((doc)=>{
          
//uniek ID maken
 storeItems.push({
     id: doc.id,
     ...doc.data()
 } )
  
 })
 //lijst in HTML zetten die opgeslagen is
 for(let i = 0; i< storeItems.length; i++){
    inputL.innerHTML += `<div class="todo-items">
 <div class="todoItems">
 <div class="check">
 <div data-id="${storeItems[i].id}" class="checked">
 <img
     src="https://www.freeiconspng.com/uploads/black-check-tick-icon-4.png"
    width="25" alt="black check tick icon" />
 </div></div>
 <div class="todo-item">
<p>${storeItems[i].text}</p>
 </div></div> <button onclick="remove(this)">X</button></div>`
console.log(storeItems) 
 }
  actie()
    })

}

getItems();

// document.addEventListener("DOMContentLoaded", generateItems)
// function generateItems(){


// console.log("hello")

// }

function actie(){
    let checkM = document.querySelectorAll(".checked")
    console.log(checkM)
    checkM.forEach((checkje)=>{
        checkje.addEventListener("click", function(){
        markCompleted(checkje.dataset.id)
        })
    })

}
function markCompleted(id){
 // console.log(id)
  let item = db.collection("TodoItems").doc(id)
}

//remove
function remove(getEl){
 getEl.parentElement.remove()
let itemsLeft = document.querySelector(".itemsleft")
 count --
 itemsLeft.innerHTML = `${count} items left`
}
//checkmark laten zien als je erop klikt en active zetten

// function checkM (){
//   let checkmark = document.querySelectorAll(".checked")
//     console.log("hello")
// checkmark.classList.toggle("checkje")

// }


// function checkM (){
//     var check = document.getElementById("checkje")
//     if(check.style.visibility == "hidden"){
//         check.style.visibility = "visible"
//     }else if(check.style.visibility == "hidden"){
//         check.style.visibility ="hidden"
//     }
// }
// function checkM() {
//   var x = document.getElementsByClassName("checked");
//   if (x.style.visibility === "hidden") {
//     x.style.visibility = "visible";
//   } else {
//     x.style.visibility = "hidden";
//   }
// }
// function checkM() {
//   var element = document.getElementsByClassName("checked");
//   element.innerHTML = `
//   <img
//       src="https://www.freeiconspng.com/uploads/black-check-tick-icon-4.png"
//       width="25" alt="black check tick icon" />
  
//  `
// }
// function checkM(){
//   let x = document.querySelectorAll("img")
//   x.style.display = "none"
//   console.log("hello")
// }
// let x = document.querySelectorAll(".check")
// x.addEventListener("click", function(){
//   x.innerHTML += ` <img
//      src="https://www.freeiconspng.com/uploads/black-check-tick-icon-4.png"
//       width="25" alt="black check tick icon" />
//     `
//     console.log("hello")
// })
//als checkmark + delete is completed

//items left = bij remove



