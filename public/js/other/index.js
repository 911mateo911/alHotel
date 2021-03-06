const allInputs = document.querySelectorAll('.textInput')

if (find('.carouselEdit')) {
    carouselEdit()
}

find('#file').addEventListener('change', e => {
    fileValidator(e)
})

const allPhotos = findAll('.carousel-item')
const count = find('.count')
let showedImg = 0

if (find('.slide-right')) {
    find('.slide-right').addEventListener('click', () => {
        if (showedImg < allPhotos.length - 1) {
            showedImg++
        }
        slideRight(showedImg, allPhotos)
    })
}

if (find('.slide-left')) {
    find('.slide-left').addEventListener('click', () => {
        if (showedImg > 0) {
            showedImg--
        }
        slideLeft(showedImg, allPhotos)
    })
}

find('.clearPhoto').addEventListener('click', () => {
    clearPhoto()
})

validationClasses(allInputs)

find('.form').addEventListener('submit', function (e) {
    if (!validateForm(allInputs, 5000) || !validateEditPhotos()) {
        e.preventDefault()
    } else {
        e.preventDefault()
        uploading()
        find('.hourGlass').classList.remove('hide')
        setTimeout(() => {
            find('.form').submit()
        }, 10);
    }
})

find('.okBtn').addEventListener('click', () => {
    okBtn()
})