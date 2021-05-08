const Hotel = require('./models/hotels')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/alhotel', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Mongo connect succesful')
});

const product = new Hotel({
    name: 'Hotel international luxury definition aggregate',
    price: 90,
    description: 'this is magnificient',
    location: 'tirana'
})

product.save().then(res => console.log(res)).catch(e => console.log(e))
