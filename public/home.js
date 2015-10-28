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

    //RUNS WHEN DOM READY
    $(function uiComponents() {

        console.log('running');

        //INITIATE ACCORDION MODULE
        $('.ui.accordion').accordion();
    });

})(jQuery)