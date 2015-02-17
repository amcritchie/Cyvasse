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