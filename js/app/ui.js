define(
    ["main", "business"],
    function( Main, Business ){
        var Ui = {};

        Ui.startup = function(){
            var businesses = [];

            for( i = 0; i < 100; i++ ){
                businesses.push( new Business({
                    money: 1000000,
                    product: 150,
                    research: 0
                }) );
            }

            Main.init( businesses );

            setInterval( function(){
                Main.loop();
            }, 50 );
        };

        return Ui;
    }
);
