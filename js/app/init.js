define(
    ["jquery", "ui", "dom"],
    function( $, Ui, Dom ){
        var Init = {};

        Init.startApp = function(){
            $(function(){
                Ui.startup();
                Dom.bindEvents();
            });
        };

        return Init;
    }
);
