let arr = []

function local(){
    if(localStorage.getItem("mylist")){
        arr = JSON.parse(localStorage.getItem("mylist"));
    }
}
local()

function compare(){
    if(list.children.length === 0){
        list.style.display = 'none'
    }
    else if(list.children.length !== 0){
        list.style.display = 'block'
    }
}
compare()

function add(){
    if(arr.includes(+input.value) || arr.includes(input.value)){
        alert('Repeting of value')
    }
    else if(input.value != '' &&  input.value != +input.value){
        arr.push(input.value)
    }   
    else if(input.value != '' &&  input.value == +input.value){
        arr.push(+input.value)
    }      
    
    localStorage.setItem("mylist", JSON.stringify(arr)); 
    showList()
    console.log(arr)
}


function showList(){
    list.innerHTML = '' 
    arr.forEach((item)=>{
        let li = document.createElement('li')
        let span = document.createElement('span')
        list.appendChild(li)
        li.appendChild(span)
        span.innerText = item       
        input.value = ''
        let del = document.createElement('button')
        del.innerHTML = 'x'
        li.appendChild(del)
    })
    let delButton = document.querySelectorAll('li button')
    delButton.forEach((item) =>{
        item.addEventListener('click',function(ev){
        ev.target.parentElement.remove()        
        let i = ev.target.previousElementSibling.innerText
        arr = arr.filter((item) =>{
            return item != i ? item : null
        })
        console.log(arr)
        localStorage.setItem("mylist", JSON.stringify(arr));
        compare()
    })
    })
    compare()
}
showList()

let flag = true
buttonSort.addEventListener('click', function(){      
    if(flag === true){            
        arr = arr.sort((a,b) => a < b ? 1 : -1)
        flag = false   
    }
    else if(flag === false){    
        arr = arr.sort((a,b) =>  a > b ? 1 : -1)   
        flag = true
    }   
    showList()
    console.log(arr)
})

document.addEventListener('keyup',function(ev){
    return ev.key === 'Enter' ? add() : null
})

button.addEventListener('click', add)
