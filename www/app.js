let balance = 0
let transactions = []
let budget = 0

const PIN = "1234"

function unlock(){

let pin = document.getElementById("pinInput").value

if(pin === PIN){
document.getElementById("lockScreen").style.display="none"
document.getElementById("app").style.display="block"
}
else{
alert("Wrong PIN")
}

}

function addTransaction(){

let amount = parseFloat(document.getElementById("amount").value)
let type = document.getElementById("type").value
let note = document.getElementById("note").value

if(type==="income"){
balance += amount
}
else{
balance -= amount
}

let data={
amount,
type,
note,
date:new Date().toLocaleDateString()
}

transactions.push(data)

saveData()

updateUI()

}

function updateUI(){

document.getElementById("balance").innerText = balance

let history=document.getElementById("history")
history.innerHTML=""

transactions.forEach(t=>{

let li=document.createElement("li")
li.innerText=`${t.date} - ${t.note} - ${t.amount} (${t.type})`
history.appendChild(li)

})

updateChart()

updateBudget()

}

function setBudget(){

budget=parseFloat(document.getElementById("budget").value)

updateBudget()

}

function updateBudget(){

let spent = transactions
.filter(t=>t.type==="expense")
.reduce((a,b)=>a+b.amount,0)

let remaining = budget - spent

document.getElementById("budgetStatus").innerText =
`Budget: ${budget} | Spent: ${spent} | Remaining: ${remaining}`

}

function updateChart(){

let income = transactions
.filter(t=>t.type==="income")
.reduce((a,b)=>a+b.amount,0)

let expense = transactions
.filter(t=>t.type==="expense")
.reduce((a,b)=>a+b.amount,0)

let ctx=document.getElementById("chart")

new Chart(ctx,{
type:"pie",
data:{
labels:["Income","Expense"],
datasets:[{
data:[income,expense]
}]
}
})

}

function saveData(){

localStorage.setItem("transactions",JSON.stringify(transactions))
localStorage.setItem("balance",balance)

}

function loadData(){

let t = localStorage.getItem("transactions")

if(t){
transactions = JSON.parse(t)
}

let b = localStorage.getItem("balance")

if(b){
balance = parseFloat(b)
}

updateUI()

}

loadData()

setInterval(()=>{

alert("Don't forget to record today's expenses!")

},86400000)
