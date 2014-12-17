var RangeRings = {

    selectedUnit: null,
    selectedTrump: null,

    createRings: function (selectedUnit, potentialRange) {

        var ring = 0;
        RangeRings.unit = selectedUnit;

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
            if (RangeRings.searchAdjacentHex(hex, 'data-rangeRing', lastRingNum + 9) == 'true') {
                var image;
                var imageTrumpArray;
                Array.prototype.slice.call(hex.children).forEach(function (child) {
                    if (child.tagName == 'IMG') {
                        image = child;
                        imageTrumpArray = image.getAttribute('data-trump').split(',');
                        return;
                    }
                });


                if (image && image.getAttribute('alt') == 'mountain') {
                    hex.setAttribute('data-rangeRing', (lastRingNum + 50));
                } else if (image && image.getAttribute('data-team') == Offense.defense) {
                    if (image.getAttribute('data-attack') > RangeRings.selectedUnit.attr('data-attack')) {
                        hex.setAttribute('data-rangeRing', (lastRingNum + 90));
                    } else {
                        hex.setAttribute('data-rangeRing', (lastRingNum + 80));
                    }
                    if (MoveRings.jsSelectedTrumps[0] != 'none'){

                        MoveRings.jsSelectedTrumps.forEach(function (e) {
                            if ( e == image.getAttribute('data-codename')){
                                hex.setAttribute('data-rangeRing', (lastRingNum + 80));
                            }
                        });
                    }


                    if (imageTrumpArray[0] != 'none'){
                        imageTrumpArray.forEach(function (e) {
                            if ( e == MoveRings.selectedUnit.attr('data-codename')){
                                hex.setAttribute('data-rangeRing', (lastRingNum + 90));
                            }
                        });
                    }

                } else if (image && image.getAttribute('data-team') == Offense.offense) {
                    hex.setAttribute('data-rangeRing', (lastRingNum + 70));
                } else {
                    hex.setAttribute('data-rangeRing', (lastRingNum + 60));
                }
                if (RangeRings.searchAdjacentHex(hex, 'data-rangeRing', lastRingNum + 49) == 'true'){
                    hex.setAttribute('data-rangeRing', (lastRingNum + 50));
                    hex.setAttribute('data-rangeLocked', true);
                }
                hex.setAttribute('data-rangeLocked', true);
            } else if (RangeRings.searchAdjacentHex(hex, 'data-rangeRing', lastRingNum + 49) == 'true'){
                hex.setAttribute('data-rangeRing', (lastRingNum + 50));
                hex.setAttribute('data-rangeLocked', true);
            }
        });
    },

    searchAdjacentHex: function (examinedHex, attributeName, attribute) {

        var passing = 'false';
        var neighbors = Neighbors.idsOfNeighbors(examinedHex);

        neighbors.forEach(function (e) {
            var neighbor = $('.board').find(e);
            if (((neighbor.attr(attributeName) == attribute) || (neighbor.attr(attributeName) == (attribute + 80)) || (neighbor.attr(attributeName) == (attribute + 60)) ||
                (neighbor.attr(attributeName) == (attribute + 70)) || (neighbor.attr(attributeName) == (attribute + 50))
                )) {
                passing = 'true';
            }
        });

        return passing
    }
};