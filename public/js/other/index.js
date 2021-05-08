const allInputs = document.querySelectorAll('.textInput')

function find(which) {
    return document.querySelector(which)
}

find('#file').addEventListener('change', e => {
    find('.fileName').textContent = ''
    const [file] = e.target.files;
    find('.form').get
    if (file.type.match('image.*')) {
        for (var i = 0; i < e.target.files.length; i++) {
            find('.fileName').textContent += e.target.files[i].name
        }
    }
})

find('.clearPhoto').addEventListener('click', ()=> {
    find('#file').value = null
    find('.fileName').textContent = ''
})

for (input of allInputs) {
    input.addEventListener('input',function() {
        if(this.classList.contains('invalid')) {
            this.classList.remove('invalid')
            this.classList.add('valid')
        }
    })
}

find('.form').addEventListener('submit',function(e) {
    for (input of allInputs) {
        if (input.value === '' || input.value == null) {
            e.preventDefault()
            input.classList.add('invalid')
            input.placeholder = 'This cannot be blank'
            input.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }
})
