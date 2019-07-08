const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
let result;

const url = "https://www.newyorker.com"

router.get('/', (req,res,html) => {
  puppeteer
    .launch()
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
      $('a h3').each(function(i, element) {
        result = {}
        result.title = $(this).text()
        result.link = url + $(this).parent('a').attr("href")
        console.log(result.title)
        console.log(result.link)
      })
    })
    .catch(function(err){
      console.log(err)
    })
  res.render('index')
})

module.exports = router
