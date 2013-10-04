define(
    ["jquery", "lib/utils", "lib/bigInteger"],
    function( $, Utils ){
        var Hud = function( options ){
            var defaults    = {
                    money: BigInteger(0)
                },
                money;

            this.options    = Utils.merge( defaults, options );
            this.items      = [];

            this.items.push( this.hookIntoMoney() );

            this.bindEvents();
            this.refresh();
        }

        Hud.prototype.update = function( options ){
            this.options = Utils.merge( this.options, options );
        };

        Hud.prototype.refresh = function(){
            var index;
            for( index in this.items ){
                var item = this.items[index];
                if( item.hasOwnProperty( "refresh" ) && typeof item.refresh === "function" ){
                    item.refresh();
                }
            }
        };

        Hud.prototype.bindEvents = function(){
            var index;
            for( index in this.items ){
                var item = this.items[index];
                if( item.hasOwnProperty( "bindEvents" ) && typeof item.bindEvents === "function" ){
                    item.bindEvents();
                }
            }
        };

        Hud.prototype.hookIntoMoney = function(){
            var $amt            = $( "#money input" ),
                $moneyButton    = $( "#money .add-on" ),
                hud             = this;

            return {
                refresh: function(){
                    var past = BigInteger.parse( $amt.val() ),
                        now = hud.options.money;

                    $amt.val( now );

                    if( past.compare( now ) !== 0 ){
                        $amt.trigger( "change" );
                    }
                },
                bindEvents: function(){
                    $moneyButton.on( "mousemove", function(){
                        hud.options.money = BigInteger( hud.options.money ).multiply(20001).divide(20000);
                        $(this).blur();
                    });
                }
            }
        };

        return Hud;
    }
);
