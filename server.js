 //Require Node Modules
 var http = require('http'),
     express = require('express'),


     expose = require('express-expose'),


     path = require('path'),
     routes = require('./routes'),
     Parse = require('parse/node'),
     ParseCloud = require('parse-cloud-express'),
     request = require('request');

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
 });

 // Import your cloud code (which configures the routes)
 require('./cloud/main.js');

 // Mount the webhooks app to a specific path (used in scripts/register-webhooks.js)
 app.use('/webhooks', ParseCloud.app);

 var getSNPs = require('./getSNPs');

 getSNPs();

 //
 // var parseData = {};
 // var SNPs = '';
 // var getSNPs = function () {
 //     console.log('RUNNING PARSE GET FUNCTION');
 //
 //     var ParseHeaders = function () {
 //         var _headers = {
 //             'x-parse-rest-api-key': 'gD7j2a8ifsrqiusHIDTiD3j7nMfZ1TTwqwVAHjty',
 //             'x-parse-application-id': 'OXrgauxvwBSl8F0PZ5GolOS9a097JFk3gPpHckqg',
 //         };
 //
 //         return {
 //             headers: _headers
 //         }
 //     }();
 //
 //     function formatQueryString(body) {
 //
 //         var newArray = [];
 //
 //         for (i = 0; i < body.results.length; i++) {
 //             newArray.push(body.results[i].rs);
 //         }
 //
 //         var sorted_arr = newArray.sort();
 //
 //         var uniqArrayOfSNPs = [];
 //         for (var i = sorted_arr.length - 1; i >= 0; i--) {
 //             if (sorted_arr[i - 1] !== sorted_arr[i]) {
 //                 uniqArrayOfSNPs.push(sorted_arr[i]);
 //             }
 //         }
 //
 //         parseData = body.results;
 //         SNPs = uniqArrayOfSNPs.join("%20");
 //         app.set('uniqArrayOfSNPs', uniqArrayOfSNPs)
 //         app.set('parseData', parseData);
 //         app.set('SNPs', SNPs);
 //         app.set('scope', SNPs + '%20genomes%20names');
 //     };
 //
 //     request.get({
 //         url: 'https://api.parse.com/1/classes/snps',
 //         headers: ParseHeaders.headers,
 //         json: true
 //     }, function (err, res, body) {
 //         if (!err && res.statusCode === 200) {
 //             formatQueryString(body);
 //         }
 //     });
 // }();

 app.get('/', function (res, req) {
     routes.index(res, req, app.get('scope'), app.get('SNPs'), app.get('parseData'), app.get('uniqArrayOfSNPs'));
 });

 app.get('/receive_code/', function (res, req) {
     routes.receive_code(res, req, app.get('scope'), app.get('SNPs'));
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