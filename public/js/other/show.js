const starInputs = findAll('.starInput')
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

if (find('.deleteForm')) {
    find('.deleteForm').addEventListener('submit', function (e) {
        e.preventDefault()
        deleteBtn(e)
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

if (find('#review-form')) {
    find('#review-form').addEventListener('submit', function (e) {
        validateReview(e)
    })
}

find('.okBtn').addEventListener('click', () => {
    find('body').style.overflow = 'initial'
    find('.form').classList.remove('hide')
    find('.error').classList.add('hide')
    find('fieldset').scrollIntoView({ behavior: "auto", block: "center" });
})