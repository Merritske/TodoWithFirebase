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
//WERKT NIET?
function myFunction() {
    var element = document.getElementById("myDIV");
    element.classList.toggle("mystyle");
  }
//SWEET ALERT
let button  = document.getElementById("sweetbtn")
let sweetDiv = document.querySelector(".sweetalert")
button.addEventListener("click", sweetAlert=>{
 Swal.fire({
    customClass:{
title: "custom-title-class"
 },

    title: 'Are you sure?',
    text:  "You will not be able to revert this!" ,
    icon: 'warning',

  
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
})
 