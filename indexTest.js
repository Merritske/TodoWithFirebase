let inputL = document.querySelector(".todo-items-wrapper")
let input = document.querySelector(".new-todo-input")
const [todoN] = document.querySelector(".input")
let all = document.querySelector(".all")
let list = []
let itemsLeft = document.querySelector(".itemsleft")
let count =0

input.addEventListener("submit", inputfunc)

function inputfunc(e){
e.preventDefault()
// let obj = {
// todoN : todoN.value

// }
// list.push(obj)
db.collection("TodoItems").add({
    text: todoN.value ,
    status: "active",

})

inputL.innerHTML += `<div class="todo-items">
<div class="todoItems">
<div class="check ${list.status == "completed"? "checked" : "" }">
<div data-id="${list.id}" class="check-mark">
<img
    src="https://www.freeiconspng.com/uploads/black-check-tick-icon-4.png"
    width="25" alt="black check tick icon" />

</div></div>
<div class="todo-item">
<p>${obj.todoN}</p>
</div></div> <button onclick="remove(this)">X</button></div>`

count ++
all.innerHTML = `${count} totaal`
itemsLeft.innerHTML = `${count} items left`





todoN.value =""
}

//data van storage nemen met voor elk object een uniek ID
db.collection("TodoItems").onSnapshot((snapshot)=>{
 
           snapshot.docs.forEach((doc)=>{
              
    //uniek ID maken
     list.push({
         id: doc.id,
         ...doc.data()
     } )
   
     //actie()
   
    })
 // list = storeItems 
      console.log(list)

})





switch (count) {
    case 5:
        alert("lots of things needs to be done")
        break;
    case 10:
        alert("lots of things needs to be done, you better get started")
        break;
    case 15:
        alert("what the f****k")
        break;
}


//data van storage nemen met voor elk object een uniek ID
// function getItems(){
//     db.collection("TodoItems").onSnapshot((snapshot)=>{
// let storeItems =[]
//        snapshot.docs.forEach((doc)=>{
          
// //uniek ID maken
//  storeItems.push({
//      id: doc.id,
//      ...doc.data()
//  } )
  
//  })


 //lijst in HTML zetten die opgeslagen is //werkt nog niet
// let body = document.querySelector("body")
//  body.addEventListener("load", generateItems)
// function generateItems(){
//     for(let i = 0; i< list.length; i++){
//             inputL.innerHTML = `<div class="todo-items">
//          <div class="todoItems">
//          <div class="check ${list[i].status == "completed"? "checked" : "" }">
//          <div data-id="${list[i].id}" class="check-mark ">
//          <img
//              src="https://www.freeiconspng.com/uploads/black-check-tick-icon-4.png"
//             width="25" alt="black check tick icon" />
//          </div></div>
//          <div class="todo-item">
//         <p>${list[i].text}</p>
//          </div></div> <button onclick="remove(this)">X</button></div>`
//        console.log("hello")
//          }
//           actie()
        
        
//         }
        

// console.log("hello")

// }
//  for(let i = 0; i< storeItems.length; i++){
//     inputL.innerHTML += `<div class="todo-items">
//  <div class="todoItems">
//  <div class="check ${storeItems[i].status == "completed"? "checked" : "" }">
//  <div data-id="${storeItems[i].id}" class="check-mark ">
//  <img
//      src="https://www.freeiconspng.com/uploads/black-check-tick-icon-4.png"
//     width="25" alt="black check tick icon" />
//  </div></div>
//  <div class="todo-item">
// <p>${storeItems[i].text}</p>
//  </div></div> <button onclick="remove(this)">X</button></div>`
//  //console.log(storeItems)
//  }
  //actie()
//     })

// }

//getItems();



function actie(){
    let checkM = document.querySelectorAll(".check-mark")
  //  console.log(checkM)
    checkM.forEach((checkje)=>{
        checkje.addEventListener("click", function(){
        markCompleted(checkje.dataset.id)
        
        })
    })

}
//checkmark laten zien als je erop klikt en active zetten
function markCompleted(id){
 // console.log(id)
  let item = db.collection("TodoItems").doc(id)
  item.get().then(function(doc){
if(doc.exists){ 
      // console.log(doc.data())
let status = doc.data().status;
if(status == "active"){
    item.update({
status : "completed"
    })

    }else if(status == "completed"){
        item.update({
            status: "active"
        })
    }
}
  })
}

//remove
function remove(getEl){
 getEl.parentElement.remove()

 count --
 itemsLeft.innerHTML = `${count} items left`
}


//als checkmark + delete is completed

//items left = bij remove
