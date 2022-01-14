let inputL = document.querySelector(".todo-items-wrapper")
let input = document.querySelector(".new-todo-input")
const [todoN] = document.querySelector(".input")
let all = document.querySelector(".all")
let list = []
let itemsLeft = document.querySelector(".itemsleft")
let count =0


//https://www.tutorialspoint.com/firebase/firebase_quick_guide.htm



//remove
function remove(getEl){
 getEl.parentElement.remove()
 count --
 itemsLeft.innerHTML = `${count} items left`
}

input.addEventListener("submit", inputfunc)
//als je op enter drukt
function inputfunc(e){
e.preventDefault()
let obj={
    text : todoN.value,
 status : "active"
}
//obj in lijst zetten
list.push(obj)
//obj in firebase opslaan
db.collection("TodoItems").add(obj)

//invoegen in HTML Als dit blijft staan wordt er telkens dubbele invoer gedaan als er een nieuw item toegevoegd wordt
// inputL.innerHTML +=`<div class="todo-items">
// <div class="todoItems">
// <div class="check ">
// <div class="check-mark">
//  <img src="https://www.freeiconspng.com/uploads/black-check-tick-icon-4.png"
//     width="25" alt="black check tick icon" />
// </div></div>
//  <div class="todo-item">
//  <p>${obj.text}</p>
// </div></div> <button onclick="remove(this)">X</button></div>`

todoN.value =""

count ++
all.innerHTML = `${count} totaal`
itemsLeft.innerHTML = `${count} items left`
}


//data van storage nemen elke keer er iets verandert en voor elk object een uniek ID maken
db.collection("TodoItems").onSnapshot((snapshot)=>{
 inputL.innerHTML = ""
 let listItem =[]
    snapshot.docs.forEach((doc)=>{
 
    //uniek ID maken
   listItem.push({
         id: doc.id,
         ...doc.data()
    } )
//console.log(doc.data())


inputL.innerHTML += `<div class="todo-items">
    <div class="todoItems">
    <div class="check ${doc.data().status == "completed"? "checked" : "" }">
     <div data-id="${doc.id}" class="check-mark ">
      <img src="https://www.freeiconspng.com/uploads/black-check-tick-icon-4.png"
        width="25" alt="black check tick icon" />     </div></div>
     <div class="todo-item">     <p>${doc.data().text}</p>
    </div></div> <button onclick="remove(this)">X</button></div>`

    
})
console.log(listItem)





actie()
//nog specifiek id zoeken van de checkmark waar je opdrukt//in de for loop
function actie(){
    let checkM = document.querySelectorAll(".check")
  //  console.log(checkM)

   checkM.forEach((checkje)=>{
        checkje.addEventListener("click", function(){
      //  markCompleted(checkje.id)
     
      for(let x = 0; x<listItem.length; x++){
          if(listItem[x].status === "active"){
            //  db.collection("TodoItems").update({status: "completed"})
            console.log("almost")
          }else{
              console.log("koekoek")
          }
      }
    })
})
}

})

// console.log(listItem)
//   item.get().then(function(doc){
// if(doc.exists){ 
      
// let status = doc.data().status;
// if(status == "active"){
//     item.update({
// status : "completed"
//     })

//     }else if(status == "completed"){
//         item.update({
//             status: "active"
//         })
//     }
// }
//   })
//       console.log("hello")
//         })
//   })

//  }

// })


//CHECKMARK + STATUS WIJZIGEN IN FIREBASE

    // let checkM = document.querySelectorAll(".check")
    // checkM.addEventListener("click", actie(this))
    // function actie(this) {
    //   db.collection.update({
    //     status : "completed"
    // })
    // }



// // //checkmark laten zien als je erop klikt en active zetten
// function markCompleted(){
 
//   let item = db.collection("TodoItems").doc.data(id)

//   item.get().then(function(doc){
// if(doc.exists){ 
      
// let status = doc.data().status;
// if(status == "active"){
//     item.update({
// status : "completed"
//     })

//     }else if(status == "completed"){
//         item.update({
//             status: "active"
//         })
//     }
// }
//   })
// }




// //als checkmark + delete is completed

// //items left = bij remove



//alert zetten bij 5, 10 en 15 items todo
// switch (count) {
//     case 5:
//         alert("lots of things needs to be done")
//         break;
//     case 10:
//         alert("lots of things needs to be done, you better get started")
//         break;
//     case 15:
//         alert("what the f****k")
//         break;
// }

