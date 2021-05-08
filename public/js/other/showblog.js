const allPhotos = findAll('.carousel-item')
const count = find('.count')
let showedImg = 0

if (find('.comment-form')) {
    find('.comment-form').addEventListener('submit', function (e) {
        validateComment(e)
    })
}

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

find('.okBtn').addEventListener('click', () => {
    find('body').style.overflow = 'initial'
    find('.form').classList.remove("hide")
    find('.error').classList.add('hide')
    find('textarea').scrollIntoView({ behavior: 'smooth', block: 'center' })
})