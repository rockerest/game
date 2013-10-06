define(
    ["hud"],
    function( Hud ){
        var Main = {},
            hud;

        Main.init = function( businesses ){
            hud = new Hud( businesses );
        };

        Main.loop = function(){
            hud.refresh();
        };

        return Main;
    }
);
