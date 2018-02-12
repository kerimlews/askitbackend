// Variables

const serverModules = require('./serverMiddleware');

// Cors

const corsConfig = {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'application/json', 'X-Content-Range'],
    optionsSuccessStatus: 200
}

const cors = serverModules.cors();


// Merged two middleware body-parser

const bodyParser_json = serverModules.bodyParser.json();
const bodyParser_urlencoded = serverModules.bodyParser.urlencoded({ extended: true });

const bodyParser = (() => {
    var chain = serverModules.connect();
    [bodyParser_json, bodyParser_urlencoded].forEach((middleware) => {
      chain.use(middleware);
    });
    return chain;
  })();

// Merged two middleware passport

const passportIni = serverModules.passport.initialize();
const passportSession = serverModules.passport.session();

const passport = (() => {
    var chain = serverModules.connect();
    [passportIni, passportSession].forEach((middleware) => {
      chain.use(middleware);
    });
    return chain;
  })();

// Set Router

const router = serverModules.express.Router();

// Export
module.exports = {
    bodyParser,
    cors,
    router,
    passport
}