'use strict';

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class Serve {
    constructor() {

    }

    serve(options) {
        const pathToWebpackDevServer = path.resolve(__dirname, './../node_modules/.bin/webpack-dev-server');
        const pathToWebpackDevServerConfig = path.resolve(__dirname, './../configs/webpack.config.js');
        const portNumber = options.port || 8080;
        const webpackDevServer = spawn(pathToWebpackDevServer, ['--config', pathToWebpackDevServerConfig, '--port', portNumber]);

        webpackDevServer.stdout.on('data', (data) => {
            console.log(chalk.green(data.toString()));
        });

        webpackDevServer.stderr.on('data', (data) => {
            console.error(chalk.red(data.toString()));
        });

    }
}

function serve(options) {
    const server = new Serve();

    if (options.env === 'prod') {
        server.serve(options);
    } else {
        server.serve(options);
    }
}

module.exports = serve;