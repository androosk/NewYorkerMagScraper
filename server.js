const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')
const expressValidator = require('express-validator')
const passport = require('passport')
const config = require('./config/database')
const routes = require('./controllers/scraper_controller')
const users = require("./controllers/users")

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}))

require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

app.get('*', function(req,res,next){
  res.locals.user = req.user || null
  next()
})

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

mongoose.connect(process.env.MONGODB_URI || config.database, {useNewUrlParser: true, useFindAndModify: false})

app.use('/', routes)
app.use('/save', routes)
app.use('/mystuff', routes)
app.use('/delete', routes)
app.use('/single', routes)
app.use('/submitcomment', routes)
app.use('/user', users)

app.listen(PORT, ()=> {
  console.log(`Server is running at PORT ${PORT}`)
})
