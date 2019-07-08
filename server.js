const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')


const routes = require('./controllers/scraper_controller.js')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// app.use(methodOverride('_method'))

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/newYorkerScraper'
mongoose.connect(MONGODB_URI, {useNewUrlParser: true})

app.use('/', routes)

app.listen(PORT, ()=> {
  console.log(`Server is running at PORT ${PORT}`)
})
