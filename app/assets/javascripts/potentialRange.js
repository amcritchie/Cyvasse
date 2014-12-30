var PotentialRange = {
    unit: null,
    range: null,
    xPos: null,
    yPos: null,

    horizontal: null,
    constantUp: null,
    constantDown: null,
    vertical: null,
    initialSizeDown: null,
    initialSizeUp: null,
    finalSizeDown: null,
    finalSizeUp: null,

    initializeRange: function (unit,range) {
        PotentialRange.unit = unit;
        PotentialRange.range = parseInt(range);
        PotentialRange.xPos = parseInt(unit.parent().attr('data-xPos'));
        PotentialRange.yPos = parseInt(unit.parent().attr('data-yPos'));
//        $allHexagons.attr('class', 'unSelected');
    },


    create: function (selectedUnit, range) {
        PotentialRange.initializeRange(selectedUnit, range);
        PotentialRange.changeClassOfHexagonsInRange();
        return $('polygon.testRange');
    },
    changeClassOfHexagonsInRange: function () {
        PotentialRange.horizontal = 1;
        while (PotentialRange.horizontal <= PotentialRange.range) {
            PotentialRange.changeClassOfHexCircumference();
            PotentialRange.horizontal += 1;
        }
    },
    initializeCircumference: function(){
        PotentialRange.constantUp = 0;
        PotentialRange.constantDown = 0;
        PotentialRange.vertical = 1;
        PotentialRange.initialSizeDown = PotentialRange.findHex(PotentialRange.xPos, PotentialRange.yPos).data('size');
        PotentialRange.initialSizeUp = PotentialRange.findHex(PotentialRange.xPos, PotentialRange.yPos).data('size');
    },
    changeClassOfHexCircumference: function () {

        PotentialRange.initializeCircumference();
        PotentialRange.hexChangeClass((PotentialRange.xPos - PotentialRange.horizontal), (PotentialRange.yPos), PotentialRange.horizontal);
        PotentialRange.hexChangeClass((PotentialRange.xPos + PotentialRange.horizontal), (PotentialRange.yPos), PotentialRange.horizontal);

        while (PotentialRange.horizontal >= PotentialRange.vertical) {

            PotentialRange.finalSizeDown = PotentialRange.findHex(PotentialRange.xPos, PotentialRange.yPos + PotentialRange.vertical).data('size');
            PotentialRange.finalSizeUp = PotentialRange.findHex(PotentialRange.xPos, PotentialRange.yPos - PotentialRange.vertical).data('size');

            if (PotentialRange.initialSizeDown < PotentialRange.finalSizeDown) {
                PotentialRange.constantDown += 1;
            }
            if (PotentialRange.initialSizeUp < PotentialRange.finalSizeUp) {
                PotentialRange.constantUp += 1;
            }

            if (PotentialRange.unit.attr('alt') == 'dragon') {
                PotentialRange.dragonChangeVerticalHexagons(PotentialRange.constantDown, PotentialRange.vertical);
                PotentialRange.dragonChangeVerticalHexagons(PotentialRange.constantUp, (PotentialRange.vertical * -1));
            } else {
                PotentialRange.standardChangeVerticalHexagons(PotentialRange.constantDown, PotentialRange.vertical);
                PotentialRange.standardChangeVerticalHexagons(PotentialRange.constantUp, (PotentialRange.vertical * -1));
            }

            PotentialRange.initialSizeDown = PotentialRange.finalSizeDown;
            PotentialRange.initialSizeUp = PotentialRange.finalSizeUp;
            PotentialRange.vertical += 1;
        }
    },

    findHex: function (xPos, yPos) {
        return $('#hex_' + xPos + '_' + yPos)
    },

    dragonChangeVerticalHexagons: function (constant, up) {

        if (PotentialRange.horizontal <= PotentialRange.vertical) {
            var xx = (PotentialRange.xPos - (PotentialRange.horizontal - PotentialRange.vertical - constant));
            var yy = (PotentialRange.yPos + up);
            PotentialRange.hexChangeClass(xx, yy, PotentialRange.horizontal);
            PotentialRange.hexChangeClass(xx - PotentialRange.horizontal, yy, PotentialRange.horizontal);
        }
    },

    standardChangeVerticalHexagons: function (constant, up) {

        if (PotentialRange.horizontal <= PotentialRange.vertical) {
            PotentialRange.verticalHexChange(constant, up);
        } else {
            PotentialRange.diagonalHexChange(constant, up);
        }
    },
    verticalHexChange: function (constant, up) {
        var row = 0;
        while (row <= PotentialRange.horizontal) {
            var newX = (PotentialRange.xPos - (PotentialRange.horizontal + row - PotentialRange.vertical - constant));
            var newY = (PotentialRange.yPos + up);
            PotentialRange.hexChangeClass(newX, newY, PotentialRange.horizontal);
            row += 1;
        }
    },
    diagonalHexChange: function (constant, up) {
        PotentialRange.hexChangeClass((PotentialRange.xPos - (PotentialRange.horizontal - constant)), (PotentialRange.yPos + up), PotentialRange.horizontal);
        PotentialRange.hexChangeClass((PotentialRange.xPos + (PotentialRange.horizontal + constant - PotentialRange.vertical)), (PotentialRange.yPos + up), PotentialRange.horizontal)
    },

    hexChangeClass: function (xPos, yPos) {
        var hex = $('#hex_' + xPos + '_' + yPos);
        if (hex.length != 0) {
            hex.children('svg').children('polygon').attr('class', 'testRange');
        }
    }
};