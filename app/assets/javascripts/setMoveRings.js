var MoveRings = {

    selectedUnit: null,
    offenseTeam: null,
    defenseTeam: null,
    selectedTrump: null,

    createRings: function (selectedUnit, potentialRange) {
        var ring = 0;
        MoveRings.selectedUnit = selectedUnit;
        MoveRings.offenseTeam = selectedUnit.attr('data-team');
        MoveRings.defenseTeam = Math.abs(MoveRings.offenseTeam- 1);
        MoveRings.selectedTrump = selectedUnit.attr('data-trump').split(',');

        while (ring < selectedUnit.attr('data-moveRange')) {
            potentialRange = potentialRange.not('[data-locked=true]');
            MoveRings.nextRingOfHexagons(potentialRange, ring, SelectedUnit.unit);
            ring += 1;
        }
    },

    nextRingOfHexagons: function (hexRange, lastRingNum) {

        Array.prototype.slice.call(hexRange).forEach(function (hex) {
            if (MoveRings.searchAdjacentHex(hex, 'data-ring', lastRingNum + 9) == 'true') {
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
                    hex.setAttribute('data-ring', (lastRingNum + 50));
                } else if (image && image.getAttribute('data-team') == MoveRings.defenseTeam) {

                    if (image.getAttribute('data-attack') > MoveRings.selectedUnit.attr('data-attack')){
                        hex.setAttribute('data-ring', (lastRingNum + 20));

                    } else {
                        hex.setAttribute('data-ring', (lastRingNum + 30));
                    }

                    if (MoveRings.selectedTrump[0] != 'none'){

                        MoveRings.selectedTrump.forEach(function (e) {
                            if ( e == image.getAttribute('data-codename')){
                                hex.setAttribute('data-ring', (lastRingNum + 30));
                            }
                        });
                    }

                    if (imageTrumpArray[0] != 'none'){
                        imageTrumpArray.forEach(function (e) {
                            if ( e == MoveRings.selectedUnit.attr('data-codename')){
                                hex.setAttribute('data-ring', (lastRingNum + 20));
                            }
                        });
                    }

                } else if (image && image.getAttribute('data-team') == MoveRings.offenseTeam) {
                    hex.setAttribute('data-ring', (lastRingNum + 40));
                } else {
                    hex.setAttribute('data-ring', (lastRingNum + 10));
                }
                hex.setAttribute('data-locked', true);
            }
        });
    },

    searchAdjacentHex: function (examinedHex, attributeName, attribute) {
        var passing = 'false';
        var neighbors = Neighbors.idsOfNeighbors(examinedHex);

        neighbors.forEach(function (e) {
            var neighbor = $('.board').find(e);
            if (
                (
                    neighbor.attr(attributeName) == attribute
                    ) || (
                (MoveRings.selectedUnit.attr('alt') == 'dragon' &&
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