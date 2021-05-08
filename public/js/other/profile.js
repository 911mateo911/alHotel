function find(which) {
    return document.querySelector(which)
}
let staysPageNum = 0
let blogPageNum = 0
let isLoading = false
let noMoreStaysResults = false
let noMoreBlogResults = false

window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        handlePost()
    }
};

function handlePost() {
    if (!isLoading) {
        isChecked(getStaysData, getBlogsData)
    }
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function isChecked(stays, blogs) {
    if (find('.scroll-active').innerText.slice(0, 5) === 'Stays') {
        stays().then(data => {
            if (data) {
                for (element of data) {
                    pasteStaysData(element)
                }
            }
        })
    } else {
        blogs().then(data => {
            if (data) {
                for (element of data) {
                    pasteBlogData(element)
                }
            }
        })
    }
}

async function getStaysData() {
    const moreThanFive = document.querySelectorAll('.resPlaces .result-item').length >= 5
    if (moreThanFive && !noMoreStaysResults) {
        isLoading = true
        find('.loading').classList.remove('hide')
        staysPageNum++
        const response = await fetch(`${window.location.href}/scroll`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode: 'no-cors',
            credentials: 'same-origin',
            body: new URLSearchParams({
                'page': staysPageNum,
                'content': 'Stays'
            })
        })
        try {
            const data = await response.json()
            find('.loading').classList.add('hide')
            isLoading = false
            if (!data.length) {
                throw new Error
            }
            return data
        }
        catch (e) {
            noMoreStaysResults = true
            find('.loading').classList.add('hide')
            isLoading = false
            return null
        }
    }
}

async function getBlogsData() {
    const moreThanFive = document.querySelectorAll('.resBlogs .result-item').length >= 5
    if (moreThanFive && !noMoreBlogResults) {
        isLoading = true
        find('.loading').classList.remove('hide')
        blogPageNum++
        const response = await fetch(`${window.location.href}/scroll`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode: 'no-cors',
            credentials: 'same-origin',
            body: new URLSearchParams({
                'page': blogPageNum,
                'content': 'Blogs',
            })
        })
        try {
            const data = await response.json()
            find('.loading').classList.add('hide')
            isLoading = false
            if (!data.length) {
                throw new Error
            }
            return data
        }
        catch (e) {
            noMoreBlogResults = true
            find('.loading').classList.add('hide')
            isLoading = false
            return null
        }
    }
}

function pasteStaysData(response) {
    const div = document.createElement('div')
    div.classList.add('result-item')
    /////////////////
    const childImg = document.createElement('div')
    childImg.classList.add('result-img')
    const img = document.createElement('img')
    if (response.photo.length) {
        img.src = response.photo[0].url
    } else {
        img.src = '/images/lens.svg'
        img.classList.add('resultNoPhoto')
    }
    childImg.appendChild(img)
    ////////////////
    const childInfo = document.createElement('div')
    childInfo.classList.add('result-info')
    const infoH3 = document.createElement('h3')
    const infoH4 = document.createElement('h4')
    if (response.name.length > 30) {
        infoH3.innerHTML = `${escapeHtml(response.name.slice(0, 30))}...`
    } else {
        infoH3.innerHTML = escapeHtml(response.name)
    }
    if (response.price.length > 30) {
        infoH4.innerHTML = `${escapeHtml(response.price.slice(0, 30))}...`
    } else {
        infoH4.innerHTML = escapeHtml(response.price)
    }
    const childSpan = document.createElement('span')
    const reviews = document.createElement('p')
    reviews.innerHTML = `Reviews: ${response.avgReviews}`
    const spanImg = document.createElement('img')
    spanImg.src = '/images/star.svg'
    spanImg.classList.add('star')
    childSpan.appendChild(reviews)
    childSpan.appendChild(spanImg)
    childInfo.appendChild(infoH3)
    childInfo.appendChild(infoH4)
    childInfo.appendChild(childSpan)
    ///////////////////
    const childP = document.createElement('p')
    childP.classList.add('result-desc')
    childP.innerHTML = `${escapeHtml(response.description.slice(0, 100))}...`
    //////////////////
    const childShowMore = document.createElement('div')
    childShowMore.classList.add('showMore-wrap')
    const seen = document.createElement('div')
    seen.classList.add('seen')
    const showMoreSpan = document.createElement('span')
    const showspanImg = document.createElement('img')
    showspanImg.classList.add('eye')
    showspanImg.src = '/images/seen.svg'
    const spanP = document.createElement('p')
    if (response.seen < 1000) {
        spanP.innerText = response.seen
    } else {
        spanP.innerText = Math.round((response.seen / 1000) * 10) / 10 + "k"
    }
    ///
    const showMoreSpan2 = document.createElement('span')
    const span2Img = document.createElement('img')
    span2Img.src = '/images/comment.svg'
    span2Img.classList.add('eye')
    const span2P = document.createElement('p')
    span2P.innerHTML = response.reviews.length
    showMoreSpan.appendChild(showspanImg)
    showMoreSpan.appendChild(spanP)
    showMoreSpan2.appendChild(span2Img)
    showMoreSpan2.appendChild(span2P)
    seen.appendChild(showMoreSpan)
    seen.appendChild(showMoreSpan2)
    /////
    const a = document.createElement('a')
    a.classList.add('showMore')
    a.href = `/places/${response._id}`
    a.innerHTML = 'Show more'
    childShowMore.appendChild(seen)
    childShowMore.appendChild(a)
    div.appendChild(childImg)
    div.appendChild(childInfo)
    div.appendChild(childP)
    div.appendChild(childShowMore)
    find('.resPlaces').appendChild(div)
}

function pasteBlogData(response) {
    const div = document.createElement('div')
    div.classList.add('result-item')
    /////////////////
    const childImg = document.createElement('div')
    childImg.classList.add('result-img')
    const img = document.createElement('img')
    if (response.photo.length) {
        img.src = response.photo[0].url
    } else {
        img.src = '/images/lens.svg'
        img.classList.add('resultNoPhoto')
    }
    childImg.appendChild(img)
    ////////////////
    const childInfo = document.createElement('div')
    childInfo.classList.add('result-info')
    const infoH3 = document.createElement('h3')
    const infoH4 = document.createElement('h4')
    infoH3.innerHTML = response.title.slice(0, 50)
    infoH4.innerHTML = response.subtitle.slice(0, 200)
    childInfo.appendChild(infoH3)
    childInfo.appendChild(infoH4)
    ///////////////////
    const childP = document.createElement('p')
    childP.classList.add('result-desc')
    childP.innerHTML = `${response.description.slice(0, 200)}...`
    //////////////////
    const childShowMore = document.createElement('div')
    childShowMore.classList.add('showMore-wrap')
    const seen = document.createElement('div')
    seen.classList.add('seen')
    const showMoreSpan = document.createElement('span')
    const showspanImg = document.createElement('img')
    showspanImg.classList.add('eye')
    showspanImg.src = '/images/seen.svg'
    const spanP = document.createElement('p')
    if (response.seen > 1000) {
        spanP.innerHTML = Math.round((response.seen / 1000) * 10) / 10 + "k"
    } else {
        spanP.innerHtml = response.seen
    }
    ///
    const showMoreSpan2 = document.createElement('span')
    const span2Img = document.createElement('img')
    span2Img.src = '/images/comment.svg'
    span2Img.classList.add('eye')
    const span2P = document.createElement('p')
    span2P.innerHTML = response.comments.length
    showMoreSpan.appendChild(showspanImg)
    showMoreSpan.appendChild(spanP)
    showMoreSpan2.appendChild(span2Img)
    showMoreSpan2.appendChild(span2P)
    seen.appendChild(showMoreSpan)
    seen.appendChild(showMoreSpan2)
    /////
    const a = document.createElement('a')
    a.classList.add('showMore')
    a.href = `/blog/${response._id}`
    a.innerHTML = 'Show more'
    childShowMore.appendChild(seen)
    childShowMore.appendChild(a)
    div.appendChild(childImg)
    div.appendChild(childInfo)
    div.appendChild(childP)
    div.appendChild(childShowMore)
    find('.resBlogs').appendChild(div)
}

const scrollWidth = find('.resPlaces').offsetWidth

function scrollClick(which, remove, container) {
    find(remove).classList.remove('scroll-active')
    which.classList.add('scroll-active')
    find(container).classList.add('hide')
}

function removeHide(which) {
    if (find(which).classList.contains('hide')) {
        find(which).classList.remove('hide')
    }
}

if (find('.input-find img')) {
    find('.input-find img').addEventListener('click', function () {
        find('.findForm').submit()
    })
}

find('.blogs').addEventListener('click', function () {
    scrollClick(this, '.stays', '.resPlaces')
    removeHide('.resBlogs')
    find('.results-cont').scrollLeft += scrollWidth
})
find('.stays').addEventListener('click', function () {
    scrollClick(this, '.blogs', '.resBlogs')
    removeHide('.resPlaces')
    find('.results-cont').scrollLeft -= scrollWidth
})