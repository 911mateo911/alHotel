const allInputs = document.querySelectorAll('.textInput')

find('#file').addEventListener('change', e => {
    fileValidator(e)
})

if (find('.carouselEdit')) {
    carouselEdit()
}

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

validationClasses(allInputs)

find('.form').addEventListener('submit', function (e) {
    if (!validateForm(allInputs, 10000) || !validateEditPhotos()) {
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

find('.clearPhoto').addEventListener('click', () => {
    clearPhoto()
})

find('.okBtn').addEventListener('click', () => {
    okBtn()
})

