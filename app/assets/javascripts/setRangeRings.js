var check = {
    twoHexsAreInARow: function (hex1, hex2) {
//        debugger;

        var hex1yPos = hex1.parent().data('y-pos');
        var hex2yPos = hex2.parent().data('y-pos');

        var lookingFor = hex2;

        if (hex1.attr('data-ypos') === hex2.attr('data-ypos')) {
//            console.log('true');
//            debugger;
            return true
        } else {
            var distance = Math.abs((parseInt(hex1.attr('data-ypos')) - parseInt(hex2.attr('data-ypos'))));
//            debugger;

//            var constantUp;
//            var constantDown;
//            var vertical;
            var initialSizeDown;
            var initialSizeUp;
            var finalSizeDown;
            var finalSizeUp;

            var constantUp = 0;
            var constantDown = 0;

            var finalSize;
            for (var i = 0; i < distance; i++) {

//                constantUp = 0;
//                constantDown = 0;
//                vertical = 1;
                initialSizeDown = $('[data-y-pos=' + (hex1yPos + (i)) + ']').data('size');
                initialSizeUp = $('[data-y-pos=' + (hex1yPos - (i)) + ']').data('size');

                finalSizeDown = $('[data-y-pos=' + (hex1yPos + (i + 1)) + ']').data('size');
                finalSizeUp = $('[data-y-pos=' + (hex1yPos - (i + 1)) + ']').data('size');
//              text += "The number is " + i + "<br>";

//                debugger;
                if (initialSizeDown < finalSizeDown) {
                    constantDown += 1;
                }
                if (initialSizeUp > finalSizeUp) {
                    constantUp += 1;
                }
            }


            console.log('Constant Up : vv');
            console.log(constantUp);
            console.log('-----------------');

            console.log('Constant Down : vv');
            console.log(constantDown);
            console.log('-----------------');

            console.log('_=+=' * 40);
            var a = $('#hex_' + (parseInt(hex1.data('xpos')) - parseInt(constantUp)) + '_' + (hex1yPos - distance));
            var b = $('#hex_' + ((parseInt(hex1.data('xpos')) + parseInt(distance)) - constantUp) + '_' + (hex1yPos - distance));

            var c = $('#hex_' + (parseInt(hex1.data('xpos')) + parseInt(constantDown)) + '_' + (hex1yPos + distance));
            var d = $('#hex_' + ((parseInt(hex1.data('xpos')) - parseInt(distance)) + parseInt(constantDown)) + '_' + (hex1yPos + distance));

            console.log($(a));
            console.log($(b));
            console.log($(c));
            console.log($(d));

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

            console.log(hex2.attr('id') == a.attr('id'));
            console.log(hex2.attr('id') == b.attr('id'));
            console.log(hex2.attr('id') == c.attr('id'));
            console.log(hex2.attr('id') == d.attr('id'));


//            debugger;

        }

    }
};

var RangeRings = {
    selectedUnit: null,
    selectedTrump: null,
    createRings: function (selectedUnit, potentialRange) {
        var ring = 0;
//        RangeRings.unit = selectedUnit;
        RangeRings.selectedUnit = selectedUnit;
        RangeRings.selectedTrump = selectedUnit.attr('data-trump').split(',');
        while (ring < selectedUnit.attr('data-attackRange')) {
            potentialRange = potentialRange.not('[data-rangeLocked=true]');
            RangeRings.nextRingOfHexagons(potentialRange, ring);
            ring += 1;
        }
    },
    nextRingOfHexagons: function (hexRange, lastRingNum) {
        Array.prototype.slice.call(hexRange).forEach(function (hex) {
            if ((RangeRings.searchAdjacentHex(hex, 'data-rangeRing', lastRingNum + 9) == 'true')) {
                var image;
                var imageTrumpArray;
                Array.prototype.slice.call(hex.children).forEach(function (child) {
                    if (child.tagName == 'IMG') {
                        image = child;
                        imageTrumpArray = image.getAttribute('data-trump').split(',');
                        return;
                    }
                });
                if (image) {
                    if (image.getAttribute('alt') == 'mountain') {

//                        check.twoHexsAreInARow(RangeRings.selectedUnit.parent(), $(hex));

//                        if (lastRingNum == 0) {
//                            hex.setAttribute('data-rangeRing', (lastRingNum + 40))
                        if (check.twoHexsAreInARow(RangeRings.selectedUnit.parent(), $(hex))) {
                            hex.setAttribute('data-rangeRing', (lastRingNum + 40))
                        } else {
                            hex.setAttribute('data-rangeRing', (lastRingNum + 30))
                        }
                    } else if (image.getAttribute('data-team') == Offense.defense) {
                        if (image.getAttribute('data-defence') > RangeRings.selectedUnit.attr('data-attack')) {
                            hex.setAttribute('data-rangeRing', (lastRingNum + 10));
                        } else {
                            hex.setAttribute('data-rangeRing', (lastRingNum + 20));
                        }
                        if (MoveRings.selectedTrumps[0] != 'none') {
                            MoveRings.selectedTrumps.forEach(function (e) {
                                if (e == image.getAttribute('data-codename')) {
                                    hex.setAttribute('data-rangeRing', (lastRingNum + 20));
                                }
                            });
                        }
                        if (imageTrumpArray[0] != 'none') {
                            imageTrumpArray.forEach(function (e) {
                                if (e == MoveRings.selectedUnit.getAttribute('data-codename')) {
                                    hex.setAttribute('data-rangeRing', (lastRingNum + 10));
                                }
                            });
                        }
                    } else {
                        hex.setAttribute('data-rangeRing', (lastRingNum + 10));
                    }
                } else {
                    hex.setAttribute('data-rangeRing', (lastRingNum + 10));
                }
                if (RangeRings.searchForAdjacentMtBlock(hex, 'data-rangeRing', lastRingNum + 29) == 'true') {
                    hex.setAttribute('data-rangeRing', (lastRingNum + 30));
                    hex.setAttribute('data-rangeLocked', true);
                }
                hex.setAttribute('data-rangeLocked', true);
            } else if (RangeRings.searchAdjacentHex(hex, 'data-rangeRing', lastRingNum + 39) == 'true') {
                hex.setAttribute('data-rangeRing', (lastRingNum + 30));
                hex.setAttribute('data-rangeLocked', true);
            }
        });
    },
    searchAdjacentHex: function (examinedHex, attributeName, attribute) {
        var passing = 'false';
        var neighbors = Neighbors.idsOfNeighbors(examinedHex);
        neighbors.forEach(function (e) {
            var neighbor = $('.board').find(e);
            if (((neighbor.attr(attributeName) == attribute) || (neighbor.attr(attributeName) == (attribute + 10)))) {
                passing = 'true';
            }
        });
        return passing
    },
    searchForAdjacentMtBlock: function (examinedHex, attributeName, attribute) {
        var passing = 'false';
        var neighbors = Neighbors.idsOfNeighbors(examinedHex);
        neighbors.forEach(function (e) {
            var neighbor = $('.board').find(e);
            if ((neighbor.attr(attributeName) == (attribute))) {
                passing = 'true';
            }
        });
        return passing
    }
};