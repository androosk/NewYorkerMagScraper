# The New Yorker Magazine Aggregator
![Screenshot](screenshot.png)
Keep track of your favorite The New Yorker Magazine articles in one place with this full stack web application. Users can create a secure user account, login, logout, save favorite articles to their personal page, make notes on saved articles, edit and delete notes and articles. Articles are stored in a REST api running on a mongo database instance. This app has full CRUD functionality.

## Getting Started
### Prerequisites
The New Yorker Magazine Aggregator uses the following tools and frameworks
- axios - for making calls to the api
- bcryptjs - encryption for user authorization
- puppeteer - headless browser used to scrape and convert The New Yorker's React framework front end into readable html
- cheerio - used to scrape the html code scraped by puppeteer and create database table entries
- express - web server framework
- express-flash - creates flash messages for communicating authentication information to users
- express-handlebars - handlebars templating engine for front end
- express-messages - used to create messages to users regarding success of API calls
- express-session - used to create an authenticated session state via passport so the app can know the user is logged in
- express-validator - validates user information with passport
- handlebars-helpers - expands handlebars library
- mongoose - MongoDB ORM
- passport - creates user authentication
- passport-local - creates a local passport validation session

### To run The New Yorker Magazine Aggregator on your local machine open CLI of your choice
#### Clone to your local computer :octocat:
```sh
$ git clone https://github.com/androosk/NewYorkerMagScraper.git
```
#### Install NPM Dependencies
```sh
$ cd NewYorkerMagScraper
```
```sh
$ npm install
```
#### Start MongoDB - In a new CLI window
```sh
$ mongod
```
#### Run Project
```sh
$ npm run server
```
#### In your web browser go to address localhost:3000

## Deployment Link :link:
This app is deployed to Heroku at
https://newyorkerscraper.herokuapp.com/
