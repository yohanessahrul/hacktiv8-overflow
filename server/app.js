var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb://yosa:123@ds257589.mlab.com:57589/hacktivoverflow')
console.log('App listening on port 3000')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Database connected!')
})

var api = require('./routes/index')
var apiUser = require('./routes/user')
var apiQuestion = require('./routes/question')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.status(200).json({
    msg: 'Selamat datang di Api Hacktiv Overflow'
  })
})
app.use('/api/users', apiUser)
app.use('/api/questions', apiQuestion)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
