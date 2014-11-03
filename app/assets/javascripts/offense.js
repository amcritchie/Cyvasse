
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

        $('.ssquare').attr('data-innRange', false);
        Offense.updateMovingRange();
        Offense.moveFunctions();
    },
    updateMovingRange: function(){

        var attackRange = HexRange.ycreateRangeSelector(Offense.selectedUnitXpos, Offense.selectedUnitYpos, Offense.selectedUnitAttackRange).parent().parent();
        var movingRange = HexRange.ycreateRangeSelector(Offense.selectedUnitXpos, Offense.selectedUnitYpos, Offense.selectedUnitMovingRange).parent().parent();
        attackRange.children('svg').children('polygon').attr('class', 'hoverRange');
        movingRange.children('svg').children('polygon').attr('class', 'selectedRange');


        Offense.attackRange = attackRange.filter(function(){
           return $(this).children('img').attr('data-strength') <= Offense.selectedUnitStrength && $(this).children('img').attr('data-team') == Offense.defense
        });
        Offense.movingRange = movingRange.not($('[data-occupied=true]'));

        Offense.attackRange.children('svg').children('polygon').attr('class', 'blueblue');
        Offense.movingRange.children('svg').children('polygon').attr('class', 'orange');

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
        Offense.attackRange.off('click');
        Offense.selectableUnits.off('click');
        Offense.selectedUnit = null;
        Offense.offense = Math.abs(Offense.offense - 1);
        Game.runTurn(Offense.offense);
    }
};
