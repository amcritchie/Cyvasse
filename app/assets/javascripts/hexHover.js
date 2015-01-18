var HexHover = {

    setHover: function() {
        $('.hexPolygon').hover(function () {
            $(this).parent().parent().addClass('hexHover');
        }, function () {
            $(this).parent().parent().removeClass('hexHover');
        });

        $('[data-status=alive]').hover(function () {
            $(this).parent().addClass('hexHover');
        }, function () {
            $(this).parent().removeClass('hexHover');
        });
    }
};