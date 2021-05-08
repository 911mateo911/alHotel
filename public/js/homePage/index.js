window.onscroll = () => {
    expand()
}

function find (who) {
    return document.querySelector(who)
}

find('.slide-left').addEventListener('click', slideLeft)
find('.slide-right').addEventListener('click', slideRight)
const carousel = find('.carousel')
const nav = find('.navbar')
const carouselItemWidth = find('.carousel-item').offsetWidth
const navPosition = nav.offsetTop;

function expand() {
    if(window.pageYOffset > navPosition) {
        nav.classList.add('expand')
    } else {
        nav.classList.remove('expand')
    }
}

function slideLeft() {
    carousel.scrollLeft -= carouselItemWidth + 30
}

function slideRight() {
    carousel.scrollLeft += carouselItemWidth + 30
}