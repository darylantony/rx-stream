import path from 'path';
import http from 'http';
import socketIO from 'socket.io';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware'; // This line
import config from '../webpack.config.js';
import Observable from 'rxjs/observable';

const app = express();
const compiler = webpack(config);

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/public'));
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));
app.get('/', function (req, res, next) {
  res.render('index', {});
});

const server = http.createServer(app);
const io = socketIO(server);
io.on('connection', socket => {
  console.log('socket', socket);
});

server.listen(3000);
