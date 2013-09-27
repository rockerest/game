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
    }
})
