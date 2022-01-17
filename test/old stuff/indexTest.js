let inputL = document.querySelector(".todo-items-wrapper")
let input = document.querySelector(".new-todo-input")
const [todoN] = document.querySelector(".input")
let all = document.querySelector(".all")

let itemsLeft = document.querySelector(".itemsleft")
let itemsCompleted = document.querySelector(".completed")
let countCompleted =0
let countLeft = 0
let count = 0

//https://www.tutorialspoint.com/firebase/firebase_quick_guide.htm



input.addEventListener("submit", inputfunc)
//als je op enter drukt
function inputfunc(e){
e.preventDefault()
let obj={
    text : todoN.value,
 status : "active"
}

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
//alert zetten bij 5, 10 en 15 items todo
switch (count) {
    case 5:
        alert("lots of things needs to be done")
        break;
    case 10:
        alert("lots of things needs to be done, you better get started")
        break;
    case 15:
        alert("what the f****k, this is too much for one day")
        break;
}
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
    </div></div> <button>X</button></div>`

//console.log(doc.data().status)

 count ++

//todoItems en hun status uploaden
if(doc.data().status == "completed"){
  countCompleted ++
}else{
  countLeft = count
}
})

//updaten bij het laden van de pagina
countLeft = count - countCompleted 
itemsLeft.innerHTML = `${countLeft} items left`
itemsCompleted.innerHTML = `${countCompleted} items completed`
all.innerHTML  = `${count} totaal`

//als op deletebutton wordt gedrukt
let delBtn = document.querySelectorAll("button")
for(let i = 0; i< delBtn.length; i++){
  delBtn[i].addEventListener("click", ((j)=>{
return function (){
  delBtn[i].parentElement.remove()


  //delete item from firebase



  //update totaal, items left, completed bij deleten van een rij
   count --
  if(listItem[i].status == "active"){
   countLeft--
     all.innerHTML  = `${count} totaal`
     itemsLeft.innerHTML = `${countLeft} items left`
itemsCompleted.innerHTML = `${countCompleted} items completed`
  }else if(listItem[i].status == "completed"){
    countCompleted --
    all.innerHTML = `${count} totaal`
itemsLeft.innerHTML = `${countLeft} items left`
itemsCompleted.innerHTML = `${countCompleted} items completed`
  }

 listItem.splice(i, 0)
console.log(listItem[i].id)
let delIt = listItem[i].id

 db.collection("TodoItems").doc(delIt).delete()

}
  })(i))
}






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

