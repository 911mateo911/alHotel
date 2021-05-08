const pswInput = document.querySelector('#password')

document.querySelector('strong').addEventListener('click', function(){
    if (pswInput.type === 'password') {
        this.innerHTML = 'Hide'
        return pswInput.type = 'text'
    } else {
        this.innerHTML = 'Show'
        return pswInput.type = 'password'
    }
})