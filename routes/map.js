const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('other/map', {
        title: 'Albanian Map'
    })
})

module.exports = router