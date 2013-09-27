define(
    ["jquery", "main", "hud"],
    function( $, Main, Hud ){
        var Init = {};

        Init.startApp = function(){
            var hud;

            $(function(){
                Main.init( (new Hud()) );

                setInterval( function(){
                    Main.loop();
                }, 50 );
            });
        };

        return Init;
    }
);
