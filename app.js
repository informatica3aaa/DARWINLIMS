import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import favicon from 'serve-favicon';
import flash from 'connect-flash';
import logger from 'morgan';
import path from 'path';
import useragent from 'express-useragent';
import numeral from 'numeral';
import testConnection from './lib/db/test_connection';

import ApiRouter from './routes/api';

class App {
  constructor(config) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
    const cors = require('cors');
    const bodyParser = require('body-parser');
    this.port = config.port;
    this.sessionSecret = config.session_secret;
    this.express = express();
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(bodyParser.json());
    this.express.use(cors());
  }

  start() {
    return this.express.listen(this.port, function () {
      console.log('Minerals API iniciada en puerto ' + this.port);
      testConnection();
    }.bind(this));
  }

  initialize() {
    this.configureMiddleware();
    this.configureRoutes();
    numeral.locale('es');
  }

  configureMiddleware() {
    var expressApp = this.express;
    expressApp.use(compression({filter: this.shouldUseCompressMiddleware}))
    expressApp.use(logger('dev'));
    //expressApp.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    expressApp.use(cookieParser());
    expressApp.use(bodyParser.urlencoded({extended: true, limit:'20mb', parameterLimit: 20000}));
    expressApp.use(bodyParser.json({limit:'20mb'}));
    var MssqlStore = require('mssql-session-store')(session);
    expressApp.use(session({
      secret: '901238SSDKF9844HFSDFK9243JSD',
      resave: false,
      saveUninitialized: false,
      store: new MssqlStore({ reapInterval: 10, ttl: 10 })
    }));
    expressApp.use(flash());
    expressApp.use(useragent.express());

    expressApp.use(this.errorHandler);
  }

  configureRoutes() {
    var expressApp = this.express;
    expressApp.use('/api', new ApiRouter());
  }

  shouldUseCompressMiddleware(req, res) {
    //return false;
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false
    }
    // fallback to standard filter function
    return compression.filter(req, res);
  }

  errorHandler(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }

  


}

export default App;
