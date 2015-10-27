(function appModule($) {


    //SET GLOBAL CONFIGURATIONS IN IIFE
    var appConfig = function () {

        //INITIALIZE PARSE
        Parse.initialize(
            "OXrgauxvwBSl8F0PZ5GolOS9a097JFk3gPpHckqg",
            "uzKaAcJiOWszwU0h4ei8eXMcyMgyNw2c7AjH7F4T"
        );

        var _andMe = {
            client_id: 'e361afa06e36942902b04cb8c05e540d',
            client_secret: '4bc3ca7d6ccb84406fa0cad2dcd8c2fc'
        }

        // Object literal
        return {
            andMe: _andMe,
        }
    }();

    var user = new Parse.User();
    user.set("username", "test");
    user.set("password", "test");
    user.set("email", "test@test.com");

    // other fields can be set just like with Parse.Object
    user.set("phone", "650-555-0000");

    user.signUp(null, {
        success: function (user) {
            // Hooray! Let them use the app now.
            console.log(user);
        },
        error: function (user, error) {
            // Show the error message somewhere and let the user try again.
            console.log(user);
            console.log(error);
        }
    });

    //console.log(appConfig.andMe);

    //RUNS WHEN DOM READY
    $(function uiComponents() {

        console.log('running');

        //        //INSTANTIATE GLOBAL 23&me VARIABLE WITH CLIENT_ID
        //        var ttam = TTAM(appConfig.andMe.client_id);
        //
        //        //APPLY CONNECT BUTTON TO DOM BUTTON 'WRAPPER'
        //        ttam.connectButton('wrapper', ["basic", "rs1234"]);

        // INITIATE ACCORDION MODULE
        //        $('.ui.accordion').accordion();
    });

})(jQuery)