const expres = require('express')
const { notBlank, validateQuery, getScrollResults, getResults, max50 } = require('../middlewares/query')
const router = expres.Router({ mergeParams: true })

router.post('/scroll', validateQuery, getScrollResults)

router.route('/')
    .get(function (req, res) {
        res.render('other/results', {
            title: 'Found places/blogs',
            foundPlaces: "",
            foundBlogs: "",
            query: ""
        })
    })
    .post(notBlank, max50, getResults)

module.exports = router