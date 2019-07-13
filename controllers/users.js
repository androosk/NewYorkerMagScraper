const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

router.use(express.urlencoded({ extended: true}))
router.use(express.json())

const User = require("../models/User")

router.get("/register", function(req, res){
  res.render('register')
})
router.get('/login', function(req, res){
  res.render('login')
})

router.post('/register', function(req,res){
  const name = req.body.name
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password
  const password2 = req.body.password2

  req.checkBody("name", "Name is required").notEmpty()
  req.checkBody("email", "Email is required").notEmpty()
  req.checkBody("email", "Email is not valid").isEmail()
  req.checkBody("username", "Userame is required").notEmpty()
  req.checkBody("password", "Password is required").notEmpty()
  req.checkBody("password2", "Passwords do not match").equals(req.body.password)

  let errors = req.validationErrors()
  
  if(errors){
    console.log(errors)
    res.render('register', {
      errors: errors
    })
  }
  else {
  let newUser = ({
    name: name,
    email: email,
    username: username,
    password: password
  })
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newUser.password, salt, function(err, hash){
      if(err){
        console.log("THERE WAS AN ERROR",err)
      }
      newUser.password = hash
      User.create(newUser)
        .then(function(){
        res.redirect('./login')
        })
        .catch(function(err){
          console.log("THERE WAS AN ERROR HERE INSTEAD", err)
        })
      })
    })
  }
})

router.post('/login', function(req,res,next){
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: './login',
  })(req, res, next)
})

router.get('/logout', function(req,res){
  req.logout()
  res.redirect('/')
})


module.exports = router