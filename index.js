
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

let inputL = document.querySelector(".todo-items-wrapper")
inputL.innerHTML += `<div class="todo-items"><div class="todoItems">
<div class="check" onclick="checkM(this)">
<div class="checked">
 
 </div>
</div>
<div class="todo-item">
<p>${obj.todoN}</p>
</div></div> <button onclick="remove(this)">X</button></div>`

count ++
all.innerHTML = `${count} totaal`

todoN.value =""

}
//remove
function remove(getEl){
 getEl.parentElement.remove()
let itemsLeft = document.querySelector(".itemsleft")
 count --
 itemsLeft.innerHTML = `${count} items left`
}
//checkmark laten zien als je erop klikt en active zetten

function checkM (event){
  
    console.log("hello")
let mark = document.querySelectorAll(".checked")
mark.innerHTML = `<div class="checked">
<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
</div> hello`
}
//als checkmark + delete is completed

//items left = bij remove




