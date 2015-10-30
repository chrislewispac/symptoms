 var request = require('request');
 var app = require('../server.js');

 var parseData = {};
 var SNPs = '';
 var getSNPs = function () {
     console.log('RUNNING PARSE GET FUNCTION');
     var ParseHeaders = function () {
         var _headers = {
             'x-parse-rest-api-key': 'gD7j2a8ifsrqiusHIDTiD3j7nMfZ1TTwqwVAHjty',
             'x-parse-application-id': 'OXrgauxvwBSl8F0PZ5GolOS9a097JFk3gPpHckqg',
         };

         return {
             headers: _headers
         }
     }();

     function formatQueryString(body) {

         var newArray = [];

         for (i = 0; i < body.results.length; i++) {
             newArray.push(body.results[i].rs);
         }

         var sorted_arr = newArray.sort();

         var uniqArrayOfSNPs = [];
         for (var i = sorted_arr.length - 1; i >= 0; i--) {
             if (sorted_arr[i - 1] !== sorted_arr[i]) {
                 uniqArrayOfSNPs.push(sorted_arr[i]);
             }
         }

         parseData = body.results;
         SNPs = uniqArrayOfSNPs.join("%20");
         console.log(uniqArrayOfSNPs);
         app.set('uniqArrayOfSNPs', uniqArrayOfSNPs)
         app.set('parseData', parseData);
         app.set('SNPs', SNPs);
         app.set('scope', SNPs + '%20genomes%20names');
     };

     request.get({
         url: 'https://api.parse.com/1/classes/snps',
         headers: ParseHeaders.headers,
         json: true
     }, function (err, res, body) {
         if (!err && res.statusCode === 200) {
             formatQueryString(body);
         }
     });
 };

 module.exports = getSNPs;