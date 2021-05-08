function find(which) {
    return document.querySelector(which)
}

function findAll(which) {
    return document.querySelectorAll(which)
}

function fileValidator(e) {
    find('.fileName').textContent = ''
    const [file] = e.target.files;
    find('.form').get
    if (file.type.match('image.*')) {
        find('.fileName').innerHTML = `${e.target.files.length} photos selected`
    }
}

function slideRight(showedImg, allPhotos) {
    count.innerHTML = `${showedImg + 1}/`
    allPhotos[showedImg].scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}

function slideLeft(showedImg, allPhotos) {
    count.innerHTML = `${showedImg + 1}/`
    allPhotos[showedImg].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: "center" })
}

function clearPhoto() {
    find('#file').value = null
    find('.fileName').textContent = ''
}

function validationClasses(allInputs) {
    for (input of allInputs) {
        input.addEventListener('input', function () {
            if (this.classList.contains('invalid')) {
                if (this.value.length > 10) {
                    this.classList.remove('invalid')
                    this.classList.add('valid')
                }
            }
        })
    }
}

function carouselEdit() {
    const allCheckboxes = findAll('.deleteImg label')
    for (let input of allCheckboxes) {
        input.addEventListener('click', () => {
            if (find(`#${input.classList[0]}`).checked) {
                input.innerHTML = 'Delete'
                input.parentElement.classList.remove('deleted')
                find(`#${input.classList[0]}`).checked = true
            } else {
                input.innerHTML = 'Undo'
                input.parentElement.classList.add('deleted')
                find(`#${input.classList[0]}`).checked = false
            }
        })
    }
}

function deleteBtn(e) {
    e.preventDefault()
    find('body').style.overflow = 'hidden'
    find('.form').classList.add('hide')
    find('.delete').classList.remove('hide')
    setTimeout(() => {
        find('.deleteForm').submit()
    }, 10);
}

function uploading() {
    find('body').style.overflow = 'hidden'
    find('.error').classList.remove('hide')
    find('main').classList.add('hide')
    find('.error button').classList.add('hide')
    find('.error h3').innerHTML = 'Uploading...Please wait'
}

function okBtn() {
    find('body').style.overflow = 'initial'
    find('main').classList.remove("hide")
    find('.error').classList.add('hide')
}

const validateEditPhotos = function () {
    const photosLeft = findAll('.carousel-item').length - findAll('input:checked').length
    const maxCount = 10 - photosLeft
    if (find('#file').files.length > maxCount) {
        find('body').style.overflow = 'hidden'
        find('.error').classList.remove('hide')
        find('main').classList.add('hide')
        find('.error h3').innerHTML = 'Maxiumum of 10 photos allowed, please delete some before submitting'
        return false
    }
    return true
}

const validateForm = function (allInputs, textareaLength) {
    if (find('textarea').value.replace(/(&nbsp;|<([^>]+)>)/ig, '').trim().length > textareaLength) {
        find('body').style.overflow = 'hidden'
        find('.error').classList.remove('hide')
        find('main').style.display = "none"
        find('textarea').classList.add('invalid')
        if (input.classList.contains('valid')) {
            input.classList.remove('valid')
        }
        find('.error h3').innerHTML = 'That is too long for a brief description'
        return false
    }
    if (find('#file').files.length > 10) {
        find('body').style.overflow = 'hidden'
        find('.error').classList.remove('hide')
        find('main').classList.add('hide')
        find('.error h3').innerHTML = 'You can only upload 10 photos or less'
        return false
    }
    for (input of allInputs) {
        if (input.value.replace(/(&nbsp;|<([^>]+)>)/ig, '').trim().length <= 10 && input.value != '') {
            input.classList.add('invalid')
            if (input.classList.contains('valid')) {
                input.classList.remove('valid')
            }
            input.scrollIntoView({ behavior: "smooth", block: "center" });
            find('body').style.overflow = 'hidden'
            find('.error').classList.remove('hide')
            find('main').classList.add('hide')
            find('.error h3').innerHTML = 'Please provide more information'
            return false
        } else if (input.value === '' || input.value == null) {
            input.classList.add('invalid')
            if (input.classList.contains('valid')) {
                input.classList.remove('valid')
            }
            input.placeholder = 'This cannot be blank'
            input.scrollIntoView({ behavior: "smooth", block: "center" });
            return false
        }
    }
    return true
}

function validateReview(e) {
    if (find('textarea').value.replace(/(&nbsp;|<([^>]+)>)/ig, '').trim().length < 10 || find('textarea').value.replace(/(&nbsp;|<([^>]+)>)/ig, '').trim().length > 500) {
        e.preventDefault()
        find('body').style.overflow = 'hidden'
        find('.error').classList.remove('hide')
        find('.base-form').classList.add('hide')
        find('.error h3').innerHTML = 'The review should be beetwen 10-500 characters long'
    }
    for (let input of starInputs) {
        if (!input.checked) {
            return
        } else {
            e.preventDefault()
            find('body').style.overflow = 'hidden'
            find('.error').classList.remove('hide')
            find('.base-form').classList.add('hide')
            find('.error h3').innerHTML = 'Please provide a star review'
        }
    }
}

function validateComment(e) {
    if (find('textarea').value.replace(/(&nbsp;|<([^>]+)>)/ig, '').trim().length < 5 || find('textarea').value.replace(/(&nbsp;|<([^>]+)>)/ig, '').trim().length > 2000) {
        e.preventDefault()
        find('body').style.overflow = 'hidden'
        find('.error').classList.remove('hide')
        find('.form').classList.add('hide')
        find('.error h3').innerHTML = 'Comment should be beetwen 5-2000 characters long'
    }
}