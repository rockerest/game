define(
    ["lib/utils", "BigInteger"],
    function( Utils ){
        var Business = function( resources ){
            var defaults = {
                money: 0,
                product: 0,
                research: 0
            };

            this.resources = Utils.merge( defaults, resources );
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

        return Business;
    }
);
