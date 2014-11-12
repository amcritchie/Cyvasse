var Offense = {

    offense: null,
    defense: null,
    selectableUnits: $('hex53'),

    newLocation: null,
    oldLocation: null,

    moveRange: $('hex52'),
    attackRange: $('hex54'),

    runOffense: function (offense) {
        Offense.offense = offense;
        Offense.defense = Math.abs(offense - 1);
        Offense.selectableUnits = $('[data-team=' + offense + ']').parent();
        Offense.registerClickUnit()
    },

    registerClickUnit: function () {
        Offense.selectableUnits.on('click', function () {
            var start = new Date();
            clearInterval(Animation.function);
            SelectedUnit.update($(this).children('img'));
            InfoBoxes.updateSelectBox($(this).children('img'));
            Offense.registerMoveOrAttack();
            var stop = new Date();
            console.log("elapsed registerClickUnit", stop - start);
        })
    },
    registerMoveOrAttack: function () {
        Offense.updateUnitRanges();
        Offense.registerMovableHex();
        Offense.registerAttackUnit();
    },
    updateUnitRanges: function () {
        $('.hexDiv').attr('data-ring', 9);
        $('.hexDiv').attr('data-locked', false);
        SelectedUnit.unit.parent().attr('data-ring', 10);
        console.log('Offense.updateMoveRange() starts');
        console.log('Offense.updateMoveRange() end');
        console.log('ccc');

        console.log('ddd');
        var start = new Date();

        console.log('run updateMoveRange');
        Offense.updateMoveRange(); // <---- Slow!!!!!!
        console.log('run updateAttackRange');

        Offense.updateAttackRange(); // <---- slow!!!!!!
        console.log('run animation');

        Animation.runAnimation();
        var stop = new Date();
        console.log("*****elapsed registerClickUnit", stop - start);

    },

    updateMoveRange: function (unit, range) {
        var potentialRange = HexRange.ycreateRangeSelector(SelectedUnit.unit, SelectedUnit.xPos, SelectedUnit.yPos, SelectedUnit.moveRange).parent().parent();

        console.log('createRings() starts');
        NewHexRangeFinder.createRings(SelectedUnit.unit, potentialRange);
        console.log('createRings() ends');


        Offense.moveRange.off('click');
        Offense.moveRange = potentialRange.filter(function () {
            return ($(this).attr('data-ring') <= 20) && ($(this).attr('data-ring') > 9)
        });
    },


    updateAttackRange: function (unit, range) {
        var potentialRange = Offense.potentialRange();

        NewHexRangeFinder.createRings(SelectedUnit.unit, potentialRange);
        Offense.attackRange.off('click');
        Offense.attackRange = potentialRange.filter(function () {
            return ($(this).attr('data-ring') <= 40) && ($(this).attr('data-ring') > 30)
        });
    },

    potentialRange: function () {
        var range = null;
        if (SelectedUnit.unit.data('rank') == 'range') {
            range = SelectedUnit.attackRange
        } else {
            range = SelectedUnit.moveRange
        }
        return HexRange.ycreateRangeSelector(SelectedUnit.unit, SelectedUnit.xPos, SelectedUnit.yPos, range).parent().parent();
    },

    registerMovableHex: function () {
        Offense.moveRange.on('click', function () {
            Offense.selectableUnits.off('click');
            Offense.newLocation = $(this);
            Offense.oldLocation = SelectedUnit.unit.parent();
            Offense.moveUnitToNewPosition();
            Offense.finishTurn()
        });
    },

    registerAttackUnit: function () {
        Offense.attackRange.on('click', function () {
            Death.unitKilled($(this).children("img"));
            Offense.newLocation = $(this);
            Offense.oldLocation = SelectedUnit.unit.parent();
            if (SelectedUnit.unit.attr('data-attackRange') == 0) {
                Offense.moveUnitToNewPosition();
            }
            Offense.finishTurn()
        });
    },

    moveUnitToNewPosition: function () {
        var movingTo = $(Offense.newLocation);
        var movingFrom = $(Offense.oldLocation);
        SelectedUnit.unit.prependTo(movingTo);
        movingTo.attr('data-occupied', true);
        movingFrom.attr('data-occupied', false);
    },

    finishTurn: function () {
        $('.hideHoveredUnitInfo').css('visibility', 'hidden');
        $('.hideSelectedUnitInfo').css('visibility', 'hidden');

        $('.hexDiv').children('svg').children('polygon').css('fill', 'black');

        Offense.attackRange.off('click');
        Offense.selectableUnits.off('click');
        SelectedUnit.unit = null;

        Game.runTurn();
    }
};