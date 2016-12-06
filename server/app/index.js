import path, {resolve} from 'path';
import express from 'express';

const app = express();
var forceSsl = function (req, res, next) {
   if (req.headers['x-forwarded-proto'] !== 'https') {
       return res.redirect(['https://', req.get('Host'), req.url].join(''));
   }
   return next();
};

if (process.env.NODE_ENV === 'production') {
     app.use(forceSsl);
}
// const env = require('path.join(rootPath, './server/env'));

// Export app
module.exports = app;

// Logging middleware
import logMiddleware from 'volleyball';
app.use(logMiddleware);

// Parsing middleware
import bodyParser from 'body-parser';
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

// Static middleware
import favicon from 'serve-favicon';
const faviconPath = path.join(__dirname, '../../public/favicon.ico');
const publicPath = path.join(__dirname, '../../public');

app.use(favicon(faviconPath));
app.use(express.static(publicPath));
app.use('/materialize-css', express.static(resolve(__dirname, '..', '..', 'node_modules', 'materialize-css', 'dist')));
app.use('/jquery', express.static(resolve(__dirname, '..', '..',  'node_modules', 'jquery', 'dist')))


// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));

// React-Router browserHistory requirement: this will handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).

app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, '../../browser/index.html'))
})

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
