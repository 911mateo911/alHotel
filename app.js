const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Hotel = require('./models/hotels')
const methodOverride = require('method-override')
mongoose.connect('mongodb://localhost:27017/alhotel', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const app = express()
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongo connect succesful')
});
mongoose.set('useFindAndModify', false);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

app.get('/', async (req, res) => {
    const mostVisited = await Hotel.find({})
    res.render('homePage', { mostVisited })
})

// New hotel page
app.get('/hotel/new', (req, res) => {
    const hotel = {
        name: '',
        price: '',
        description: '',
        location: ''
    }
    res.render('newHotel', { hotel, method: 'POST' })
})
// New hotel save
app.post('/hotel', async (req, res) => {
    const { name, price, description, location } = req.body
    const hotel = new Hotel({
        name: name,
        price: price,
        description: description,
        location: location
    })
    await hotel.save()
    res.redirect(`/hotel/${hotel._id}`)
})

// Show hotel
app.get('/hotel/:ID', async (req, res) => {
    const { ID } = req.params
    const hotel = await Hotel.findOne({ _id: ID })
    res.render('show', { hotel })
})

// Hotel edit
app.get('/hotel/:ID/edit', async (req, res) => {
    const { ID } = req.params
    const hotel = await Hotel.findOne({ _id: ID })
    res.render('newHotel', { hotel, method: 'PUT' })
})

// Save hotel edited
app.put('/hotel/:ID', async (req, res) => {
    const { name, price, description, location } = req.body
    const { ID } = req.params
    await Hotel.findOneAndUpdate({ _id: ID }, {
        name: name,
        price: price,
        description: description,
        location: location
    })
    res.redirect(`/hotel/${ID}`)
})

// Delete hotel
app.delete('/hotel/:ID', async (req, res) => {
    const { ID } = req.params
    await Hotel.findOneAndDelete({ _id: ID })
    res.redirect('/')
})

app.use((req, res) => {
    res.send('not found')
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})