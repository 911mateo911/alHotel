const express = require('express')
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isCommentAuthor } = require('../middlewares/priviledges')
const { newComment, deleteComment, newThreadComment, deleteThreadComment } = require('../controllers/comments')
const { validateComment } = require('../middlewares/validators')

router.post('/', isLoggedIn, validateComment, newComment)

router.delete('/:commentID', isLoggedIn, isCommentAuthor, deleteComment)

module.exports = router