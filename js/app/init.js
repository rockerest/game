define(
    ["jquery", "main", "hud", "dom"],
    function( $, Main, Hud, Dom ){
        var Init = {};

        Init.startApp = function(){
            $(function(){
                Main.init( (new Hud({
                    money: 99999999
                })) );

                Dom.bindEvents();

                setInterval( function(){
                    Main.loop();
                }, 50 );
            });
        };

        return Init;
    }
);
