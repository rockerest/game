define(
    ["jquery", "lib/utils", "BigInteger"],
    function( $, Utils ){
        var Hud = function( businesses ){
            this.businesses = businesses;
            this.items      = [];

            this.items.push( this.hook( "money" ) );
            this.items.push( this.hook( "product" ) );
            this.items.push( this.hook( "research" ) );

            this.bindEvents();
            this.refresh();
        }

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

        Hud.prototype.hook = function( into ){
            var $amt    = $( "#" + into + " input" ),
                $button = $( "#" + into + " .add-on" ),
                ucf     = into.charAt(0).toUpperCase() + into.slice(1)
                hud     = this;

                return {
                    refresh: function(){
                        var past    = BigInteger.parse( $amt.val() ),
                            now     = 0,
                            i;

                        for( i in hud.businesses ){
                            now = BigInteger( now ).add( hud.businesses[i]["modify" + ucf]() );
                        }

                        $amt.val ( now );

                        if( past.compare( now ) !== 0 ){
                            $amt.trigger( "change" );
                        }
                    },
                    bindEvents: function(){
                        var i;

                        $button.on( "click", function(){
                            for( i in hud.businesses ){
                                hud.businesses[i]["modify" + ucf]( 1 );
                            }
                        });
                    }
                };
        };

        return Hud;
    }
);
