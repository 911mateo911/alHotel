function find(which) {
    return document.querySelector(which)
}

const initialSearch = find('.findForm input').value
let page = 0
let isLoading = false
let noMoreResults = false

window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        getThreads(postRequest)
    }
};

function getThreads(threads) {
    threads().then(data => {
        if (data) {
            for (element of data) {
                pasteThreadData(element)
            }
        }
    })
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

async function postRequest() {
    const moreThanFive = document.querySelectorAll('.comments .ask-item').length >= 5
    if (moreThanFive && !noMoreResults) {
        isLoading = true
        find('.loading').classList.remove('hide')
        page++
        const response = await fetch(`${window.location.href}/scroll`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode: 'no-cors',
            credentials: 'same-origin',
            body: new URLSearchParams({
                'page': page,
                'q': initialSearch
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
            noMoreResults = true
            find('.loading').classList.add('hide')
            isLoading = false
            return null
        }
    }
}

function pasteThreadData(response) {
    const outerDiv = document.createElement('div')
    outerDiv.classList.add('ask-item')
    ///
    const review_user = document.createElement('p')
    review_user.classList.add('review-user')
    review_user.classList.add('comment-user')
    const review_a = document.createElement('a')
    const strong = document.createElement('strong')
    strong.innerText = escapeHtml(response.author.username)
    review_a.href = escapeHtml(`/myprofile/${response.author._id}`)
    review_a.appendChild(strong)
    review_user.innerText = 'By: '
    review_user.appendChild(review_a)
    /////
    const comment_topic = document.createElement('p')
    comment_topic.classList.add('comment-topic')
    const comment_strong = document.createElement('strong')
    comment_strong.innerText = escapeHtml(response.topic)
    comment_topic.innerText = 'Topic: '
    comment_topic.appendChild(comment_strong)
    /////////
    const comment_body = document.createElement('p')
    comment_body.classList.add('comment-body')
    comment_body.innerText = escapeHtml(response.body)
    ////////
    const childShowMore = document.createElement('div')
    childShowMore.classList.add('showMore-wrap')
    const seen = document.createElement('div')
    seen.classList.add('seen')
    const showMoreSpan = document.createElement('span')
    const showspanImg = document.createElement('img')
    showspanImg.classList.add('eye')
    showspanImg.src = '/images/comment.svg'
    const spanP = document.createElement('p')
    spanP.innerText = response.comments.length
    showMoreSpan.appendChild(showspanImg)
    showMoreSpan.appendChild(spanP)
    seen.appendChild(showMoreSpan)
    const a = document.createElement('a')
    a.href = `/discussion/thread/${response._id}`
    a.classList.add('showMore')
    a.innerText = 'Show more'
    childShowMore.appendChild(seen)
    childShowMore.appendChild(a)
    //////
    outerDiv.appendChild(review_user)
    outerDiv.appendChild(comment_topic)
    outerDiv.appendChild(comment_body)
    outerDiv.appendChild(childShowMore)
    find('.comments').appendChild(outerDiv)
}

find('.input-find img').addEventListener('click', () => {
    find('.findForm').submit()
})