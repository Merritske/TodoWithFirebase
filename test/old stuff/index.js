let inputL = document.querySelector(".todo-items-wrapper")
let input = document.querySelector(".new-todo-input")
const [todoN] = document.querySelector(".input")
let all = document.querySelector(".all")

let itemsLeft = document.querySelector(".itemsleft")
let itemsCompleted = document.querySelector(".completed")
let countCompleted = 0
let countLeft = 0
let count = 0

//https://www.tutorialspoint.com/firebase/firebase_quick_guide.htm

//https://www.javascripttutorial.net/javascript-fetch-api/

//NOG DOEN

//delete All nog activeren => modal box:alert : are you sure




//LAYOUT
//kleuren
//deletebtn
//modalvenster nog layouten - kleuren - grootte




//automatische slideshow bovenaan
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 5000); // Change image every 5 seconds
}

//input items
input.addEventListener("submit", inputfunc)
//als je op enter drukt
function inputfunc(e) {
  e.preventDefault()
  let obj = {
    text: todoN.value,
    status: "active",
    actief: "off"
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

  todoN.value = ""

  count++
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
db.collection("TodoItems").onSnapshot((snapshot) => {
  inputL.innerHTML = ""
  listItem = []
  count = 0
  countCompleted = 0
  countLeft = 0

  snapshot.docs.forEach((doc) => {

    //uniek ID maken
    listItem.push({
      id: doc.id,
      ...doc.data()
    })
    //console.log(doc.data())

    inputL.innerHTML += `<div class="todo-items">
    <div class="todoItems">
    <div class="check ${doc.data().status == "completed" ? "checked" : ""}">
     <div id="${doc.id}" class="check-mark ">
      <img src="https://www.freeiconspng.com/uploads/black-check-tick-icon-4.png"
        width="25" alt="black check tick icon" />     </div></div>
     <div class="todo-item">     <p id="${doc.id}">${doc.data().text}</p>
    </div></div> <button class="delBtn" >X</button></div>`

    //console.log(doc.data().status)

    count++

    //todoItems en hun status uploaden
    if (doc.data().status == "completed") {
      countCompleted++
    }
//actieve items uploaden

// let toDoAct = document.querySelectorAll("p")
// let actiefItem = 0
// toDoAct.forEach((actfoc)=>{
//    //  let actFocId = toDoAct.id 
//    if(doc.data(actfoc).actief == "on"){   
//       console.log(doc.data(actfoc)) 
//   for (let j = 0; j< listItem.length; j++){

//    if(listItem[j].text == doc.data(actfoc).text){
    
// //console.log(listItem)
//    //  console.log(toDoActAll)
//    actfoc.parentElement.parentElement.parentElement.style.backgroundColor== "aqua";
//   actiefItem ++
//   }
// }
//   }

//   })
  })
  

  //Als je op een item drukt =>actief //werkt nog niet
  let toDoAct = document.querySelectorAll("p")
let actief = document.querySelector(".actief")
let actiefItem = 0
  toDoAct.forEach((actfoc)=>{
    actfoc.addEventListener("click", function(){

console.log(actfoc.id)
//corresponderende listItem zoeken
for (let i = 0; i< listItem.length; i++){
  if(listItem[i].id == actfoc.id){
    let actFocId = actfoc.id
    if(actfoc.parentElement.parentElement.parentElement.style.backgroundColor == "aqua" ){


    actfoc.parentElement.parentElement.parentElement.style.backgroundColor= "#666"
    actfoc.style.color = "#eee"

db.collection("TodoItems").doc(actFocId).update({
  actief: "off"
});
 
   actiefItem --
   }else if(actfoc.parentElement.parentElement.parentElement.style.backgroundColor != "aqua"){

  
    // console.log(doc.data(actfoc).actief)
actiefItem ++
   
     actfoc.parentElement.parentElement.parentElement.style.backgroundColor = "aqua"
   actief.style.color = "aqua"
    actfoc.style.color = "black"

  // db.collection("TodoItems").doc(actFocId).update({
  //     actief: "on"
  //   }); 

   } 

  if(actiefItem == 0){
   actief.style.color = "#999"
}else{
  actief.style.color = "aqua"
}
  }


}




})

})



  //updaten bij het laden van de pagina
  countLeft = count - countCompleted
  itemsLeft.innerHTML = `${countLeft} items left`
  itemsCompleted.innerHTML = `${countCompleted} items completed`
  all.innerHTML = `${count} totaal`

     


  //als op deletebutton wordt gedrukt "X"
  
  let delBtn = document.querySelectorAll(".delBtn")
  //console.log(delBtn)
  for (let i = 0; i < delBtn.length; i++) {

    delBtn[i].addEventListener("click", ((j) => {

      let cancelBtn = document.querySelector(".cancelbtn")
      let deleteBtn = document.querySelector(".deletebtn")
      let clearfix = document.querySelector(".clearfix")

      return function () {

        console.log(listItem[i].id)
        console.log(delBtn[i].parentElement)
        if (listItem[i].status == "active") {
          // Get the modal
          var modal = document.querySelector(".modal");
          modal.style.display = "block"


          clearfix.addEventListener("click", function (event) {
            if (event.target == cancelBtn) {
              modal.style.display = "none";
            } else if (event.target == deleteBtn) {

              delBtn[i].parentElement.remove()
              count--
              countLeft = count - countCompleted
              all.innerHTML = `${count} totaal`
              itemsLeft.innerHTML = `${countLeft} items left`
              itemsCompleted.innerHTML = `${countCompleted} items completed`


              let delIt = listItem[i].id
              console.log(listItem[i].id)
              //delete item from firebase
              db.collection("TodoItems").doc(delIt).delete()
              modal.style.display = "none"

              listItem.splice(i, 1)
              console.log(listItem)
              delBtn = []
              listItem = []
              console.log(i)
            }


           // console.log(listItem)
          })


        } else if (listItem[i].status == "completed") {
          delBtn[i].parentElement.remove()
          count--
          countCompleted--
          all.innerHTML = `${count} totaal`
          itemsLeft.innerHTML = `${countLeft} items left`
          itemsCompleted.innerHTML = `${countCompleted} items completed`

          let delIt = listItem[i].id
          //delete item from firebase
          db.collection("TodoItems").doc(delIt).delete()
          listItem.splice(i, 1)
          //console.log(listItem)

          delBtn = 0

        }
      }
    })())
  }


  //als je op checkmark drukt checkmark moet veranderen en in firebase moet completed
  function actie() {
    let checkM = document.querySelectorAll(".check")
    //console.log(checkM)

 


    checkM.forEach((checkje) => {
      checkje.addEventListener("click", function () {
         //
            //  actief.style.color = "#999"
         //
        let item = checkje.lastChild.id
        //console.log(item)
        //console.log(listItem[1].id)
        for (let z = 0; z < listItem.length; z++) {
          if (listItem[z].id === item) {
            if (listItem[z].status == "completed" )  {
              listItem[z].status = "active";
              db.collection("TodoItems").doc(item).update({
                status: "active"
              }); 
           
            } else if (listItem[z].status == "active" ) {
              listItem[z].status = "completed";
              toDoAct[z].style.backgroundColor = "blue"
              db.collection("TodoItems").doc(item).update({
                status: "completed"
              });

          
          } else {
            count = 0
            countLeft = 0 
        
            
          }



        }
        countCompleted++
   //  console.log(toDoAct) = nodelist
     //console.log(listItem) = array



        // console.log(countCompleted)
    }
    })
  })
}
  // switch(countCompleted){
  // case 3:
  //   alert("Time for a break")
  //   break;
  //   case 6:
    
  //     alert(`Still ${countLeft} items left to do`)
  //     break;
  //     case 9:
  //       alert(`Don't give up, you are almost there, ${countLeft} items to do`)
  //       break;
  //       case count:
  //         alert("Good job! You finished the whole list!")
  // }

  //als je op itemsleft of all of completed drukt tont het de items die left, all of completed zijn
  let itemsleft = document.querySelector(".itemsleft")
  let alles = document.querySelector(".all")
  let compleet = document.querySelector(".completed")
  let items = document.querySelectorAll(".todo-items")

  itemsleft.addEventListener("click", act => {
 alles.style.color ="#999"
    compleet.style.color = "#999"
    itemsleft.style.color ="aqua"
   //zorgen dat je eerst terug je hele lijst krijgt
    for (let a = 0; a < items.length; a++) {
      items[a].style.display = "flex"
    }
    for (let y = 0; y < listItem.length; y++) {
      if (listItem[y].status != "active") {
  items[y].style.display = "none"
      }
    }
  })

  alles.addEventListener("click", act => {
    itemsleft.style.color ="#999"
    alles.style.color ="aqua"
    compleet.style.color = "#999"
    for (let y = 0; y < listItem.length; y++) {
      //console.log(items[y])
      items[y].style.display = "flex"
    }
  })

  compleet.addEventListener("click", act => {
    itemsleft.style.color ="#999"
    alles.style.color ="#999"
    compleet.style.color = "aqua"
    for (let a = 0; a < items.length; a++) {
      items[a].style.display = "flex"
    }
    for (let y = 0; y < listItem.length; y++) {
      if (listItem[y].status != "completed") {
       // console.log(items[y])
        items[y].style.display = "none"
      }

    }
  })
actie()
 

//grote delete button om alles te deleten
//delete alleen nog maar als je er op klikt, nog niet in firebase
//met modal venster nog niet
let deleteAll = document.querySelector(".deleteAll")
deleteAll.addEventListener("click", delAl=>{

  for(let c = 0; c<toDoAct.length;c++){
    toDoAct[c].remove()

  }



})






 
})


