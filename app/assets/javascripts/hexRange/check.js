var check = {
    twoHexsAreInARow: function (hex1, hex2) {

        var hex1yPos = hex1.parent().data('y-pos');
        var hex2yPos = hex2.parent().data('y-pos');

        var lookingFor = hex2;

        if (hex1.attr('data-ypos') === hex2.attr('data-ypos')) {

            return true
        } else {
            var distance = Math.abs((parseInt(hex1.attr('data-ypos')) - parseInt(hex2.attr('data-ypos'))));

            var initialSizeDown;
            var initialSizeUp;
            var finalSizeDown;
            var finalSizeUp;

            var constantUp = 0;
            var constantDown = 0;

            var finalSize;
            for (var i = 0; i < distance; i++) {

                initialSizeDown = $('[data-y-pos=' + (hex1yPos + (i)) + ']').data('size');
                initialSizeUp = $('[data-y-pos=' + (hex1yPos - (i)) + ']').data('size');

                finalSizeDown = $('[data-y-pos=' + (hex1yPos + (i + 1)) + ']').data('size');
                finalSizeUp = $('[data-y-pos=' + (hex1yPos - (i + 1)) + ']').data('size');

                if (initialSizeDown < finalSizeDown) {
                    constantDown += 1;
                }
                if (initialSizeUp > finalSizeUp) {
                    constantUp += 1;
                }
            }

            var a = $('#hex_' + (parseInt(hex1.data('xpos')) - parseInt(constantUp)) + '_' + (hex1yPos - distance));
            var b = $('#hex_' + ((parseInt(hex1.data('xpos')) + parseInt(distance)) - constantUp) + '_' + (hex1yPos - distance));

            var c = $('#hex_' + (parseInt(hex1.data('xpos')) + parseInt(constantDown)) + '_' + (hex1yPos + distance));
            var d = $('#hex_' + ((parseInt(hex1.data('xpos')) - parseInt(distance)) + parseInt(constantDown)) + '_' + (hex1yPos + distance));

            if (hex2.attr('id') == a.attr('id')) {
                return true
            } else if (hex2.attr('id') == b.attr('id')) {
                return true
            } else if (hex2.attr('id') == c.attr('id')) {
                return true
            } else if (hex2.attr('id') == d.attr('id')) {
                return true
            } else {
                return false;
            }

        }

    }
};