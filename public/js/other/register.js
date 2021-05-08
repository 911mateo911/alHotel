function find(which) {
    return document.querySelector(which)
}
function validateClass(which, regex) {
    if (which.classList.contains('invalid')) {
        if (regex.test(which.value)) {
            which.classList.remove('invalid')
            which.classList.add('valid')
        }
    }
}

const allInputs = document.querySelectorAll('.textInput')
const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/
const usernameRegex = /^[\w+\s+0-9]{8,}$/
const emailInput = find('#email')
const pswInput = find('#password')
const usernameInput = find('#username')

find('strong').addEventListener('click', function () {
    if (pswInput.type === 'password') {
        this.innerHTML = 'Hide'
        return pswInput.type = 'text'
    } else {
        this.innerHTML = 'Show'
        return pswInput.type = 'password'
    }
})

emailInput.addEventListener('input', () => {
    validateClass(emailInput, emailRegex)
})
pswInput.addEventListener('input', () => {
    validateClass(pswInput, passwordRegex)
})
usernameInput.addEventListener('input', () => {
    validateClass(usernameInput, usernameRegex)
})

find('.form').addEventListener('submit', function (e) {
    if (!emailRegex.test(emailInput.value)) {
        emailInput.classList.add('invalid')
        e.preventDefault()
        find('body').style.overflow = 'hidden'
        find('.error').classList.remove('hide')
        find('.form').classList.add('hide')
        find('.error h3').innerHTML = 'Please provide a valid email address'
    } else if (!usernameRegex.test(usernameInput.value)) {
        usernameInput.classList.add('invalid')
        e.preventDefault()
        find('body').style.overflow = 'hidden'
        find('.error').classList.remove('hide')
        find('.form').classList.add('hide')
        find('.error h3').innerHTML = 'Username must be 8 characters or more long and not contain special characters'
    } else if (!passwordRegex.test(pswInput.value)) {
        pswInput.classList.add('invalid')
        e.preventDefault()
        find('body').style.overflow = 'hidden'
        find('.error').classList.remove('hide')
        find('.form').classList.add('hide')
        find('.error h3').innerHTML = 'The password must be at least 8 characters long, also contain an uppercase letter and a number'
    }
    for (input of allInputs) {
        if (input.value === '' || input.value == null) {
            e.preventDefault()
            input.classList.add('invalid')
            input.scrollIntoView({ behavior: "smooth", block: "center" });
            input.placeholder = 'This cannot be blank'
        }
    }
})

find('.okBtn').addEventListener('click', () => {
    find('body').style.overflow = 'initial'
    find('.form').classList.remove("hide")
    find('.error').classList.add('hide')
})