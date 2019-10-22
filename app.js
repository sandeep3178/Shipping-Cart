var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var session = require('express-session')
var passport = require('passport');
var flash = require('connect-flash')
var userRouter = require('./routes/user')
var indexRouter = require('./routes/index');
var expresshbs = require('express-handlebars')
var MongoStore = require('connect-mongo')(session);

var port = process.env.PORT || 3000;
var app = express();


mongoose.connect('mongodb+srv://pristine:sandeep123@cluster0-7fxza.mongodb.net/shopping?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.log("error connection")
    }
    else {
      console.log('connection successful')
    }
  })

require('./config/passport')
// view engine setup
app.engine('.hbs', expresshbs({ defaultLayout: 'layout', extname: '.hbs' }));

app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
})

app.use('/user', userRouter)
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function () {
  console.log('Our app is running on http://localhost:' + port);
});


module.exports = app;
