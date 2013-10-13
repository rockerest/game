require.config({
    "urlArgs": "_" + (new Date()).getTime(),
    "paths": {
        "lib": "../lib",

        "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min",

        "BigInteger": "../lib/bigInteger",
        "underscore": "../lib/underscore/underscore"
    },
    "shim": {
        "jquery": {
            "init": function( $ ){
                var local$ = $.noConflict( true );
                return local$;
            }
        },
        "BigInteger": {
            "exports": "BigInteger"
        },
        "underscore": {
            "exports": "_",
            "init": function(){
                var local_ = window._;
                delete window._;
                return local_;
            }
        }
    }
});

require(
    ["init"],
    function( Init ){
        Init.startApp();
    }
);
