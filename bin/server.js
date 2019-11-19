const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');

// PORT // based on express-generator
const normalizePort = val => {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;  
    }

    if (port >= 0) {
        return port;
    } 

    return false;
};

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

const onError = (error) => {
    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;

    }
};

// listener handler
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);

};

// server
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log(`API is alive on ${port}!`);