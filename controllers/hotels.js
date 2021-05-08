const Hotel = require('../models/hotels')
const asyncWrap = require('../middlewares/asyncWrap')
const { cloudinary } = require('../cloudinary')

module.exports.newHotelShow = (req, res) => {
    const hotel = {
        name: '',
        price: '',
        description: '',
        location: '',
        contact: ''
    }
    res.render('hotels/newHotel', {
        hotel,
        method: 'POST',
        title: 'Add a new hotel',
        subtitle: 'Make it easy for the next destination'
    })
}

module.exports.newHotelCreate = asyncWrap(async (req, res) => {
    const hotel = new Hotel(req.body.hotel)
    hotel.photo = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }))
    hotel.author = req.user._id
    hotel.avgReviews = 0
    hotel.seen = 0
    await hotel.save()
    req.flash('success', 'Success :)')
    res.redirect(`/places/${hotel._id}`)
})

module.exports.showHotel = asyncWrap(async (req, res) => {
    const { ID } = req.params
    const hotel = await Hotel.findByIdAndUpdate(ID, { $inc: { seen: 1 } }, { new: true }).populate('author').populate({
        path: 'reviews', populate: { path: 'author' },
        options: { sort: { dateCreated: 'desc' } }
    })
    res.render('hotels/show', {
        hotel,
        title: `${hotel.name}`
    })
})

module.exports.editHotelShow = asyncWrap(async (req, res) => {
    const { ID } = req.params
    const hotel = await Hotel.findById(ID)
    res.render('hotels/newHotel', {
        hotel,
        method: 'PUT',
        title: `Edit ${hotel.name}`,
        subtitle: 'Did you write something wrong?'
    })
})

module.exports.editHotelSave = asyncWrap(async (req, res) => {
    const { ID } = req.params
    const hotel = await Hotel.findOneAndUpdate({ _id: ID }, req.body.hotel)
    const images = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }))
    hotel.photo.push(...images)
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename)
        }
        await hotel.updateOne({ $pull: { photo: { filename: { $in: req.body.deleteImages } } } })
        hotel.photo = hotel.photo.filter((el) => !req.body.deleteImages.includes(el.filename))
    }
    await hotel.save()
    req.flash('success', 'Success :)')
    res.redirect(`/places/${ID}`)
})

module.exports.deleteHotel = asyncWrap(async (req, res) => {
    const { ID } = req.params
    const hotel = await Hotel.findById(ID)
    for (let photo of hotel.photo) {
        await cloudinary.uploader.destroy(photo.filename)
    }
    await Hotel.findOneAndDelete({ _id: ID })
    req.flash('success', "It's Gone")
    res.redirect('/')
})