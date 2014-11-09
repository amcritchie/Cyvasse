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
//            ----------
            SelectedUnit.updateSelectedUnit($(this).children("img"));
            Offense.updateUnitRanges();
        })
    },

    updateUnitRanges: function () {

        $('.hexDiv').attr('data-innRange', false);
        Offense.updateMovingRange();
        Offense.moveFunctions();
    },
    updateMovingRange: function () {

        var attackRange = HexRange.ycreateRangeSelector(SelectedUnit.unit, SelectedUnit.xPos, SelectedUnit.yPos, SelectedUnit.attackRange).parent().parent();
        var movingRange = HexRange.ycreateRangeSelector(SelectedUnit.unit, SelectedUnit.xPos, SelectedUnit.yPos, SelectedUnit.moveRange).parent().parent();

        $('.hexDiv').attr('data-ring', 9);
        $('.hexDiv').attr('data-locked', false);

        SelectedUnit.unit.parent().attr('data-ring', 10);

        var potentialRange = HexRange.ycreateRangeSelector(SelectedUnit.unit, SelectedUnit.xPos, SelectedUnit.yPos, SelectedUnit.moveRange).parent().parent();

        NewHexRangeFinder.createRings(SelectedUnit.unit, potentialRange);


        Gradient.setRange();
        for (var i = 1; i <= SelectedUnit.moveRange; i++) {
            debugger;

//            var color = "hsl(240, " + (40+(i*10))+ "%, "+(20+(i*10))+"%)";
            var color = "hsl(240, " + Gradient.movement[(i-1)] +")";
            var attackColor = "hsl(10, " + Gradient.movement[(i-1)] +")";
            var blockColor = "hsl(140, " + Gradient.movement[(i-1)] +")";


//            var color = "hsl(240, " + (40+(i*3))+ "%, "+(20+((i*10)*((1.1)-(i/10))))+"%)";

            var color2 = "hsl(240, " + (100-(i*10))+ "%, "+(30+(i*5))+"%)";


            $('[data-ring=1' + i + ']').children('svg').children('polygon').css('fill', color);
            $('[data-ring=2' + i + ']').children('svg').children('polygon').css('fill', blockColor);
            $('[data-ring=3' + i + ']').children('svg').children('polygon').css('fill', attackColor);

//            $('[data-ring=1' + i + ']').children('svg').children('polygon').attr('class', 'ring' + i + '');

//            $('[data-ring=2' + i + ']').children('svg').children('polygon').attr('class', 'blocked');
//            $('[data-ring=3' + i + ']').children('svg').children('polygon').attr('class', 'attackable');
            $('[data-ring=4' + i + ']').children('svg').children('polygon').attr('class', 'ally');
            $('[data-ring=1' + (5 + i) + ']').children('svg').children('polygon').attr('class', 'ring' + i + '');
            $('[data-ring=2' + (5 + i) + ']').children('svg').children('polygon').attr('class', 'blocked');
            $('[data-ring=3' + (5 + i) + ']').children('svg').children('polygon').attr('class', 'attackable');
            $('[data-ring=4' + (5 + i) + ']').children('svg').children('polygon').attr('class', 'ally');
        }

        Offense.movingRange = potentialRange.filter(function () {
            return ($(this).attr('data-ring') <= 20) && ($(this).attr('data-ring') > 9)
        });
        debugger;
        Offense.attackRange = potentialRange.filter(function () {
            return ($(this).attr('data-ring') <= 40) && ($(this).attr('data-ring') > 30)
        });

        debugger;
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
            if (SelectedUnit.unit.attr('data-range') == 0) {

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
        SelectedUnit.unit.prependTo(movingTo);
        movingTo.attr('data-occupied', true);
        movingFrom.attr('data-occupied', false);
    },

    finishTurn: function () {
        $('.hideHoveredUnitInfo').css('visibility', 'hidden');
        $('.hideSelectedUnitInfo').css('visibility', 'hidden');

        Offense.attackRange.off('click');
        Offense.selectableUnits.off('click');
        SelectedUnit.unit = null;
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

var Gradient = {
    movement: [],


    setRange: function(){
        Gradient.movement = [
            '40%, 30%',
            '42%, 39%',
            '44%, 47%',
            '46%, 50%',
            '48%, 55%',
            '50%, 60%',
        ];

//        for (var i = 1; i <= SelectedUnit.moveRange; i++) {
//            debugger;
//
////            var color = "hsl(240, " + (40+(i*10))+ "%, "+(20+(i*10))+"%)";
//            var color = "hsl(240, " + (40+(i*3))+ "%, "+(20+((i*10)*((1.1)-(i/10))))+"%)";
//
//            var color2 = "hsl(240, " + (100-(i*10))+ "%, "+(30+(i*5))+"%)";
//
//
//            $('[data-ring=1' + i + ']').children('svg').children('polygon').css('fill', color);
//
//            Range.movement.push(color)
//        }
    }
};

var SelectedUnit = {

    unit: null,
    team: null,

    xPos: null,
    yPos: null,

    movement: null,
    range: null,


    strength: null,
    moveRange: null,
    attackRange: null,


    updateSelectedUnit: function(newUnit){

        SelectedUnit.unit = newUnit;
        SelectedUnit.team = parseInt(newUnit.attr('data-team'));

        SelectedUnit.xPos = parseInt(newUnit.parent().attr('data-xPosss'));
        SelectedUnit.yPos = parseInt(newUnit.parent().attr('data-yPosss'));

        SelectedUnit.strength = parseInt(newUnit.attr('data-strength'));
        SelectedUnit.movement = parseInt(newUnit.attr('data-movement'));
        SelectedUnit.range = parseInt(newUnit.attr('data-range'));

        SelectedUnit.moveRange = parseInt(newUnit.attr('data-movement'));
        SelectedUnit.attackRange = parseInt(newUnit.attr('data-range'));


    }
};