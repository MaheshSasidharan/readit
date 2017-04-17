var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routes/index');

var app = express();
/* #PublicFolder */
app.use(express.static(path.join(__dirname, 'readitapp', 'app', 'dist')));

app.use(function(req, res, next) { 
    if (req.headers.origin) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.setHeader('Access-Control-Allow-Origin', "*");
    }
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.json({ code: err.status || 500, msg: err.message });
        /*
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
        */
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.json({ code: err.status || 500, msg: err.message });
});

module.exports = app;
