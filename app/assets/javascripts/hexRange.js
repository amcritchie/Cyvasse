
var HexRange = {

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

    ycreateRangeSelector: function(xPos,yPos,range){
        HexRange.xPosition = parseInt(xPos);
        HexRange.yPosition = parseInt(yPos);
        HexRange.range = parseInt(range);
        $allHexagons.attr('class','unSelected');
        HexRange.ynewChangeClassOfHexagonsInRange(Offense.selectedUnitXpos, Offense.selectedUnitYpos, Offense.selectedUnitMovingRange);
        return $('polygon.testRange');
    },

    ynewChangeClassOfHexagonsInRange: function(){

        HexRange.horizontal = 1;

        while (HexRange.horizontal <= HexRange.range) {
            HexRange.ynewChangeClassOfHexCircumference();
            HexRange.horizontal += 1;
        }
    },

    ynewChangeClassOfHexCircumference: function(){

        HexRange.constantUp = 0;
        HexRange.constantDown = 0;
        HexRange.vertical = 1;
        HexRange.initialSizeDown = findHex(HexRange.xPosition, HexRange.yPosition).data('size');
        HexRange.initialSizeUp = findHex(HexRange.xPosition, HexRange.yPosition).data('size');

        newHexClassChange((HexRange.xPosition - HexRange.horizontal), (HexRange.yPosition), HexRange.horizontal);
        newHexClassChange((HexRange.xPosition + HexRange.horizontal), (HexRange.yPosition), HexRange.horizontal);

        while (HexRange.horizontal >= HexRange.vertical) {

            HexRange.finalSizeDown = findHex(HexRange.xPosition, HexRange.yPosition + HexRange.vertical).data('size');
            HexRange.finalSizeUp = findHex(HexRange.xPosition, HexRange.yPosition - HexRange.vertical).data('size');

            if (HexRange.initialSizeDown < HexRange.finalSizeDown) {
                HexRange.constantDown += 1;
            }
            if (HexRange.initialSizeUp < HexRange.finalSizeUp) {
                HexRange.constantUp += 1;
            }

            HexRange.ynewchangeVerticalHexagons(HexRange.constantDown, HexRange.vertical);
            HexRange.ynewchangeVerticalHexagons(HexRange.constantUp, (HexRange.vertical * -1));

            HexRange.initialSizeDown = HexRange.finalSizeDown;
            HexRange.initialSizeUp = HexRange.finalSizeUp;
            HexRange.vertical += 1;
        }
    },
    ynewchangeVerticalHexagons: function(constant,up){
        if (HexRange.horizontal <= HexRange.vertical) {
            HexRange.ynewverticalHexChange(constant,up);
        } else {
            HexRange.ynewdiagonalHexChange(constant,up);
        }
    },
    ynewverticalHexChange: function(constant,up){
        var row = 0;
        while (row <= HexRange.horizontal) {
            var xx = (HexRange.xPosition - (HexRange.horizontal + row - HexRange.vertical - constant));
            var yy = (HexRange.yPosition + up);
            newHexClassChange(xx,yy,HexRange.horizontal);
            row += 1;
        }
    },
    ynewdiagonalHexChange: function(constant,up){
        newHexClassChange((HexRange.xPosition - (HexRange.horizontal - constant)), (HexRange.yPosition + up), HexRange.horizontal);
        newHexClassChange((HexRange.xPosition + (HexRange.horizontal + constant - HexRange.vertical)), (HexRange.yPosition + up), HexRange.horizontal)
    }
};