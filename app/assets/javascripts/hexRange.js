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

    blockedHexagons: $('[data-hexIndex = 53]'),

    ycreateRangeSelector: function (selectedUnit, xPos, yPos, range) {
        HexRange.selectedUnit = selectedUnit;
        HexRange.xPosition = parseInt(xPos);
        HexRange.yPosition = parseInt(yPos);
        HexRange.range = parseInt(range);
        $allHexagons.attr('class', 'unSelected');

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
            var newX = (HexRange.xPosition - (HexRange.horizontal + row - HexRange.vertical - constant));
            var newY = (HexRange.yPosition + up);
            HexRange.hexChangeClass(newX, newY, HexRange.horizontal);
            row += 1;
        }
    },
    ynewdiagonalHexChange: function (constant, up) {
        HexRange.hexChangeClass((HexRange.xPosition - (HexRange.horizontal - constant)), (HexRange.yPosition + up), HexRange.horizontal);
        HexRange.hexChangeClass((HexRange.xPosition + (HexRange.horizontal + constant - HexRange.vertical)), (HexRange.yPosition + up), HexRange.horizontal)
    },

    hexChangeClass: function (xPos, yPos) {
        var hex = $('#hex_' + xPos + '_' + yPos);
        if (hex.length != 0) {
            hex.children('svg').children('polygon').attr('class', 'testRange');
        }
    }
};