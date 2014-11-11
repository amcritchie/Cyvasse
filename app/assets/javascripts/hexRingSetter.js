var NewHexRangeFinder = {

    selectedUnit: null,

    createRings: function (selectedUnit, potentialRange) {

        var ring = 0;
        NewHexRangeFinder.selectedUnit = selectedUnit;
        while (ring < selectedUnit.attr('data-moverange')) {
            NewHexRangeFinder.nextRingOfHexagons(potentialRange, ring, SelectedUnit.unit);
            potentialRange = potentialRange.not('[data-locked=true]');
            ring += 1;
        }


    },

    nextRingOfHexagons: function (hexRange, lastRingNum, selectedUnit) {

//        var range = true;

        $.each(hexRange, function (i, hex) {

            if (NewHexRangeFinder.searchAdjacentHex($(hex), 'data-ring', lastRingNum + 10) == 'true') {

                if ($(hex).children('img').attr('alt') == 'mountain') {
                    $(hex).attr('data-ring', (lastRingNum + 51));
                    $(hex).attr('data-locked', true);
                } else if ($(hex).children('img').attr('data-team') == Offense.defense) {
                    if ($(hex).children('img').attr('data-attack') > SelectedUnit.strength) {
                        $(hex).attr('data-ring', (lastRingNum + 21));
                        $(hex).attr('data-locked', true);
                    } else {
                        $(hex).attr('data-ring', (lastRingNum + 31));
                        $(hex).attr('data-locked', true);
                    }


                } else if ($(hex).children('img').attr('data-team') == Offense.offense) {
                    $(hex).attr('data-ring', (lastRingNum + 41));
                    $(hex).attr('data-locked', true);
                } else {


                    $(hex).attr('data-ring', (lastRingNum + 11));
                    $(hex).attr('data-locked', true);

                }
            }
        })
    },
    searchAdjacentHex: function (hhex, attributeName, attribute) {

        var id = hhex.attr('id').slice(3);
        var xxx = parseInt(hhex.attr('data-xPosss'));
        var yyy = parseInt(hhex.attr('data-yPosss'));

        var passing = 'false';
        var neighbors = [

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
            if (
                (
                    e.attr(attributeName) == attribute
                    ) || (
                (NewHexRangeFinder.selectedUnit.attr('alt') == 'dragon' &&
                    ((e.attr(attributeName) == attribute) || (e.attr(attributeName) == (attribute + 20)) ||
                        (e.attr(attributeName) == (attribute + 30)) || (e.attr(attributeName) == (attribute + 10))
                        )
                    )

                )) {
                passing = 'true';
            }
        });
        return passing
    }
};