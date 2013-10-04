define(
    ["jquery", "lib/utils"],
    function( $, Utils ){
        var Dom = {};

        Dom.bindEvents = function(){
            Dom.bindInteractivity();
        };

        Dom.bindInteractivity = function(){
            $( "input.scales" ).on( "change", function(){
                Dom.scaleInput( this );
            });
        };

        Dom.scaleInput = function( input ){
            var $input = $( input ),
                id, $sizer, data;

            data = $input.data();

            if( data.sizer === undefined ){
                id = "scales-sizer-" + ( new Date().getTime() );
            }
            else{
                id = data.sizer;
            }

            $input.data( "sizer", id );
            $sizer = $( "span#" + id );

            if( $sizer.length < 1 ){
                $sizer = $( "<span id=\"" + id + "\"></span>" );
            }

            $sizer
                .css( Utils.getCss( $input[0] ) )
                .width( "auto" )
                .text( $input.val() )
                .insertAfter( $input )
                .hide();

            if( $input.width() !== $sizer.width() ){
                $input.animate({
                    width: $sizer.width() + 20
                }, 200);
            }
        };

        return Dom;
    }
);
