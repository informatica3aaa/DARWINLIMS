import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import flash from 'connect-flash';
import logger from 'morgan';
import useragent from 'express-useragent';
import numeral from 'numeral';
import testConnection from './lib/db/test_connection';
import connectionIcp from './lib/db/connectionIcp';
import verificaToken from './lib/helpers/verificatoken';
import ApiRouter from './routes/api';
import AuthRouter from './routes/api/auth';
import dotenv from 'dotenv';
import config from '@babel/core/lib/config';
const  { swaggerDocs: V1swagger} = require( './routes/swagger');


class App {
  constructor(config) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
    const cors = require('cors');
    const bodyParser = require('body-parser');

    this.port = config.port;
    this.port1 = config.port1
    // console.log("port1", this.port, this.port1);
    this.sessionSecret = config.session_secret;
    this.express = express();
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.json({limit:"10mb"}));
    this.express.use(cors());
    dotenv.config();
  }

  start() {
      return this.express.listen(this.port, function () {
      console.log('Minerals API iniciada en puerto ' + this.port);
      testConnection();
      // connectionIcp();
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
    expressApp.use(flash());
    expressApp.use(useragent.express());

    expressApp.use(this.errorHandler);

  }

  configureRoutes() {
    var expressApp = this.express;
    // expressApp.use('/api',  new ApiRouter());
    expressApp.use('/api', verificaToken, new ApiRouter());
    // expressApp.use('/api', new ApiRouter());
    expressApp.use('/auth', new AuthRouter());

    expressApp.listen(this.port1, () => {
      console.log("Server Swagger Port: " + this.port1 );
      V1swagger(expressApp, this.port1)
    });
    
  }

  shouldUseCompressMiddleware(req, res) {
    if (req.headers['x-no-compression']) {
      return false
    }
    return compression.filter(req, res);
  }

  errorHandler(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
  }
  
  catch404(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  };

  


}

export default App;
