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



//HELP FUNCTIE //echt bellen gaat nog niet
const inputOptions = new Promise((resolve) => {
  resolve({
    '0470584694': 'An',
    '0459876231': 'Linda',
    '0497654123': 'Marc'
  })
})
let helpF = document.querySelector("#sweetbtn")
helpF.addEventListener("click", gethelp => {
  Swal.fire({
    customClass: {
      popup: "popup-class",
      title: "custom-title-class",
      icon: "icon",
    },
    title: 'Heb je dringend hulp nodig?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Neen ',
    confirmButtonText: 'Ja, bel iemand voor hulp',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        customClass: {
          popup: "popup-class",
          title: "custom-title-class",
          input: "inputRadio",
          icon: "icon",
        },
        title: 'Kies wie je wil bellen',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return 'Kies iemand van de drie!'
          } else {
            Swal.fire({
              customClass: {
                popup: "popup-class",
                title: "custom-title-class",
                icon: "icon",
              },
              position: 'center',
              icon: 'success',
              title: `Er wordt gebeld naar ${value}`,
              showConfirmButton: false,
              timer: 3500
            })
          }
        }
      })
    }
  })
})

//DAG invoeren
let dag = document.querySelector(".dag")
let days = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]
let maand = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"]
let d = new Date().getDay()
let m = new Date().getMonth()
let dD = new Date().getDate()
let year = new Date().getFullYear()

dag.innerHTML += days[d] + " " + dD + " " + maand[m] + " " + year


//zonnetje laten bewegen zoals zonnewijzer
let zon = document.querySelector(".zon")
let num = ["0px,0px", "5px,-30px", "10px,-60px", "20px,-90px", "30px,-120px", "40px,-150px", "60px,-200px", "100px,-280px", "160px,-330px", "230px, -360px", "310px,-380px", "390px,-395px", "470px,-400px", "550px,-395px", "620px,-380px", "680px,-360px", "730px,-330px", "780px,-290px", "820px,-250px", "870px,-200px ", "885px,-150px ", "890px,-100px ", "895px,-50px ", "900px,0px"]
//             0           1           2             3           4            5               6              7             8                 9              10              11                12              13              14            15             16           17            18              19                  20             21                22            23
let x = 0

function getRealTime() {
  let uur = new Date().getHours()
  //document.getElementById('time').innerHTML = uur
  zon.style.transform = `translate(${num[x]})`
  x = uur
}
setInterval(function () {
  getRealTime()
}, 10000) //om de minuut de actuele minuten opvragen

//automatische slideshow bovenaan
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 5 seconds
}

//dingen uit de onload functie zetten anders update die enkel onload
window.onload = function () {
 let snapshot =[]
if(localStorage.length>0){ 
 snapshot = JSON.parse(localStorage.getItem("TodoList"))
    for (let x = 0; x < snapshot.length; x++) {
    inputL.innerHTML += `<div class="todo-items">
    <div class="todoItems">
    <div class="check ${snapshot[x].status == "completed" ? "checked" : ""}">
     <div id="${x}" class="check-mark ">
      <img src="https://www.freeiconspng.com/uploads/black-check-tick-icon-4.png"
        width="25" alt="black check tick icon" />     </div></div>
     <div class="todo-item">     <p id="${x}">${snapshot[x].text}</p>
    </div></div> <button class="delBtn" >X</button></div>`
    count++
}


    //todoItems en hun status uploaden
    if (snapshot[x].status == "completed") {
      countCompleted++
    }

    all.innerHTML = `${count} totaal`
    countLeft = count - countCompleted
    itemsLeft.innerHTML = `${countLeft}  taken nog doen`
    itemsCompleted.innerHTML = `${countCompleted}  zijn al klaar`

  }
  console.log(snapshot)
  //input items 
  input.addEventListener("submit", inputfunc)
  //als je op enter drukt
  function inputfunc(e) {
    e.preventDefault()
    let obj = {
      text: todoN.value,
      status: "active"
    }
    snapshot.push(obj)
    todoN.value = ""
    //obj opslaan in localstorage
    localStorage.setItem("TodoList", JSON.stringify(snapshot))
    inputL.innerHTML += `<div class="todo-items">
    <div class="todoItems">
    <div class="check ${obj.status == "completed" ? "checked" : ""}">
     <div id="${snapshot.length}" class="check-mark ">
      <img src="https://www.freeiconspng.com/uploads/black-check-tick-icon-4.png"
        width="25" alt="black check tick icon" />     </div></div>
     <div class="todo-item">     <p id="${snapshot.length}">${obj.text}</p>
    </div></div> <button class="delBtn" >X</button></div>`


    console.log(snapshot)
    count++
    all.innerHTML = `${count} totaal`
    countLeft = count - countCompleted
    itemsLeft.innerHTML = `${countLeft} nog doen`
    itemsCompleted.innerHTML = `${countCompleted} zijn klaar`
    //alert zetten bij 5, 10 en 15 items todo voor toepassing voor mensen in een derpessie of burnout
    // switch (count) {
    //   case 5:
    //     alert("lots of things needs to be done")
    //     break;
    //   case 10:
    //     alert("lots of things needs to be done, you better get started")
    //     break;
    //   case 15:
    //     alert("what the f****k, this is too much for one day")
    //     break;
    // }
    console.log(count)
  }

  //Als je op een item drukt =>actief
  let toDoAct = document.querySelectorAll(".todo-item")
  let actief = document.querySelector(".actief")

  actiefItem = 0
  toDoAct.forEach((actfoc) => {
    actfoc.addEventListener("click", function (e) {
      //corresponderende listItem zoeken
      if (actfoc.parentElement.parentElement.style.backgroundColor == "aqua") {
        actfoc.parentElement.parentElement.style.backgroundColor = "#666"
        actfoc.style.color = "#eee"
        actiefItem--
        if (actiefItem != "0") {
          actief.style.color = "aqua"
        } else {
          actief.style.color = "#999"
        }
        //console.log(actiefItem)
      } else if (actfoc.parentElement.parentElement.style.backgroundColor != "aqua") {
        // console.log(doc.data(actfoc).actief)
        actiefItem++
        //console.log(actiefItem)
        actfoc.parentElement.parentElement.style.backgroundColor = "aqua"
        actief.style.color = "aqua"
        actfoc.style.color = "black"

      }
    })})
      //als je op checkmark drukt checkmark moet veranderen en in localstorage moet completed
   //   function actie() {
        let checkM = document.querySelectorAll(".check")

        checkM.forEach((checkje) => {
          checkje.addEventListener("click", function (e) {
      console.log('piepeee')
//             //   if(actiefItem != 0){
//             //     actief.style.color = "aqua"
//             //  }else{
//             //    actief.style.color ="#999" 
//             //  }
//             //
//actief.style.color = "#999"

//             //
           let item = checkje.lastChild.id
       
            for (let x = 0; x < snapshot.length; x++) {

        console.log(item)

           if (x == item && snapshot[x].status === "active") {  
                console.log("piep")
                snapshot = [ {...snapshot[x], status: "completed" }]
                console.log(snapshot)
localStorage.setItem("TodoList", JSON.stringify(snapshot))

               checkje.classList.add(".checked")
  countCompleted++

               
              }
            
 else {
   localStorage.setItem("TodoList", JSON.stringify([ {...snapshot[x], status: "active" }]))
   checkje.style.backgroundColor = "aqua"
   checkje.classList.remove(".checked")
            count = 0
          countLeft = 0
          }
     }
      
//         //  console.log(toDoAct) = nodelist
//         //console.log(listItem) = array
//         // console.log(countCompleted)
//         //  }
     })
  }) 
 
//}
// switch (countCompleted) {
//   case 3:
//     alert("Time for a break")
//     break;
//   case 6:
//     alert(`Still ${countLeft} items left to do`)
//     break;
//   case 9:
//     alert(`Don't give up, you are almost there, ${countLeft} items to do`)
//     break;
//   case count:
//     alert("Good job! You finished the whole list!")
// }

//als je op itemsleft of all of completed drukt tont het de items die left, all of completed zijn
let itemsleft = document.querySelector(".itemsleft")
let alles = document.querySelector(".all")
let compleet = document.querySelector(".completed")
let items = document.querySelectorAll(".todo-items")

itemsleft.addEventListener("click", act => {
  alles.style.color = "#999"
  compleet.style.color = "#999"
  itemsleft.style.color = "aqua"
  //zorgen dat je eerst terug je hele lijst krijgt
  for (let a = 0; a < items.length; a++) {
    items[a].style.display = "flex"
  }
  for (let y = 0; y < snapshot.length; y++) {
    if (snapshot[y].status != "active") {
      items[y].style.display = "none"
    }
  }
})

alles.addEventListener("click", act => {
  itemsleft.style.color = "#999"
  alles.style.color = "aqua"
  compleet.style.color = "#999"
  for (let y = 0; y < snapshot.length; y++) {
    //console.log(items[y])
    items[y].style.display = "flex"
  }
})

compleet.addEventListener("click", act => {
  itemsleft.style.color = "#999"
  alles.style.color = "#999"
  compleet.style.color = "aqua"
  for (let a = 0; a < items.length; a++) {
    items[a].style.display = "flex"
  }
  for (let y = 0; y < snapshot.length; y++) {
    if (snapshot[y].status != "completed") {
      // console.log(items[y])
      items[y].style.display = "none"
    }

  }
})
//actie()

//als op deletebutton wordt gedrukt "X"
let delBtn = document.querySelectorAll(".delBtn")
console.log(delBtn)
for (let i = 0; i < delBtn.length; i++) {
  delBtn[i].addEventListener("click", ((j) => {
    let cancelBtn = document.querySelector(".cancelbtn")
    let deleteBtn = document.querySelector(".deletebtn")
    let clearfix = document.querySelector(".clearfix")
    return function () {
      if (snapshot[i].status == "active") {
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
            itemsLeft.innerHTML = `${countLeft} nog doen`
            itemsCompleted.innerHTML = `${countCompleted} zijn klaar`

       //delete item from localstorage
                     snapshot.splice(i,1)
               console.log(snapshot)
    localStorage.setItem("TodoList", JSON.stringify(snapshot))
         
      
            modal.style.display = "none"
 

            delBtn = []
          }

        })
      } else if (snapshot[i].status == "completed") {
        delBtn[i].parentElement.remove()
        count--
        countCompleted--
        all.innerHTML = `${count} totaal`
        itemsLeft.innerHTML = `${countLeft} nog doen`
        itemsCompleted.innerHTML = `${countCompleted} zijn klaar`
    
        //delete item from localstorage
        snapshot.splice(i, 1)
        localStorage.setItem("TodoList", JSON.stringify(snapshot))
        delBtn = 0
      }
    }
  })())
}

}









