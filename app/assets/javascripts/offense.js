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
        Offense.selectableUnits = $('[data-status=alive][data-team=' + offense + ']').parent();
        Offense.registerSelectUnit()
    },

    registerSelectUnit: function () {
        if (Game.offense == 1){
            Offense.selectableUnits.on('click', function () {
                Offense.selectUnit($(this))
            })
        }
    },

    selectUnit: function (unit) {
        $('.hexPolygon').css('fill','black');
        $('.hexPolygon').css('stroke','white');
        $('.hexSVG').css('overflow','hidden');
        $('.hexSVG').css('z-index','2');

        clearInterval(Animation.function);
        SelectedUnit.update(unit.children('img'));
        InfoBoxes.updateSelectBox(unit.children('img'));
        Offense.registerMoveOrAttack();
    },
    registerMoveOrAttack: function () {
        Offense.updateUnitRanges();
        Offense.registerMovableHex();
        Offense.registerAttackUnit();
    },
    updateUnitRanges: function () {
        $('.hexDiv').attr('data-ring', 8);
        $('.hexDiv').attr('data-locked', false);
        SelectedUnit.unit.parent().attr('data-ring', 9);

        $('.hexDiv').attr('data-rangeRing', 8);
        $('.hexDiv').attr('data-rangeLocked', false);
        SelectedUnit.unit.parent().attr('data-rangeRing', 9);

        var potentialRange = PotentialRange.create(SelectedUnit.unit, SelectedUnit.moveRange).parent().parent();

        MoveRings.createRings(SelectedUnit.unit, potentialRange);


        Animation.runAnimation();
        Offense.updateMoveRange(potentialRange);

//
        if (SelectedUnit.unit.attr('data-rank') == 'range'){

            var attackRange = PotentialRange.create(SelectedUnit.unit, SelectedUnit.attackRange).parent().parent();
            RangeRings.createRings(SelectedUnit.unit,attackRange); // <------ Not working.

            Offense.updateAttackRange();
        } else {

            Offense.updateMeleeRange(); // <---- slow!!!!!
        }

        $allHexagons.attr('class', 'hexPolygon');
    },
    updateMoveRange: function (range) {

        console.log('createRings() ends');

        Offense.moveRange.off('click');
        Offense.moveRange = range.filter(function () {
            return ($(this).attr('data-ring') <= 19) && ($(this).attr('data-ring') >= 10)
        });
    },
    updateAttackRange: function (unit, range) {
        var potentialRange = Offense.potentialRange();

        MoveRings.createRings(SelectedUnit.unit, potentialRange);
        Offense.attackRange.off('click');
        Offense.attackRange = potentialRange.filter(function () {
            return ($(this).attr('data-rangeRing') <= 89) && ($(this).attr('data-rangeRing') >= 80)
        });
    },
    updateMeleeRange: function (unit, range) {
        var potentialRange = Offense.potentialRange();

        MoveRings.createRings(SelectedUnit.unit, potentialRange);
        Offense.attackRange.off('click');
        Offense.attackRange = potentialRange.filter(function () {
            return ($(this).attr('data-ring') <= 39) && ($(this).attr('data-ring') >= 30)
        });
    },
    potentialRange: function () {
        var range = null;
        if (SelectedUnit.unit.data('rank') == 'range') {
            range = SelectedUnit.attackRange
        } else {
            range = SelectedUnit.moveRange
        }
        return PotentialRange.create(SelectedUnit.unit, SelectedUnit.xPos, SelectedUnit.yPos, range).parent().parent();
    },

    registerMovableHex: function () {

        if (Game.offense == Game.currentUserIsTeam){
            Offense.moveRange.on('click', function () {
                Offense.moveToAttack($(this));
            });
        }


    },

    registerAttackUnit: function () {

        if (Game.offense == Game.currentUserIsTeam){
            Offense.attackRange.on('click', function () {
                Offense.moveToAttack($(this))
            });
        }

    },

    moveToHex:function(hex){
        Offense.selectableUnits.off('click');
        Offense.newLocation = hex;
        Offense.oldLocation = SelectedUnit.unit.parent();
        Offense.moveUnitToNewPosition();
        Offense.finishTurn()
    },

    moveToAttack:function(hex){
        Offense.newLocation = hex;
        Offense.oldLocation = SelectedUnit.unit.parent();
        if (hex.children('img').length == 0){
            Offense.moveUnitToNewPosition();
        } else {
            Death.unitKilled(hex.children("img"));
            if (SelectedUnit.unit.attr('data-attackRange') == 0) {
                Offense.moveUnitToNewPosition();
            }
        }

        Offense.finishTurn()
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

        if ($('[alt=king][data-status=dead]').length == 1){
            Game.over();
        } else {
            Game.finishTurn();
        }
    }
};