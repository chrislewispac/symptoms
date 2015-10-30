var Parse = require('parse-cloud-express').Parse;

Parse.Cloud.define("hello", function (request, response) {
    console.log('Ran cloud function.');
    // As with Parse-hosted Cloud Code, the user is available at: request.user
    // You can get the users session token with: request.user.getSessionToken()
    // Use the session token to run other Parse Query methods as that user, because
    //   the concept of a 'current' user does not fit in a Node environment.
    //   i.e.  query.find({ sessionToken: request.user.getSessionToken() })...
    response.success("Hello world! " + (request.params.a + request.params.b));
});


Parse.Cloud.afterSave('snps', function (request, response) {
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
    }();
    console.log('Ran afterSave on objectId: ' + request.object.id);
});


Parse.Cloud.beforeSave('TestObject', function (request, response) {
    console.log('Ran beforeSave on objectId: ' + request.object.id);
    response.success();
});

Parse.Cloud.afterSave('TestObject', function (request, response) {
    console.log('Ran afterSave on objectId: ' + request.object.id);
});

Parse.Cloud.beforeDelete('TestObject', function (request, response) {
    console.log('Ran beforeDelete on objectId: ' + request.object.id);
    response.success();
});

Parse.Cloud.afterDelete('TestObject', function (request, response) {
    console.log('Ran afterDelete on objectId: ' + request.object.id);
});