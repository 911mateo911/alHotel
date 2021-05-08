const express = require('express')
const router = express.Router();
const { isLoggedIn, isAuthor } = require('../middlewares/priviledges')
const { validateHotel, uploadPhotos, validateUser, editPhotos } = require('../middlewares/validators')
const {
    newHotelShow,
    newHotelCreate,
    showHotel,
    editHotelShow,
    editHotelSave,
    deleteHotel
} = require('../controllers/hotels')

router.get('/new', isLoggedIn, newHotelShow)

router.post('/', isLoggedIn, uploadPhotos, validateHotel, newHotelCreate)

router.get('/:ID/edit', isLoggedIn, isAuthor, editHotelShow)

router.route('/:ID')
    .get(showHotel)
    .put(isLoggedIn, isAuthor, editPhotos, validateHotel, editHotelSave)
    .delete(isLoggedIn, isAuthor, deleteHotel)

module.exports = router