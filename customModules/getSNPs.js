 var getSNPs = function () {

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

         //console.log(body.results.length);
         var newArray = [];

         for (i = 0; i < body.results.length; i++) {
             newArray.push(body.results[i].rs);
         }

         //console.log(newArray);

         var sorted_arr = newArray.sort();

         var uniqArrayOfSNP = [];
         for (var i = sorted_arr.length - 1; i >= 0; i--) {
             if (sorted_arr[i - 1] !== sorted_arr[i]) {
                 uniqArrayOfSNP.push(sorted_arr[i]);
             }
         }

         getSNPs = uniqArrayOfSNP.join("%20");
         app.set('scope', getSNPs + '%20genomes%20names');
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

 module.exports = function (injectedVariable) {
     return {
         somePublicMethod: function () {},
         anotherPublicMethod: function () {},
     };
 };