var HexRange = {

    selectedUnit: null,
    xPosition: null,
    yPosition: null,
    range: null,
    horizontal: null,
    constantUp: null,
    constantDown: null,
    vertical: null,
    initialSizeDown: null,
    initialSizeUp: null,
    finalSizeDown: null,
    finalSizeUp: null,


    blockedHexagons: $('#hex43'),


    ycreateRangeSelector: function (selectedUnit, xPos, yPos, range) {
        HexRange.selectedUnit = selectedUnit;
        HexRange.xPosition = parseInt(xPos);
        HexRange.yPosition = parseInt(yPos);
        HexRange.range = parseInt(range);
        $allHexagons.attr('class', 'unSelected');


        $('.hexDiv').attr('data-blocked', 'true');
        HexRange.blockedHexagons = [];

        HexRange.ynewChangeClassOfHexagonsInRange(Offense.selectedUnitXpos, Offense.selectedUnitYpos, Offense.selectedUnitMovingRange);

        return $('polygon.testRange');
    },

    dragonChangeVerticalHexagons: function (constant, up) {
        if (HexRange.horizontal <= HexRange.vertical) {
            var xx = (HexRange.xPosition - (HexRange.horizontal - HexRange.vertical - constant));
            var yy = (HexRange.yPosition + up);
            HexRange.hexChangeClass(xx, yy, HexRange.horizontal);
            HexRange.hexChangeClass(xx - HexRange.horizontal, yy, HexRange.horizontal);
        }
    },


    ynewChangeClassOfHexagonsInRange: function () {

        HexRange.horizontal = 1;

        HexRange.selectedUnit.parent().attr('data-blocked', 'false');


        while (HexRange.horizontal <= HexRange.range) {
            HexRange.ynewChangeClassOfHexCircumference();
            HexRange.horizontal += 1;
        }
    },

    ynewChangeClassOfHexCircumference: function () {

        HexRange.constantUp = 0;
        HexRange.constantDown = 0;
        HexRange.vertical = 1;
        HexRange.initialSizeDown = findHex(HexRange.xPosition, HexRange.yPosition).data('size');
        HexRange.initialSizeUp = findHex(HexRange.xPosition, HexRange.yPosition).data('size');

        HexRange.hexChangeClass((HexRange.xPosition - HexRange.horizontal), (HexRange.yPosition), HexRange.horizontal);
        HexRange.hexChangeClass((HexRange.xPosition + HexRange.horizontal), (HexRange.yPosition), HexRange.horizontal);

        while (HexRange.horizontal >= HexRange.vertical) {

            HexRange.finalSizeDown = findHex(HexRange.xPosition, HexRange.yPosition + HexRange.vertical).data('size');
            HexRange.finalSizeUp = findHex(HexRange.xPosition, HexRange.yPosition - HexRange.vertical).data('size');

            if (HexRange.initialSizeDown < HexRange.finalSizeDown) {
                HexRange.constantDown += 1;
            }
            if (HexRange.initialSizeUp < HexRange.finalSizeUp) {
                HexRange.constantUp += 1;
            }


            if (HexRange.selectedUnit.attr('alt') == 'dragon') {
                HexRange.dragonChangeVerticalHexagons(HexRange.constantDown, HexRange.vertical);
                HexRange.dragonChangeVerticalHexagons(HexRange.constantUp, (HexRange.vertical * -1));

            } else {
                HexRange.ynewchangeVerticalHexagons(HexRange.constantDown, HexRange.vertical);
                HexRange.ynewchangeVerticalHexagons(HexRange.constantUp, (HexRange.vertical * -1));
            }
//            HexRange.ynewchangeVerticalHexagons(HexRange.constantDown, HexRange.vertical);
//            HexRange.ynewchangeVerticalHexagons(HexRange.constantUp, (HexRange.vertical * -1));

            HexRange.initialSizeDown = HexRange.finalSizeDown;
            HexRange.initialSizeUp = HexRange.finalSizeUp;
            HexRange.vertical += 1;
        }
    },
    ynewchangeVerticalHexagons: function (constant, up) {
        if (HexRange.horizontal <= HexRange.vertical) {
            HexRange.ynewverticalHexChange(constant, up);
        } else {
            HexRange.ynewdiagonalHexChange(constant, up);
        }
    },
    ynewverticalHexChange: function (constant, up) {
        var row = 0;
        while (row <= HexRange.horizontal) {
            var xx = (HexRange.xPosition - (HexRange.horizontal + row - HexRange.vertical - constant));
            var yy = (HexRange.yPosition + up);
            HexRange.hexChangeClass(xx, yy, HexRange.horizontal);
            row += 1;
        }
    },
    ynewdiagonalHexChange: function (constant, up) {
        HexRange.hexChangeClass((HexRange.xPosition - (HexRange.horizontal - constant)), (HexRange.yPosition + up), HexRange.horizontal);
        HexRange.hexChangeClass((HexRange.xPosition + (HexRange.horizontal + constant - HexRange.vertical)), (HexRange.yPosition + up), HexRange.horizontal)
    },

    hexChangeClass: function (xPos, yPos) {
        var hex = $('*[data-xPosss=' + xPos + '][data-yPosss=' + yPos + ']');


        if (hex.length != 0) {

            if ((hex.children('img').attr('data-team')) != 0) {
                hex.attr('data-blocked', 'false');
            }
            var passing = HexRange.searchAdjacentHex(hex);


            hex.children('svg').children('polygon').attr('class', 'testRange');
        }

    },

    searchAdjacentHex: function (hex) {
        var id = hex.attr('id').slice(3);
        var xxx = parseInt(hex.attr('data-xPosss'));
        var yyy = parseInt(hex.attr('data-yPosss'));

        var passing = 'false';

        var neighbors = [
            $('#hex' + 44),
            $('#hex' + 34),
            $('#hex' + 24),
            $('#hex' + 41),
            $('#hex' + 42),
            $('#hex' + 43),
        ];

        if (id < 41) {
            neighbors = [
                $('*[data-xPosss=' + (xxx - 1) + '][data-yPosss=' + (yyy - 1) + ']'),
                $('*[data-xPosss=' + xxx + '][data-yPosss=' + (yyy - 1) + ']'),
                $('*[data-xPosss=' + (xxx + 1) + '][data-yPosss=' + yyy + ']'),
                $('*[data-xPosss=' + (xxx - 1) + '][data-yPosss=' + yyy + ']'),
                $('*[data-xPosss=' + (xxx + 1) + '][data-yPosss=' + (yyy + 1) + ']'),
                $('*[data-xPosss=' + xxx + '][data-yPosss=' + (yyy + 1) + ']'),
            ];
        } else if (id < 52) {
            neighbors = [
                $('*[data-xPosss=' + (xxx - 1) + '][data-yPosss=' + (yyy - 1) + ']'),
                $('*[data-xPosss=' + (xxx + 1) + '][data-yPosss=' + yyy + ']'),
                $('*[data-xPosss=' + (xxx - 1) + '][data-yPosss=' + yyy + ']'),
                $('*[data-xPosss=' + (xxx - 1) + '][data-yPosss=' + (yyy + 1) + ']'),
                $('*[data-xPosss=' + xxx + '][data-yPosss=' + (yyy - 1) + ']'),
                $('*[data-xPosss=' + xxx + '][data-yPosss=' + (yyy + 1) + ']'),
            ];
        } else {
            neighbors = [
                $('*[data-xPosss=' + xxx + '][data-yPosss=' + (yyy - 1) + ']'),
                $('*[data-xPosss=' + (xxx + 1) + '][data-yPosss=' + (yyy - 1) + ']'),
                $('*[data-xPosss=' + (xxx + 1) + '][data-yPosss=' + yyy + ']'),
                $('*[data-xPosss=' + (xxx - 1) + '][data-yPosss=' + yyy + ']'),
                $('*[data-xPosss=' + (xxx - 1) + '][data-yPosss=' + (yyy + 1) + ']'),
                $('*[data-xPosss=' + xxx + '][data-yPosss=' + (yyy + 1) + ']'),
            ];
        }

        $.each(neighbors, function (i, e) {
//            console.log(e);
            if (e.attr('data-blocked') == 'false') {
                passing = 'true';
            }
        });
//        debugger;
        return passing
    }
};