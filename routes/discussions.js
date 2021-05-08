const express = require('express')
const router = express.Router()
const { allThreads, newDiscussionSave, max50, notBlank, scrollResults, discussionShow, deleteThread, getThreadResults, notScrollBlank } = require('../controllers/discussions')
const { isLoggedIn, isThreadAuthor } = require('../middlewares/priviledges')
const { validateThread } = require('../middlewares/validators')

router.get('/', allThreads)

router.post('/new', isLoggedIn, validateThread, newDiscussionSave)

router.post('/search', notBlank, getThreadResults)

router.post('/search/scroll', max50, notScrollBlank, scrollResults)

router.route('/thread/:discussionID')
    .get(discussionShow)
    .delete(isLoggedIn, isThreadAuthor, deleteThread)

module.exports = router