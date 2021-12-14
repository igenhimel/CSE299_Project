
window.onload = function(){
    
let form = document.getElementById('myForm')
let username = document.getElementById('username')
let myCom = document.getElementById('myCom')


username.addEventListener('keydown',function(e){
    axios.post('/auth/mydata')
.then(({data})=>{

    let isValid = false

    data.forEach(element=>{
        myVal = username.value
        if(myVal.trim()==`${element.username}`){
            username.classList.add('is-invalid')
            myCom.classList.add('invalid-feedback')
            username.classList.remove('is-valid')
            myCom.classList.remove('valid-feedback')
            myCom.innerHTML='Username Already Used'
            isValid =true
        }
       if(!isValid){
            username.classList.add('is-valid')
            myCom.classList.add('valid-feedback')
            username.classList.remove('is-invalid')
            myCom.classList.remove('invalid-feedback')
            myCom.innerHTML='Username Available'
            
        }

        
        if(username.value==''){
            username.classList.remove('is-invalid')
            username.classList.remove('invalid-feedback')
            username.classList.remove('is-valid')
            username.classList.remove('valid-feedback')
        }
        
        
    })
    
})
.catch(e=>{
    console.log(e)
})
})

let email = document.getElementById('email')

email.addEventListener('keydown',function(e){
    axios.post('/auth/mydata')
.then(({data})=>{

    let isEmail = false

    data.forEach(element=>{
        if(email.value==`${element.email}`){
            email.classList.add('is-invalid')
            myEmail.classList.add('invalid-feedback')
            email.classList.remove('is-valid')
            myEmail.classList.remove('valid-feedback')
            myEmail.innerHTML='Email Already Used'
            isEmail =true


        }

       if(!isEmail){
            email.classList.add('is-valid')
            myEmail.classList.add('valid-feedback')
            email.classList.remove('is-invalid')
            myEmail.classList.remove('invalid-feedback')
            myEmail.innerHTML='Email Available'
            
        }

        if(email.value==''){
            email.classList.remove('is-invalid')
            email.classList.remove('invalid-feedback')
            email.classList.remove('is-valid')
            email.classList.remove('valid-feedback')
        }
        
    })
    
})
.catch(e=>{
    console.log(e)
})
})
}