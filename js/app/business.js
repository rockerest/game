define(
    ["underscore", "BigInteger"],
    function( _ ){
        var Business = function( resources ){
            var defaults = {
                money: 0,
                product: 0,
                research: 0
            };

            this.resources = _.extend( {}, defaults, resources );
        };

        Business.prototype.getMoney = function(){
            return BigInteger(this.resources.money);
        };

        Business.prototype.getProduct = function(){
            return BigInteger(this.resources.product);
        };

        Business.prototype.getResearch = function(){
            return BigInteger(this.resources.research);
        };

        Business.prototype.modifyMoney = function( diff ){
            this.resources.money = BigInteger(this.resources.money).add( diff );
            return this.resources.money;
        };

        Business.prototype.modifyProduct = function( diff ){
            this.resources.product = BigInteger(this.resources.product).add( diff );
            return this.resources.product;
        };

        Business.prototype.modifyResearch = function( diff ){
            this.resources.research = BigInteger(this.resources.research).add( diff );
            return this.resources.research;
        };

        Business.prototype.setContainer = function( container ){
            if( container.jquery ){
                this.container = container[0];
            }
            else{
                this.container = container;
            }
        };

        Business.prototype.refresh = function(){
            var spans = $( this.container ).children( "span" );
            spans.eq( 0 ).text( this.getMoney() );
            spans.eq( 1 ).text( this.getProduct() );
            spans.eq( 2 ).text( this.getResearch() );
        };

        return Business;
    }
);
