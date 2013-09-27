define(
    ["jquery", "lib/utils"],
    function( $, Utils ){
        var Hud = function( options ){
            var defaults    = {
                    money: 0
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
            for( index in this.items ){
                var item = this.items[index];
                if( item.hasOwnProperty( "refresh" ) && typeof item.refresh === "function" ){
                    item.refresh();
                }
            }
        };

        Hud.prototype.bindEvents = function(){
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
                    $amt.val( parseFloat(hud.options.money).toFixed( 2 ) );
                },
                bindEvents: function(){
                    $moneyButton.on( "click", function(){
                        hud.options.money += 20;
                        $(this).blur();
                    });
                }
            }
        };

        return Hud;
    }
);
