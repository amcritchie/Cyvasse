
var Offense = {

    selectedUnit: null,
    selectedUnitXpos: null,
    selectedUnitYpos: null,
    selectedUnitMovingRange: null,
    selectedUnitAttackRange: null,

    attackRange: null,
    movingRange: $('hex52'),
    movableUnits: $('hex53'),

    xregisterClickUnit: function(){
        Offense.movableUnits = $('[data-team=1]').parent();
        Offense.movableUnits.on('click', function () {
            Offense.movingRange.off('click');
            Offense.selectedUnitAttributes();
            Offense.xupdateUnitRanges();
        })
    },
    selectedUnitAttributes: function(){
        Offense.selectedUnit = $(this).children("img");
        Offense.selectedUnitMovingRange = $(this).children('img').attr('data-movement');
        Offense.selectedUnitAttackRange = $(this).children('img').attr('data-range');
        Offense.selectedUnitXpos = $(this).attr('data-xPosss');
        Offense.selectedUnitYpos = $(this).attr('data-yPosss');
    },
    xupdateUnitRanges: function(){

        $('.ssquare').attr('data-innRange', false);
        Offense.updateMovingRange();
        Offense.moveFunctions();
    },
    updateMovingRange: function(){

        Offense.attackRange = HexRange.ycreateRangeSelector(Offense.selectedUnitXpos, Offense.selectedUnitYpos, Offense.selectedUnitAttackRange);
        Offense.movingRange = HexRange.ycreateRangeSelector(Offense.selectedUnitXpos, Offense.selectedUnitYpos, Offense.selectedUnitMovingRange);

        Offense.attackRange.attr('class', 'hoverRange');
        Offense.movingRange.attr('class', 'selectedRange');

//        Offense.www = Offense.movingRange.parent().parent();
//        debugger;
//        $movingRangeView = Offense.xcreateRangeSelector(Offense.selectedUnitMovingRange, Offense.selectedUnitXpos, Offense.selectedUnitYpos);
        $movingRangeVieww = $('[data-innRange = true]');
        $movingRange = $movingRangeVieww.filter(function () {
            return $(this).data('occupied') == false
        });
    },
    moveFunctions: function(){
        Offense.registerMovableHex();
        Offense.registerAttackUnit();
    },

    registerMovableHex: function(){
//        debugger;
        Offense.movingRange.parent().parent().on('click', function () {

            Offense.movingRange.off('click');
            $moveableUnits.off('click');
            Offense.movableUnits.off('click');

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