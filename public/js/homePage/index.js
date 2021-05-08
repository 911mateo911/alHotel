window.onscroll = () => {
    expand()
}

function find(who) {
    return document.querySelector(who)
}
const allImgs = document.querySelectorAll('.carouselImg')
for (let img of allImgs) {
    img.addEventListener('click', function () {
        window.location.href = this.parentElement.lastElementChild.lastElementChild.href
    })
}

find('.input-find img').addEventListener('click', () => {
    find('.findForm').submit()
})

find('.findBtn').addEventListener('click', function () {
    const inputDiv = find('.input-find')
    inputDiv.classList.remove('hide')
    inputDiv.classList.add('enlarge')
    this.classList.add('hide')
})

find('.slide-left').addEventListener('click', slideLeft)
find('.slide-right').addEventListener('click', slideRight)
const carousel = find('.carousel')
const nav = find('.navbar')
const carouselItemWidth = find('.carousel-item').offsetWidth
const navPosition = nav.offsetTop;

function expand() {
    if (window.pageYOffset > navPosition) {
        nav.classList.add('expand')
    } else {
        nav.classList.remove('expand')
    }
}

find('.plus').addEventListener('click', () => {
    find('body').style.overflow = 'hidden'
    find('.navigation').classList.add('hotelog')
    find('.navigation').classList.remove('hide')
})

find('.navigation img').addEventListener('click', () => {
    find('body').style.overflow = 'initial'
    find('.navigation').classList.remove('hotelog')
    find('.navigation').classList.add('hide')
})

function slideLeft() {
    carousel.scrollLeft -= carouselItemWidth + 30
}

function slideRight() {
    carousel.scrollLeft += carouselItemWidth + 30
}