var NewHexRangeFinder = {

    selectedUnit: null,

    createRings: function (selectedUnit, potentialRange) {

        var ring = 0;
        NewHexRangeFinder.selectedUnit = selectedUnit;

        while (ring < selectedUnit.attr('data-moveRange')) {
            console.log('start ring #' + ring);
            potentialRange = potentialRange.not('[data-locked=true]');
            NewHexRangeFinder.nextRingOfHexagons(potentialRange, ring, SelectedUnit.unit);
            ring += 1;
            console.log('ring #' + ring + ' complete');
        }
    },

    nextRingOfHexagons: function (hexRange, lastRingNum) {

        Array.prototype.slice.call(hexRange).forEach(function (hex) {
            if (NewHexRangeFinder.searchAdjacentHex(hex, 'data-ring', lastRingNum + 10) == 'true') {
                var image;

                Array.prototype.slice.call(hex.children).forEach(function (child) {
                    if (child.tagName == 'IMG') {
                        image = child;
                        return;
                    }
                });


                if (image && image.getAttribute('alt') == 'mountain') {
                    hex.setAttribute('data-ring', (lastRingNum + 51));
                } else if (image && image.getAttribute('data-team') == Offense.defense) {
                    if (image.getAttribute('data-attack') > SelectedUnit.strength) {
                        hex.setAttribute('data-ring', (lastRingNum + 21));
                    } else {
                        hex.setAttribute('data-ring', (lastRingNum + 31));
                    }
                } else if (image && image.getAttribute('data-team') == Offense.offense) {
                    hex.setAttribute('data-ring', (lastRingNum + 41));
                } else {
                    hex.setAttribute('data-ring', (lastRingNum + 11));
                }
                hex.setAttribute('data-locked', true);
            }
        });
    },


    searchAdjacentHex: function (examinedHex, attributeName, attribute) {
        var id = examinedHex.getAttribute('id').slice(3);
        var xxx = parseInt(examinedHex.getAttribute('data-xPosss'));
        var yyy = parseInt(examinedHex.getAttribute('data-yPosss'));

        var passing = 'false';
        var neighbors = [];

        if (id < 41) {
            neighbors = [
                    '[data-xPosss=' + (xxx - 1) + '][data-yPosss=' + (yyy - 1) + ']',
                    '[data-xPosss=' + xxx + '][data-yPosss=' + (yyy - 1) + ']',
                    '[data-xPosss=' + (xxx + 1) + '][data-yPosss=' + yyy + ']',
                    '[data-xPosss=' + (xxx - 1) + '][data-yPosss=' + yyy + ']',
                    '[data-xPosss=' + (xxx + 1) + '][data-yPosss=' + (yyy + 1) + ']',
                    '[data-xPosss=' + xxx + '][data-yPosss=' + (yyy + 1) + ']',
            ];
        } else if (id < 52) {
            neighbors = [
                    '[data-xPosss=' + (xxx - 1) + '][data-yPosss=' + (yyy - 1) + ']',
                    '[data-xPosss=' + (xxx + 1) + '][data-yPosss=' + yyy + ']',
                    '[data-xPosss=' + (xxx - 1) + '][data-yPosss=' + yyy + ']',
                    '[data-xPosss=' + (xxx - 1) + '][data-yPosss=' + (yyy + 1) + ']',
                    '[data-xPosss=' + xxx + '][data-yPosss=' + (yyy - 1) + ']',
                    '[data-xPosss=' + xxx + '][data-yPosss=' + (yyy + 1) + ']',
            ];
        } else {
            neighbors = [
                    '[data-xPosss=' + xxx + '][data-yPosss=' + (yyy - 1) + ']',
                    '[data-xPosss=' + (xxx + 1) + '][data-yPosss=' + (yyy - 1) + ']',
                    '[data-xPosss=' + (xxx + 1) + '][data-yPosss=' + yyy + ']',
                    '[data-xPosss=' + (xxx - 1) + '][data-yPosss=' + yyy + ']',
                    '[data-xPosss=' + (xxx - 1) + '][data-yPosss=' + (yyy + 1) + ']',
                    '[data-xPosss=' + xxx + '][data-yPosss=' + (yyy + 1) + ']',
            ];
        }

        neighbors.forEach(function (e) {
            var neighbor = $('.board').find(e);
//            var neighbor = document.getElementById('')

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