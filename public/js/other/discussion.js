function find(which) {
    return document.querySelector(which)
}

if (find('.askHeading a')) {
    find('.askHeading a').addEventListener('click', function () {
        if (this.innerHTML === "New") {
            this.innerHTML = "Close"
        } else {
            this.innerHTML = 'New'
        }
        find('.askHeading .form').classList.toggle('hide')
        find('.askHeading .form').classList.toggle('appear')
    })
    find('.comment-form').addEventListener('submit', (e) => {
        validateThread(e)
    })
    find('.okBtn').addEventListener('click', () => {
        find('body').style.overflow = 'initial'
        find('.form').classList.remove("hide")
        find('.error').classList.add('hide')
    })
}

if (find('.comment-show')) {
    find('.comment-show').addEventListener('submit', (e) => {
        if (find('textarea').value.length < 5 || find('textarea').value.length > 2000) {
            e.preventDefault()
            find('body').style.overflow = 'hidden'
            find('.error').classList.remove('hide')
            find('.form').classList.add('hide')
            find('.error h3').innerHTML = 'Comment should be beetwen 5-2000 characters long'
        }
    })
    find('.okBtn').addEventListener('click', () => {
        find('body').style.overflow = 'initial'
        find('.form').classList.remove("hide")
        find('.error').classList.add('hide')
    })
}

find('.input-find img').addEventListener('click', () => {
    find('.findForm').submit()
})

function validateThread(e) {
    if (find('textarea').value.length < 5 || find('textarea').value.length > 2000) {
        e.preventDefault()
        find('body').style.overflow = 'hidden'
        find('.error').classList.remove('hide')
        find('.form').classList.add('hide')
        find('.error h3').innerHTML = 'Thread should be beetwen 5-2000 characters long'
    }
    if (find('.comment-form input').value.length < 2 || find('.comment-form input').value.length > 50) {
        e.preventDefault()
        find('body').style.overflow = 'hidden'
        find('.error').classList.remove('hide')
        find('.form').classList.add('hide')
        find('.error h3').innerHTML = 'Topic should be beetwen 2-50 characters long'
    }
}