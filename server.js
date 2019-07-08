require("dotenv").config();
import express, { static, urlencoded, json } from 'express';
import exphbs from 'express-handlebars';
import { connect } from 'mongoose';


import routes from './controllers/scraper_controller.js';

const PORT = process.env.PORT || 3000
const app = express()

app.use(morgan('dev'))
app.use(static('public'))
app.use(urlencoded({ extended: true}))
app.use(json())

// app.use(methodOverride('_method'))

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/newYorkerScraper'
connect(MONGODB_URI, {useNewUrlParser: true})

app.use('/', routes)

app.listen(PORT, ()=> {
  console.log(`Server is running at PORT ${PORT}`)
})
