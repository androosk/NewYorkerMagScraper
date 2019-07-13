const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

const db = require("../models")

const url = "https://www.newyorker.com"

// router.get('/mystuff', function(req, res){
//   res.render('mystuff')
// })

router.get('/', (req,res) => {
  db.Article.find({})
    .then(function(dbArticle) {
      console.log("displaying articles")
      res.render('index', { articles: dbArticle });
    })
    .catch(function(err) {
      res.json(err);
    });
})

router.get('/scrape', (req,res,html) => {
  puppeteer
    .launch({ args: ['--no-sandbox'] })
    .then(function(browser){
      return browser.newPage()
    })
    .then(function(page){
      return page.goto(url).then(function(){
        return page.content()
      })
    })
    .then(function(html){
      const $ = cheerio.load(html)
      $('a h3').each(function() {
        result = {}
        result.title = $(this).text()
        result.link = url + $(this).parent('a').attr("href")
        db.Article.create(result)
          .then(function(){
            console.log("article added to database")
          })
          .catch(function(err){
            console.log(err)
          })
      })
      console.log("scrape complete")
      res.redirect("/")
    })
    .catch(function(err){
      console.log(err)
    })
})
router.get('/mystuff', function(req, res){
  if(!req.user){
    res.redirect('/')
  } else {
    console.log(req.user.id)
    console.log('nothing to see here')
    db.Mystuff.countDocuments(function(err, count){
      if( count === 0){
        console.log("no records found")
        res.render('errorhandler', { thisstuff: {
          text: "Nothing here. Go back and save some articles!",
          link: "/",
          buttontext: "View Articles"
        } })
       } else {
        console.log("Found Records: ", count)
        db.Mystuff.find({ user: req.user.id })
        .populate('username')
        .then(function(err, dbArticle) {
          console.log("displaying articles")
          console.log(dbArticle)
          // res.render('mystuff', { mystuff: dbArticle })
        })
        .catch(function(err) {
          console.log(err)
        });
      }
    })
  }
})
router.post('/save/:id', function(req,res,next){
  let result = {}
  result = {
    article: req.params.id,
    user: req.user.id
    }
    console.log(result.article, result.user)
    db.Mystuff.create(result)
    .then(function(){
      console.log("article added to favorites")
      res.redirect("/")
    })
})
router.get('/error', function(req,res){
  console.log("no user found")
  res.render('errorhandler', { thisstuff: {
    text: "You have to be logged in to do that!",
    link: "/user/login",
    buttontext: "Go To Login/Join"
  } })
  console.log("should've hit it")
})


module.exports = router
