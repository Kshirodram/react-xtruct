'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class Serve {
    constructor() {
    }

    static run(options, callback) {
        let webpackDevServer;
        const webpackDevServerConfig = path.resolve(__dirname, './../configs/webpack.config.js');
        const portNumber = options.cmd.options.port || 8080;

        process.env.NODE_ENV = options.cmd.options.env || 'dev';

        try {
            webpackDevServer = path.resolve(__dirname, './../node_modules/.bin/webpack-dev-server');
            fs.statSync(webpackDevServer);
        } catch (e) {
            webpackDevServer = path.resolve(process.cwd(), './node_modules/.bin/webpack-dev-server');
        }

        const cmd = spawn(webpackDevServer, ['--config', webpackDevServerConfig, '--port', portNumber], {stdio: 'inherit'});

        cmd.on('error', (data) => {
            callback(data, null);
        });

        cmd.on('close', (code) => {
            callback(null, code);
        });
    }
}

module.exports = Serve;