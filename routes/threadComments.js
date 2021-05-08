const express = require('express')
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isCommentAuthor } = require('../middlewares/priviledges')
const { newThreadComment, deleteThreadComment } = require('../controllers/comments')
const { validateComment } = require('../middlewares/validators')

router.post('/', isLoggedIn, validateComment, newThreadComment)

router.delete('/:commentID', isLoggedIn, isCommentAuthor, deleteThreadComment)

module.exports = router