var Offense = {

    offense: null,
    defense: null,
    selectableUnits: $('hex53'),

    start: null,
    end: null,

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

            Offense.start = new Date();

            clearInterval(Animation.function);
            SelectedUnit.update($(this).children('img'));
            InfoBoxes.updateSelectBox($(this).children('img'));
            Offense.registerMoveOrAttack();
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

        var start = new Date();

        var ss = new Date();
        var potentialRange = HexRange.ycreateRangeSelector(SelectedUnit.unit, SelectedUnit.xPos, SelectedUnit.yPos, SelectedUnit.moveRange).parent().parent();
        var sss = new Date();
        var dd = new Date();
        NewHexRangeFinder.createRings(SelectedUnit.unit, potentialRange);
        var ddd = new Date();

        var stop = new Date();
        Offense.end = new Date();

        console.log("time from click to animation - >", Offense.end - Offense.start);
        console.log("create rings run time - >", stop - start);
        console.log("111time from click to animation - >", sss - ss);
        console.log("222create rings run time - >", ddd - dd);

        console.log('-----------');

        Animation.runAnimation();


//        Offense.updateMoveRange(potentialRange); // <---- Slow!!!!!!
//
//        Offense.updateAttackRange(); // <---- slow!!!!!!
//        console.log('run animation');
//        var stop = new Date();
//        console.log("*****elapsed registerClickUnit", stop - start);

    },

    updateMoveRange: function (range) {

        console.log('createRings() ends');


        Offense.moveRange.off('click');
        Offense.moveRange = range.filter(function () {
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