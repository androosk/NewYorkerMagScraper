const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

const db = require("../models")

const url = "https://www.newyorker.com"

router.get('/', (req,res) => {
  db.Article.find({})
    .then(function(dbArticle) {
      if(req.user !== undefined){
        const finder = req.user.id
        for(i=0;i<dbArticle.length;i++){
          if (dbArticle[i].favorited.includes(finder)) {
            dbArticle[i]["favorite"] = ["saved"]
          } else {
            dbArticle[i]["favorite"] = ["save article"]
          }
        }
      } else {
        for(i=0;i<dbArticle.length;i++){
          dbArticle[i]["favorite"] = ["save article"]
        }
      }
      console.log("displaying articles")
      res.render('index', { articles: dbArticle });
    })
    .catch(function(err) {
      console.log(err);
    });
})

router.get('/scrape', (req,res,html) => {
  puppeteer
    .launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    .then(function(browser){
      console.log('puppeteer success')
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
        result.link = $(this).parent('a').attr("href")
        console.log(result)
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
    console.log("Hitting the mystuff route")
    const finder = req.user.id
    db.Article.find({ favorited: { $all: [finder]} })
    .then(function(dbArticle) {
      if(!dbArticle.length) {
        console.log("no records found")
        res.render('errorhandler', { thisstuff: {
          text: "Nothing here. Go back and save some articles!",
          link: "/",
          buttontext: "View Articles"
      }}) } else {
        for(let i=0;i<dbArticle.length;i++) {
          if(dbArticle[i].comment){
            db.Comment.findById(dbArticle[i].comment)
              .then(function(dbComment) {
                 dbArticle[i]["arComment"] = dbComment.comment
              })
          }
        }
        console.log("displaying articles")
        res.render('mystuff', { mystuff: dbArticle })
      }
    })
    .catch(function(err) {
      console.log(err)
    });
  }
})
router.put('/save/:id', function(req,res,next){
  let result = {}
  result = {
    _id: req.params.id,
    favorited: req.user.id
    }
    db.Article.findByIdAndUpdate(result._id, { $push: {favorited: result.favorited}})
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
})
router.delete('/delete/:id', function(req, res, next){
  let result = {}
  result = {
    _id: req.params.id,
    favorited: req.user.id
  }
  db.Article.findByIdAndUpdate(result._id, { $pullAll: {favorited: [result.favorited]}})
    .then(function(){
      console.log("article deleted from favorites")
      next()
    })
})
router.get('/single/:id', function(req,res){
  db.Article.find({ _id: req.params.id })
    .then(function(dbArticle){
      res.render("single", {
        Article: dbArticle[0]
    }) 
  })
})
router.post("/submitcomment/:id", function(req, res) {
  db.Comment.create(req.body)
    .then(function(dbComment) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true })
    .then(function(dbArticle){
      res.redirect("/mystuff") 
    })
  })
})

module.exports = router
