define({
    "recursiveObjectMerge": function( primary, overwrite ){
        var p;
        for( p in overwrite ){
            try{
                //try an update
                if( overwrite[p].constructor == Object ){
                    if (typeof primary[p] == "undefined" || primary[p] === null) {
                        primary[p] = {};
                    }

                    primary[p] = Utils.recursiveObjectMerge( primary[p], overwrite[p] );
                }
                else{
                    primary[p] = overwrite[p];
                }
            }
            catch( e ){
                primary[p] = overwrite[p];
            }
        }

        return primary;
    },

    "merge": function( one, two ){
        return this.recursiveObjectMerge( this.recursiveObjectMerge( {}, one ), two );
    },

    "clone": function( object ){
        return this.merge( {}, object );
    },

    "getCss": function( domNode ){
        var returns = {},
            camelize = function(a,b){
                return b.toUpperCase();
            },
            style, i, prop, camel, val;

        if( window.getComputedStyle ){
            style = window.getComputedStyle( domNode, null );
            for( i = 0, l = style.length; i < l; i++ ){
                prop    = style[i];
                camel   = prop.replace( /\-([a-z])/g, camelize );
                val     = style.getPropertyValue( prop );
                returns[camel] = val;
            };

            return returns;
        };

        if( style = domNode.currentStyle ){
            for( var prop in style ){
                returns[prop] = style[prop];
            };
            return returns;
        };

        return returns;
    },
})
