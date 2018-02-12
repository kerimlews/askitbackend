// Modules

const config = require('./Infrastructure/Middlewares/customMiddleware');
const serverModules = require('./Infrastructure/Middlewares/serverMiddleware');
const connection = require('./Infrastructure/DbConnection/index');
const router = require('./Services/Router/router');
require('./Infrastructure/Auth/auth');

// Variables 

    const port = process.env.PORT || 3000;
    const server = serverModules.express();

// Initialization
    
    // Configuration;

    server.use(config.cors);
    server.disable('x-powered-by');
    server.use(config.bodyParser);
    server.use(config.passport);
    server.use(router);

    
    // Performance
    server.use(serverModules.morgan('common'));
    server.use(serverModules.helmet());
    server.use(serverModules.compression());

// Start server

server.listen(port, () => {
    console.log('Server started on port ' + port);
});
