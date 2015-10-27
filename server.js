 //Require Node Modules
 var http = require('http'),
     express = require('express'),
     path = require('path'),
     routes = require('./routes'),
     Parse = require('parse/node'),
     ParseCloud = require('parse-cloud-express');

 var app = express();


 var express = require('express'),
     routes = require('./routes'),
     http = require('http'),
     path = require('path');

 var app = express();

 app.configure(function () {
     app.set('views', __dirname + '/views');
     app.set('view engine', 'jade');
     app.use(express.favicon());
     app.use(express.logger('dev'));
     app.use(express.bodyParser());
     app.use(express.methodOverride());
     app.use(express.cookieParser('oiybvoaryibvaoibryopypviunabrwpv893'));
     app.use(express.session({
         secret: 'oiybvoaryibvaoibryopypviunabrwpv893'
     }));
     app.use(app.router);
     app.use(express.static(path.join(__dirname, 'public')));
     app.set('scope', 'rs1057910%20genomes%20names');
 });

 // Import your cloud code (which configures the routes)
 require('./cloud/main.js');

 // Mount the webhooks app to a specific path (must match what is used in scripts/register-webhooks.js)
 app.use('/webhooks', ParseCloud.app);

 // app.get('/', function (req, res) {
 //     res.render('home', {
 //         sayHelloTo: 'chris'
 //     });
 // });

 app.get('/', function (res, req) {
     routes.index(res, req, app.get('scope'));
 });
 app.get('/receive_code/', function (res, req) {
     routes.receive_code(res, req, app.get('scope'));
 });

 //Catch all unknown routes.
 app.all('/', function (request, response) {
     response.status(404).send('not found.');
 });

 /*
  * Launch the HTTP server
  */
 var port = process.env.PORT || 5000;
 var server = http.createServer(app);
 server.listen(port, function () {
     console.log('Cloud Code Webhooks server running on port ' + port + '.');
 });