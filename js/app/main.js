define(
    function(){
        var Main = {},
            storedHud;

        Main.init = function( hud ){
            storedHud = hud;
        };

        Main.loop = function(){
            storedHud.refresh();
        };

        return Main;
    }
);
