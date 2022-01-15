let inputL = document.querySelector(".todo-items-wrapper")
let input = document.querySelector(".new-todo-input")
const [todoN] = document.querySelector(".input")
let all = document.querySelector(".all")
let list = []
let itemsLeft = document.querySelector(".itemsleft")
let itemsCompleted = document.querySelector(".completed")
let countCompleted =0
let countLeft = 0
let count = 0

//https://www.tutorialspoint.com/firebase/firebase_quick_guide.htm


//FOUTEN

//bij remove "all" en "itemsleft" worden niet geupdate
//nog nakijken of deleted item heeft status "active" of "completed" en dit getal updaten
//bij delete ? firebase aanpassen !?
//LAYOUT

//TELT NIET AF bij remove
//remove //nog updaten itemsleft + all//nakijken of deleted is "active of 'completed"status
// function remove(getEl){
//     getEl.parentElement.remove()
  


  //  console.log(listItem)
//console.log(inputL)

//  for(let x= 0; x<listItem.length; x++){
   
//   if(listItem[x].status == "active"){
//     console.log("ok")
//      countLeft --
//   }else if(listItem[x].status == "completed"){
//   countCompleted--
//      countLeft = count - countCompleted
//      console.log("ajaj")
      
//   }
   
//  }
// countCompleted.innerHTML = `${countCompleted} items completed`
//   itemsLeft.innerHTML = `${countLeft} items left`
//   all.innerHTML = `${count} totaal`
// }
 

 //andere delete functie maken
//  var button = document.querySelectorAll('.button');
//  for (var i = 0; i < button.length; i++) {    
//      button[i].addEventListener('click', ((j) => {         
//      return function() {
//        alert(j)
//      }
//    })(i))
//  }
//nog andere mogelijkheid
// var nodes = document.getElementsByTagName('button');

// for (var i = 0; i < nodes.length; i++) {
//    nodes[i].addEventListener('click', function(index) {
//       console.log('You clicked element index' + index);
//    }.bind(this, i));
// }
//nod andere
//document.addEventListener('click', function (e) {
//   var target = e.target;
//   var parent = target.parentNode;
//   var index = [].indexOf.call(parent.children, target);
//   console.log("index:", index);
// });




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
//countLeft = count - countCompleted
// all.innerHTML = `${count} totaal`
// itemsLeft.innerHTML = `${countLeft} items left`
}


//data van storage nemen elke keer er iets verandert en voor elk object een uniek ID maken
db.collection("TodoItems").onSnapshot((snapshot)=>{
 inputL.innerHTML = ""
 listItem =[]
 count=0
 countCompleted = 0
 countLeft = 0
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
     <div id="${doc.id}" class="check-mark ">
      <img src="https://www.freeiconspng.com/uploads/black-check-tick-icon-4.png"
        width="25" alt="black check tick icon" />     </div></div>
     <div class="todo-item">     <p>${doc.data().text}</p>
    </div></div> <button onclick="remove(this)">X</button></div>`

//console.log(doc.data().status)

 count ++


if(doc.data().status == "completed"){
  countCompleted ++
//   countLeft = count - countCompleted 
// itemsLeft.innerHTML = `${countLeft} items left`

}else{
  countLeft = count
 // itemsLeft.innerHTML = `${countLeft} items left`
}

})
//console.log(listItem)
all.innerHTML  = `${count} totaal`
countLeft = count - countCompleted 
itemsLeft.innerHTML = `${countLeft} items left`
itemsCompleted.innerHTML = `${countCompleted} items completed`






//als je op checkmark drukt checkmark moet veranderen en in firebase moet completed
function actie(){
  let checkM = document.querySelectorAll(".check")
 //console.log(checkM)
  checkM.forEach((checkje)=>{
      checkje.addEventListener("click", function(){
        
let item = checkje.lastChild.id
//console.log(item)
//console.log(listItem[1].id)
for(let z= 0; z< listItem.length ; z++){
 if(listItem[z].id === item){
   listItem[z].status = "completed"
 
 //console.log(listItem[z].status)
 //nog in firebase zetten
  db.collection("TodoItems").doc(item).update({
    status : "completed"
  });
   
}else{
  count = 0
  countLeft = 0
}

}
  countCompleted ++
 // console.log(countCompleted)
})
  })
}
actie()
}) 

  function remove (getEl){
  getEl.parentElement.remove()
  
  console.log(listItem)//blijft 9
console.log(inputL) //na elke delete een "div" weg
}




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

