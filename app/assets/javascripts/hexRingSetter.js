var NewHexRangeFinder = {

    selectedUnit: null,

    createRings: function (selectedUnit, potentialRange) {

        var ring = 0;
        NewHexRangeFinder.selectedUnit = selectedUnit;

        while (ring < selectedUnit.attr('data-moveRange')) {
            potentialRange = potentialRange.not('[data-locked=true]');
            NewHexRangeFinder.nextRingOfHexagons(potentialRange, ring, SelectedUnit.unit);
            ring += 1;
        }
    },

    nextRingOfHexagons: function (hexRange, lastRingNum) {

        Array.prototype.slice.call(hexRange).forEach(function (hex) {
            if (NewHexRangeFinder.searchAdjacentHex(hex, 'data-ring', lastRingNum + 9) == 'true') {
                var image;

                Array.prototype.slice.call(hex.children).forEach(function (child) {
                    if (child.tagName == 'IMG') {
                        image = child;
                        return;
                    }
                });


                if (image && image.getAttribute('alt') == 'mountain') {
                    hex.setAttribute('data-ring', (lastRingNum + 50));
                } else if (image && image.getAttribute('data-team') == Offense.defense) {
                    if (image.getAttribute('data-attack') > SelectedUnit.strength) {
                        hex.setAttribute('data-ring', (lastRingNum + 20));
                    } else {
                        hex.setAttribute('data-ring', (lastRingNum + 30));
                    }
                } else if (image && image.getAttribute('data-team') == Offense.offense) {
                    hex.setAttribute('data-ring', (lastRingNum + 40));
                } else {
                    hex.setAttribute('data-ring', (lastRingNum + 10));
                }
                hex.setAttribute('data-locked', true);
            }
        });
    },


    searchAdjacentHex: function (examinedHex, attributeName, attribute) {
        var id = examinedHex.getAttribute('data-hexIndex');
        var xxx = parseInt(examinedHex.getAttribute('data-xPosss'));
        var yyy = parseInt(examinedHex.getAttribute('data-yPosss'));

        var passing = 'false';
        var neighbors = [];

        if (id < 41) {
            neighbors = [
                
                    '#hex_' + (xxx - 1) + '_' + (yyy - 1),
                    '#hex_' + xxx + '_' + (yyy - 1),
                    '#hex_' + (xxx + 1) + '_' + yyy,
                    '#hex_' + (xxx - 1) + '_' + yyy,
                    '#hex_' + (xxx + 1) + '_' + (yyy + 1),
                    '#hex_' + xxx + '_' + (yyy + 1),
            ];
        } else if (id < 52) {
            neighbors = [
                    '#hex_' + (xxx - 1) + '_' + (yyy - 1),
                    '#hex_' + (xxx + 1) + '_' + yyy,
                    '#hex_' + (xxx - 1) + '_' + yyy,
                    '#hex_' + (xxx - 1) + '_' + (yyy + 1),
                    '#hex_' + xxx + '_' + (yyy - 1),
                    '#hex_' + xxx + '_' + (yyy + 1),
            ];
        } else {
            neighbors = [
                    '#hex_' + xxx + '_' + (yyy - 1),
                    '#hex_' + (xxx + 1) + '_' + (yyy - 1),
                    '#hex_' + (xxx + 1) + '_' + yyy,
                    '#hex_' + (xxx - 1) + '_' + yyy,
                    '#hex_' + (xxx - 1) + '_' + (yyy + 1),
                    '#hex_' + xxx + '_' + (yyy + 1),
            ];
        }

        neighbors.forEach(function (e) {
            var neighbor = $('.board').find(e);
            if (
                (
                    neighbor.attr(attributeName) == attribute
                    ) || (
                (NewHexRangeFinder.selectedUnit.attr('alt') == 'dragon' &&
                    ((neighbor.attr(attributeName) == attribute) || (neighbor.attr(attributeName) == (attribute + 20)) ||
                        (neighbor.attr(attributeName) == (attribute + 30)) || (neighbor.attr(attributeName) == (attribute + 10))
                        )
                    )
                )) {
                passing = 'true';
            }
        });

        return passing
    }
};