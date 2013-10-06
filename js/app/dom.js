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

            $( "#menu > a" ).on( "click", function( event ){
                $( "#menu ." + $(this).data( "toggle" ) ).toggleClass( "open" );
                event.stopPropagation();
            });

            $( document ).on( "click", function(){
                $( ".clickAnyToClose, .clickOutsideToClose" ).removeClass( "open" );
            });

            $( ".clickOutsideToClose" ).on( "click", function( event ){
                event.stopPropagation();
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
                $input.width( $sizer.width() + 8 );
            }
        };

        return Dom;
    }
);
