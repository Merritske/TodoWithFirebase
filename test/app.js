let input = document.querySelector(".input")
let [uitspraak] = document.querySelector(".input-data")
let list = []
let count = 0
input.addEventListener("submit", inputFunc)
function inputFunc (e){
e.preventDefault()
let obj ={
uitspraak : uitspraak.value
}

let listIn = document.querySelector(".lijst")
listIn.innerHTML += `<div class="list" ">
<div class="count">
${count}
</div>
<div class="quote">
${obj.uitspraak}
</div></div>
`
list.push(obj)

count ++
}

function myFunction() {
    var element = document.getElementById("myDIV");
    element.classList.toggle("mystyle");
  }