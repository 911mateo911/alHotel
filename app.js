if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// nodemodules
const express = require('express')
const path = require('path')
const session = require('express-session')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet')

// mvc
const ExpressError = require('./middlewares/expressError')
const hotelRoutes = require('./routes/hotel')
const reviewRoutes = require('./routes/review')
const authRoutes = require('./routes/auth')
const blogRoutes = require('./routes/blogs')
const commentRoutes = require('./routes/comments')
const profileRoutes = require('./routes/profile')
const threadCommentsRoutes = require('./routes/threadComments')
const searchRoutes = require('./routes/search')
const askRoutes = require('./routes/discussions')
const mapRoute = require('./routes/map')
const User = require('./models/user')
const Hotel = require('./models/hotels')
const Blog = require('./models/blog')
const homePage = require('./controllers/homePage')
const MongoStore = require('connect-mongo')

// helmet csp urls
const { scriptSrcUrls, styleSrcUrls, connectSrcUrls, fontSrcUrls } = require('./middlewares/csp')

// express & mongo
const app = express()
const db = mongoose.connection;
app.use(express.urlencoded({ extended: true }))
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongo connect succesful')
});
mongoose.set('useFindAndModify', false);
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(mongoSanitize())
app.enable('trust proxy')

app.use(function (request, response, next) {
    if (process.env.NODE_ENV != 'development' && !request.secure) {
        return response.redirect("https://" + request.headers.host + request.url);
    }
    next();
})

// helmet config
app.use(helmet())
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            childSrc: ["blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dxtjwhnoz/",
                "https://images.unsplash.com"
            ],
            fontSrc: ["'self'", ...fontSrcUrls]
        }
    })
)

// session config
const store = MongoStore.create({
    secret: process.env.SESSION_SECRET,
    mongoUrl: process.env.MONGODB_URL,
    touchAfter: 24 * 3600
})

store.on('error', function (e) {
    console.log(e)
})

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    name: 'session',
    resave: false,
    store: store,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true
    }
}
app.use(flash())
app.use(session(sessionConfig))

// passport config
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// local variables
app.use((req, res, next) => {
    if (!['/logout', '/login', '/register', '/search/scroll', '/discussion/search', '/scroll'].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl
    }
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash("error")
    next()
})

// route define
app.use('/places', hotelRoutes)
app.use('/places/:ID/review', reviewRoutes)
app.use('/', authRoutes)
app.use('/blog', blogRoutes)
app.use('/blog/:ID/comment', commentRoutes)
app.use('/myprofile', profileRoutes)
app.use('/search', searchRoutes)
app.use('/discussion', askRoutes)
app.use('/discussion/thread/:discussionID/comment', threadCommentsRoutes)
app.use('/map', mapRoute)

// utils
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// homepage and special case routes
app.get('/', homePage.index)

app.all('*', (req, res, next) => {
    next(new ExpressError('Ooops, i think you misspelled something', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, msg = 'Ooops, i think you misspelled something' } = err
    res.status(statusCode).render('elements/error', {
        msg,
        title: 'Oooops'
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000')
})