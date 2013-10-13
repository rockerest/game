define(
    ["jquery", "underscore", "BigInteger"],
    function( $, _ ){
        var Hud = function( businesses ){
            this.businesses = businesses;
            this.items      = [];

            this.items.push( this.hook( "money" ) );
            this.items.push( this.hook( "product" ) );
            this.items.push( this.hook( "research" ) );

            _.each( businesses, function( business ){
                this.integrate( business );
                this.items.push( business );
            }, this );

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
                else if( item instanceof this.businesses[0].constructor && typeof item.refresh === "function" ){
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
                else if( item instanceof this.businesses[0].constructor && typeof item.bindEvents === "function" ){
                    item.bindEvents();
                }
            }
        };

        Hud.prototype.integrate = function( business ){
            var $newBiz = $( "<div></div>" );

            $newBiz.append( "<span>" + business.getMoney() + "</span><br />" );
            $newBiz.append( "<span>" + business.getProduct() + "</span><br />" );
            $newBiz.append( "<span>" + business.getResearch() + "</span>" );

            business.setContainer( $newBiz );

            $( "#businesses" ).append( $newBiz );
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
