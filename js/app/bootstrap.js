require.config({
    "urlArgs": "_" + (new Date()).getTime(),
    "paths": {
        "lib": "../lib",

        "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min"
    },
    "shim": {
        "jquery": {
            "init": function( $ ){
                var local$ = $.noConflict( true );
                return local$;
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
