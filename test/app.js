// let input = document.querySelector(".input")
// let [uitspraak] = document.querySelector(".input-data")
// let list = []
// let count = 0
// input.addEventListener("submit", inputFunc)
// function inputFunc (e){
// e.preventDefault()
// let obj ={
// uitspraak : uitspraak.value
// }

// let listIn = document.querySelector(".lijst")
// listIn.innerHTML += `<div class="list" ">
// <div class="count">
// ${count}
// </div>
// <div class="quote">
// ${obj.uitspraak}
// </div></div>
// `
// list.push(obj)

// count ++
// }
// //WERKT NIET?
// function myFunction() {
//     var element = document.getElementById("myDIV");
//     element.classList.toggle("mystyle");
//   }
// //SWEET ALERT
// let button  = document.getElementById("sweetbtn")
// let sweetDiv = document.querySelector(".sweetalert")
// button.addEventListener("click", sweetAlert=>{
//  Swal.fire({
//     customClass:{
// title: "custom-title-class"
//  },

//     title: 'Are you sure?',
//     text:  "You will not be able to revert this!" ,
//     icon: 'warning',

  
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire(
//         'Deleted!',
//         'Your file has been deleted.',
//         'success'
//       )
//     }
//   })
// })
 
let zon = document.querySelector(".redL")


 let num = ["20px,-20px","40px,-40px","60px,-60px","80px,-80px","100px,-100px","120px,-115px","150px,-130px","180px,-115px","200px,-100px", "220px, -80px","240px,-60px","20px,-20px","40px,-40px","60px,-60px","80px,-80px","100px,-100px","120px,-115px","150px,-130px","180px,-115px","200px,-100px", "220, -80px","240px,-60px"]
 let x = 0
 let divCont = document.querySelector(".green")
 divCont.addEventListener("click", move=>{
 x ++
 

  // console.log(num[x])
   a= 0
   b =0
   for(let q = 0; q <=24;q++){
    a +=  40
  b += 20
  console.log(a, b )
  let list = []
  list.push({a,b})
  console.log(list)
  }
   

// {
//    console.log("hello")
// x = uur

 //}
 })
  
//  //dit werkt, nog aanpassen in todowhitfirebase
//  function getRealTime(){

//  let uur = new Date().getSeconds()
// //document.getElementById('time').innerHTML = uur
// if((0<= uur <= 15)){
//   zon.style.transform = `translate(${num[x]})`
//   x = uur
// }
// }
// setInterval(function(){
//   getRealTime()
//   console.log("hello")

// },1000) //om de minuut de actuele minuten opvragen


// 
// x = uur
