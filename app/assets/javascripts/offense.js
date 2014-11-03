
var Offense = {

    selectedUnit: null,
    selectedUnitXpos: null,
    selectedUnitYpos: null,
    selectedUnitMovingRange: null,
    selectedUnitAttackRange: null,

//    attackRange: null,
    movingRange: $('hex52'),
    attackRange: $('hex54'),
    selectableUnits: $('hex53'),

    xregisterClickUnit: function(){
        Offense.selectableUnits = $('[data-team=1]').parent();

        Offense.selectableUnits.on('click', function () {
            Offense.movingRange.off('click');
//            Offense.attackRange.off('click');

            Offense.selectedUnitAttributes($(this));
            Offense.xupdateUnitRanges();
        })
    },
    selectedUnitAttributes: function(selectedUnit){
        Offense.selectedUnit = selectedUnit.children("img");
        Offense.selectedUnitMovingRange = selectedUnit.children('img').attr('data-movement');
        if (selectedUnit.children('img').attr('data-range') == 0 ){
            Offense.selectedUnitAttackRange = selectedUnit.children('img').attr('data-movement');
        }else{
            Offense.selectedUnitAttackRange = selectedUnit.children('img').attr('data-range');
        }
//        Offense.selectedUnitAttackRange = $(this).children('img').attr('data-range');
        Offense.selectedUnitXpos = selectedUnit.attr('data-xPosss');
        Offense.selectedUnitYpos = selectedUnit.attr('data-yPosss');
    },
    xupdateUnitRanges: function(){

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
           return $(this).children('img').attr('data-strength') >= 3 && $(this).children('img').attr('data-team') == 0
        });
        Offense.movingRange = movingRange.not($('[data-occupied=true]'));

        Offense.attackRange.children('svg').children('polygon').attr('class', 'blueblue');
        Offense.movingRange.children('svg').children('polygon').attr('class', 'orange');

//        Offense.movingRange = Offense.movingRange.not($('[data-occupied=true]'));

        Offense.selectableUnits = $('[data-team=1]').parent();


//        Offense.www = Offense.movingRange.parent().parent();
//        debugger;
//        $movingRangeView = Offense.xcreateRangeSelector(Offense.selectedUnitMovingRange, Offense.selectedUnitXpos, Offense.selectedUnitYpos);
//        $movingRangeVieww = $('[data-innRange = true]');
//        $movingRange = $movingRangeVieww.filter(function () {
//            return $(this).data('occupied') == false
//        });
    },
    moveFunctions: function(){
        Offense.registerMovableHex();
//        Offense.registerAttackUnit();
    },

    registerMovableHex: function(){
        Offense.movingRange.on('click', function () {

//            Offense.movingRange.off('click');
//            $moveableUnits.off('click');
            Offense.selectableUnits.off('click');

//            debugger;
            var newLocation = $(this);
            var oldLocation = Offense.selectedUnit.parent();

            newMoveUnitToNewPosition(newLocation, oldLocation, Offense.selectedUnit);

            turn()
        });
    },

    registerAttackUnit: function(){
        $enemyUnitsInRange.on('click', function () {
            moveUnitToGraveyard($(this).children("img"));
            var newLocation = $(this);
            var oldLocation = $selectedUnit.parent();
            if ($selectedUnit.data('range') == 0) {
//            moveUnitToNewPosition($selectedUnit, $(this).data('x_pos'), $(this).data('y_pos'), $(this).data('row_size'), $selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));
//            moveUnitToNewPosition($selectedUnit, $(this).attr('data-xPosss'), $(this).attr('data-yPosss'), $selectedUnit.attr('data-xPosss'), $selectedUnit.attr('data-yPosss'));
                newMoveUnitToNewPosition(newLocation,oldLocation,$selectedUnit)

            } else {
                $allHexagons.attr('class', 'unSelected');
                $moveableUnits.off('click');
                $movingRange.off();
                defense = offense;
                offense = Math.abs(offense - 1);
                turn();
            }
            $enemyUnitsInRange.off('click');
            $selectedUnit = 0;
        })
    }
};