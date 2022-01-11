let input = document.querySelector(".new-todo-input")
const [todoN] = document.querySelector(".input")
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
inputL.innerHTML += `<div class="todo-items">
<div class="check">
    <div class="check-mark checked">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
    </div>
</div>
<div class="todo-item">
    <p>${obj.todoN}</p>
</div>
</div>`


count ++


todoN.value =""

}


