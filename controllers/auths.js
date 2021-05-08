const User = require('../models/user')
const asyncWrap = require('../middlewares/asyncWrap')

module.exports.registerShow = (req, res) => {
    res.render('auth/register', { title: 'Register to alHotel' })
}

module.exports.registerUser = asyncWrap(async (req, res) => {
    try {
        const { email, username, password } = req.body
        const newUser = new User({
            email,
            username
        })
        const registeredUser = await User.register(newUser, password)
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to alHotel')
            res.redirect('/')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
})

module.exports.loginShow = (req, res) => {
    res.render('auth/login', { title: 'Login to alHotel' })
}

module.exports.checkIfLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.flash('error', 'You are already logged in')
        return res.redirect('/')
    }
    next()
}

module.exports.loginUser = asyncWrap(async (req, res) => {
    req.flash('success', 'Welcome back :)')
    const redirectUrl = req.session.returnTo || '/'
    delete req.session.returnTo
    res.redirect(redirectUrl)
})

module.exports.checkIfEmail = asyncWrap(async (req, res, next) => {
    if (req.body.username.indexOf('@') !== -1) {
        User.findOne({ email: req.body.username }, (err, foundUser) => {
            if (err || !foundUser) {
                req.flash('error', 'Invalid credentials');
                return res.redirect('/login');
            } else {
                req.body.username = foundUser.username;
                next();
            }
        })
    } else {
        next()
    }
})