const express = require('express')
const router = express.Router({ mergeParams: true });
const { postReview, deleteReview } = require('../controllers/reviews')
const { isLoggedIn, isReviewAuthor } = require('../middlewares/priviledges')
const { validateReview } = require('../middlewares/validators')

router.post('/', isLoggedIn, validateReview, postReview)

router.delete('/:reviewID', isLoggedIn, isReviewAuthor, deleteReview)

module.exports = router