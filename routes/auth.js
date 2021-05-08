const express = require('express')
const passport = require('passport')
const router = express.Router()
const { registerShow, registerUser, loginShow, loginUser, checkIfEmail, checkIfLoggedIn } = require('../controllers/auths')
const { validateUser } = require('../middlewares/validators')

router.route('/register')
    .get(checkIfLoggedIn, registerShow)
    .post(validateUser, registerUser)

router.route('/login')
    .get(checkIfLoggedIn, loginShow)
    .post(checkIfEmail, passport.authenticate('local', {
        failureFlash: true, failureRedirect: '/login'
    }), loginUser)

router.get("/logout", (req, res) => {
    delete req.session.returnTo
    req.flash('success', 'Goodbye')
    req.logout()
    res.redirect('/')
})

module.exports = router