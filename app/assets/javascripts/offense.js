
var Offense = {

    offense: null,
    defense: null,
    selectedUnit: null,
    selectedUnitXpos: null,
    selectedUnitYpos: null,
    selectedUnitTeam: null,
    selectedUnitStrength: null,
    selectedUnitMovingRange: null,
    selectedUnitAttackRange: null,

//    attackRange: null,
    newLocation: null,
    oldLocation: null,

    movingRange: $('hex52'),
    attackRange: $('hex54'),
    selectableUnits: $('hex53'),

    registerClickUnit: function(offense){


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
    selectedUnitAttributes: function(selectedUnit){
        Offense.selectedUnit = selectedUnit.children("img");
        Offense.selectedUnitTeam = selectedUnit.children('img').attr('data-team');
        Offense.selectedUnitStrength = parseInt(selectedUnit.children('img').attr('data-strength'));
        Offense.selectedUnitMovingRange = selectedUnit.children('img').attr('data-movement');

        if (selectedUnit.children('img').attr('data-range') == 0 ){
            Offense.selectedUnitAttackRange = selectedUnit.children('img').attr('data-movement');
        }else{
            Offense.selectedUnitAttackRange = selectedUnit.children('img').attr('data-range');
        }

        Offense.selectedUnitXpos = selectedUnit.attr('data-xPosss');
        Offense.selectedUnitYpos = selectedUnit.attr('data-yPosss');
    },
    updateUnitRanges: function(){

        $('.hexDiv').attr('data-innRange', false);
        Offense.updateMovingRange();
        Offense.moveFunctions();
    },
    updateMovingRange: function(){

        var attackRange = HexRange.ycreateRangeSelector(Offense.selectedUnit,Offense.selectedUnitXpos, Offense.selectedUnitYpos, Offense.selectedUnitAttackRange).parent().parent();
        var movingRange = HexRange.ycreateRangeSelector(Offense.selectedUnit,Offense.selectedUnitXpos, Offense.selectedUnitYpos, Offense.selectedUnitMovingRange).parent().parent();

        $('.hexDiv').attr('data-ring',9);
        $('.hexDiv').attr('data-locked', false);

        Offense.selectedUnit.parent().attr('data-ring',10);

        var potentialRange = HexRange.ycreateRangeSelector(Offense.selectedUnit,Offense.selectedUnitXpos, Offense.selectedUnitYpos, Offense.selectedUnitMovingRange).parent().parent();

        var dragonRange = HexRange.ycreateRangeSelector(Offense.selectedUnit,Offense.selectedUnitXpos, Offense.selectedUnitYpos, Offense.selectedUnitMovingRange).parent().parent();

        NewHexRangeFinder.createRings(Offense.selectedUnit, potentialRange);


//        debugger;

        $('[data-ring=11]').children('svg').children('polygon').attr('class', 'ring1');
//        $('[data-ring=12]').children('svg').children('polygon').attr('class', 'blueblue');
//        $('[data-ring=13]').children('svg').children('polygon').attr('class', 'orange');

        setTimeout(function(){
            $('[data-ring=12]').children('svg').children('polygon').attr('class', 'ring2');
            $('[data-ring=22]').children('svg').children('polygon').attr('class', 'blocked');
            $('[data-ring=32]').children('svg').children('polygon').attr('class', 'attackable');
            $('[data-ring=42]').children('svg').children('polygon').attr('class', 'ally');

        }, 400);

        setTimeout(function(){
            $('[data-ring=13]').children('svg').children('polygon').attr('class', 'ring3');
            $('[data-ring=23]').children('svg').children('polygon').attr('class', 'blocked');
            $('[data-ring=33]').children('svg').children('polygon').attr('class', 'attackable');
            $('[data-ring=43]').children('svg').children('polygon').attr('class', 'ally');


        }, 800);

        setTimeout(function(){
            $('[data-ring=14]').children('svg').children('polygon').attr('class', 'ring4');
            $('[data-ring=24]').children('svg').children('polygon').attr('class', 'blocked');
            $('[data-ring=34]').children('svg').children('polygon').attr('class', 'attackable');
            $('[data-ring=44]').children('svg').children('polygon').attr('class', 'ally');


        }, 1200);

        setTimeout(function(){
            $('[data-ring=15]').children('svg').children('polygon').attr('class', 'ring5');
            $('[data-ring=25]').children('svg').children('polygon').attr('class', 'blocked');
            $('[data-ring=35]').children('svg').children('polygon').attr('class', 'attackable');
            $('[data-ring=45]').children('svg').children('polygon').attr('class', 'ally');


        }, 1400);

//        debugger;
        attackRange = attackRange.not($('[data-blocked="FullBlock"]'));
        movingRange = movingRange.not($('[data-blocked="FullBlock"]'));

//        attackRange.children('svg').children('polygon').attr('class', 'hoverRange');
//        movingRange.children('svg').children('polygon').attr('class', 'selectedRange');


        Offense.attackRange = attackRange.filter(function(){
           return $(this).children('img').attr('data-strength') <= Offense.selectedUnitStrength && $(this).children('img').attr('data-team') == Offense.defense
        });
        Offense.movingRange = movingRange.not($('[data-occupied=true]'));

//        Offense.movingRange.children('svg').children('polygon').attr('class', 'orange');
//        Offense.attackRange.children('svg').children('polygon').attr('class', 'blueblue');

        Offense.selectableUnits = $('[data-team=' + Offense.offense + ']').parent();

    },
    moveFunctions: function(){
        Offense.registerMovableHex();
        Offense.registerAttackUnit();
    },

    registerMovableHex: function(){
        Offense.movingRange.on('click', function () {

            Offense.selectableUnits.off('click');

            Offense.newLocation = $(this);
            Offense.oldLocation = Offense.selectedUnit.parent();

            Offense.moveUnitToNewPosition();

            Offense.finishTurn()

        });
    },

    registerAttackUnit: function(){
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

    moveUnitToNewPosition: function(){
        var movingTo = $(Offense.newLocation);
        var movingFrom = $(Offense.oldLocation);
        Offense.selectedUnit.prependTo(movingTo);
        movingTo.attr('data-occupied', true);
        movingFrom.attr('data-occupied', false);
    },

    finishTurn: function(){
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

    unitKilled: function(unit){
        Death.graveCount += 1;
        var grave = ('<div class="grave" id="gra'+Death.graveCount+'"></div>');

        unit.attr('data-status', 'dead');

        $('#grav'+Offense.defense).append(grave);
        $('#gra'+Death.graveCount+'').prepend(unit);
    }

};
