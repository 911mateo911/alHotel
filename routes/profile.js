const express = require('express')
const router = express.Router()
const { getUser, getOtherPosts } = require('../controllers/profile')
const { safeParam, validateProfileScroll } = require('../middlewares/validators')

router.get('/:userID', safeParam, getUser)

router.route('/:userID/scroll')
    .post(validateProfileScroll, getOtherPosts)
    .get((req, res) => {
        res.redirect(`/myprofile/${req.params.userID}`)
    })

module.exports = router