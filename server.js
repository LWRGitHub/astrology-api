// if (!process.env.PORT) {
//     require('dotenv').config()
//     process.env.NODE_ENV = "dev"
//   }
  
  const express = require('express');
  const path = require('path');
  const favicon = require('serve-favicon');
  const logger = require('morgan');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  const methodOverride = require('method-override')
  
  const app = express();
  
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  
  app.use(express.static(path.join(__dirname, 'public')));
  
  // override with POST having ?_method=DELETE or ?_method=PUT
  app.use(methodOverride('_method'))
  
  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  
  
  require('./routes/index.js')(app);

  /* istanbul ignore next */
if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}
  
  module.exports = app;