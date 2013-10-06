define(
    ["main", "business"],
    function( Main, Business ){
        var Ui = {};

        Ui.startup = function(){
            var business = new Business({
                    money: 10000,
                    product: 15,
                    research: 0
                }),
                businesses = [business];

            Main.init( businesses );

            setInterval( function(){
                Main.loop();
            }, 50 );
        };

        return Ui;
    }
);
