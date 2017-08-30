require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
const compression = require('compression');
const { parse } = require('url');
const next = require('next');
const mobxReact = require('mobx-react');
const mongoose = require('mongoose');
const { User } = require('./schema');
const serve = (subpath, cache) =>
  express.static(path.resolve(__dirname, subpath), {
    maxAge: cache && !dev ? 1000 * 60 * 60 * 24 * 30 : 0,
  });

// Set up some globals.
const { NODE_ENV, PORT, DB_HOST, DB_USER, DB_PASS } = process.env;
const dev = NODE_ENV !== 'production';
const port = dev ? 1337 : PORT || 8080;

// Set up next.js.
const app = next({ dev });
const handle = app.getRequestHandler();

// Set up MobX for SSR.
mobxReact.useStaticRendering(true);

// Set up the database.
mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/other`);
mongoose.Promise = global.Promise;

// Some security middlewares,
const security = [
  hpp(),
  helmet.xssFilter(),
  helmet.frameguard('deny'),
  helmet.ieNoOpen(),
  helmet.noSniff(),
];

app.prepare().then(() => {
  const server = express();

  // Body parser.
  server.use(bodyParser.json());

  // Use CORS.
  server.use(cors());

  // Use HPP & helmet for security.
  server.use(...security);

  // Use compression.
  server.use(compression());

  // Static files
  server.use('/static', serve('./static', true));

  // Offline support
  server.use('/service-worker.js', serve('../.next/service-worker.js', true));
  server.use('/manifest.json', serve('../static/manifest.json', true));

  // (Example) Route to get user.
  server.get('/api/user/:id', (req, res) => {
    User.findOne({ id: req.params.id }, (err, data) => {
      if (data) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.send(JSON.stringify(data));
      } else {
        return res.sendStatus(404);
      }
    });
  });

  // For all other routes, use next.js.
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`${'\u2705'}  Ready on http://localhost:${port}`);
  });
});
