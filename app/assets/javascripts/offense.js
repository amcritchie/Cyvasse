var Offense = {

    offense: null,
    defense: null,

//    slected Unit
    selectedUnit: null,
    selectedUnitXpos: null,
    selectedUnitYpos: null,
    selectedUnitTeam: null,
    selectedUnitStrength: null,
    selectedUnitMovingRange: null,
    selectedUnitAttackRange: null,
//    ------------------

//    attackRange: null,
    newLocation: null,
    oldLocation: null,

    movingRange: $('hex52'),
    attackRange: $('hex54'),
    selectableUnits: $('hex53'),

    registerClickUnit: function (offense) {

        Offense.offense = offense;
        Offense.defense = Math.abs(offense - 1);
        Offense.selectableUnits = $('[data-team=' + Offense.offense + ']').parent();

        Offense.selectableUnits.on('click', function () {
            updateSelectBox($(this).children('img'));
            Offense.movingRange.off('click');
            Offense.attackRange.off('click');

            Offense.selectedUnitAttributes($(this));
            Offense.updateUnitRanges();
        })
    },
    selectedUnitAttributes: function (selectedUnit) {
        Offense.selectedUnit = selectedUnit.children("img");
        Offense.selectedUnitTeam = selectedUnit.children('img').attr('data-team');
        Offense.selectedUnitStrength = parseInt(selectedUnit.children('img').attr('data-strength'));
        Offense.selectedUnitMovingRange = selectedUnit.children('img').attr('data-movement');

        if (selectedUnit.children('img').attr('data-range') == 0) {
            Offense.selectedUnitAttackRange = selectedUnit.children('img').attr('data-movement');
        } else {
            Offense.selectedUnitAttackRange = selectedUnit.children('img').attr('data-range');
        }

        Offense.selectedUnitXpos = selectedUnit.attr('data-xPosss');
        Offense.selectedUnitYpos = selectedUnit.attr('data-yPosss');
    },
    updateUnitRanges: function () {

        $('.hexDiv').attr('data-innRange', false);
        Offense.updateMovingRange();
        Offense.moveFunctions();
    },
    updateMovingRange: function () {

        var attackRange = HexRange.ycreateRangeSelector(Offense.selectedUnit, Offense.selectedUnitXpos, Offense.selectedUnitYpos, Offense.selectedUnitAttackRange).parent().parent();
        var movingRange = HexRange.ycreateRangeSelector(Offense.selectedUnit, Offense.selectedUnitXpos, Offense.selectedUnitYpos, Offense.selectedUnitMovingRange).parent().parent();

        $('.hexDiv').attr('data-ring', 9);
        $('.hexDiv').attr('data-locked', false);

        Offense.selectedUnit.parent().attr('data-ring', 10);

        var potentialRange = HexRange.ycreateRangeSelector(Offense.selectedUnit, Offense.selectedUnitXpos, Offense.selectedUnitYpos, Offense.selectedUnitMovingRange).parent().parent();

        NewHexRangeFinder.createRings(Offense.selectedUnit, potentialRange);

        for (var i = 1; i < 6; i++) {
            $('[data-ring=1' + i + ']').children('svg').children('polygon').attr('class', 'ring' + i + '');
            $('[data-ring=2' + i + ']').children('svg').children('polygon').attr('class', 'blocked');
            $('[data-ring=3' + i + ']').children('svg').children('polygon').attr('class', 'attackable');
            $('[data-ring=4' + i + ']').children('svg').children('polygon').attr('class', 'ally');
            $('[data-ring=1' + (5 + i) + ']').children('svg').children('polygon').attr('class', 'ring' + i + '');
            $('[data-ring=2' + (5 + i) + ']').children('svg').children('polygon').attr('class', 'blocked');
            $('[data-ring=3' + (5 + i) + ']').children('svg').children('polygon').attr('class', 'attackable');
            $('[data-ring=4' + (5 + i) + ']').children('svg').children('polygon').attr('class', 'ally');
        }

        Offense.movingRange = potentialRange.filter(function () {
            return ($(this).attr('data-ring') <= 20) && ($(this).attr('data-ring') > 9)
        });
        Offense.attackRange = potentialRange.filter(function () {
            return ($(this).attr('data-ring') <= 40) && ($(this).attr('data-ring') > 30)
        });

        Offense.selectableUnits = $('[data-team=' + Offense.offense + ']').parent();

    },
    moveFunctions: function () {
        Offense.registerMovableHex();
        Offense.registerAttackUnit();
    },

    registerMovableHex: function () {
        Offense.movingRange.on('click', function () {

            Offense.selectableUnits.off('click');

            Offense.newLocation = $(this);
            Offense.oldLocation = Offense.selectedUnit.parent();

            Offense.moveUnitToNewPosition();

            Offense.finishTurn()

        });
    },

    registerAttackUnit: function () {
        Offense.attackRange.on('click', function () {
//            Offense.moveUnitToGraveyard($(this).children("img"));
            Death.unitKilled($(this).children("img"));
            Offense.newLocation = $(this);
            Offense.oldLocation = Offense.selectedUnit.parent();
            if (Offense.selectedUnit.attr('data-range') == 0) {

                Offense.moveUnitToNewPosition();

            } else {
                $allHexagons.attr('class', 'unSelected');
                $moveableUnits.off('click');
                $movingRange.off();
                defense = offense;
            }

            Offense.finishTurn()
        });

    },

    moveUnitToNewPosition: function () {
        var movingTo = $(Offense.newLocation);
        var movingFrom = $(Offense.oldLocation);
        Offense.selectedUnit.prependTo(movingTo);
        movingTo.attr('data-occupied', true);
        movingFrom.attr('data-occupied', false);
    },

    finishTurn: function () {
        $('.hideHoveredUnitInfo').css('visibility', 'hidden');
        $('.hideSelectedUnitInfo').css('visibility', 'hidden');

        Offense.attackRange.off('click');
        Offense.selectableUnits.off('click');
        Offense.selectedUnit = null;
        Offense.offense = Math.abs(Offense.offense - 1);
        Game.runTurn(Offense.offense);
    }
};

var Death = {

    graveCount: 0,

    unitKilled: function (unit) {
        Death.graveCount += 1;
        var grave = ('<div class="grave" id="gra' + Death.graveCount + '"></div>');

        unit.attr('data-status', 'dead');

        $('#grav' + Offense.defense).append(grave);
        $('#gra' + Death.graveCount + '').prepend(unit);
    }

};
