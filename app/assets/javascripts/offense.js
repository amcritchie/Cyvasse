
var Offense = {

    selectedUnit: null,
    selectedUnitXpos: null,
    selectedUnitYpos: null,
    selectedUnitMovingRange: null,
    selectedUnitAttackRange: null,

    attackRange: null,
    movingRange: $('hex52'),
    movableUnits: $('hex53'),
    www: null,


    xregisterClickUnit: function(){
        Offense.movableUnits = $('[data-team=1]').parent();
        Offense.movableUnits.on('click', function () {
            Offense.movingRange.off('click');
            Offense.selectedUnit = $(this).children("img");
            Offense.selectedUnitMovingRange = $(this).children('img').attr('data-movement');
            Offense.selectedUnitAttackRange = $(this).children('img').attr('data-range');
            Offense.selectedUnitXpos = $(this).attr('data-xPosss');
            Offense.selectedUnitYpos = $(this).attr('data-yPosss');

            Offense.xupdateUnitRanges();
        })
    },
    xupdateUnitRanges: function(){

//        $('img').attr('data-inRange', false);
//        $('.ssquare').attr('data-innRange', false);

        Offense.xupdateMovingRange();
        Offense.xregisterMovableArea();
    },
    xupdateMovingRange: function(){

//        debugger;
        Offense.attackRange = HexRange.ycreateRangeSelector(Offense.selectedUnitXpos, Offense.selectedUnitYpos, Offense.selectedUnitAttackRange);
        Offense.movingRange = HexRange.ycreateRangeSelector(Offense.selectedUnitXpos, Offense.selectedUnitYpos, Offense.selectedUnitMovingRange);

//        debugger;
        Offense.attackRange.attr('class', 'hoverRange');
        Offense.movingRange.attr('class', 'selectedRange');

        Offense.www = Offense.movingRange.parent().parent();
        debugger;
//        $movingRangeView = Offense.xcreateRangeSelector(Offense.selectedUnitMovingRange, Offense.selectedUnitXpos, Offense.selectedUnitYpos);
        $movingRangeVieww = $('[data-innRange = true]');
        $movingRange = $movingRangeVieww.filter(function () {
            return $(this).data('occupied') == false
        });
    },
    xregisterMovableArea: function(){
        Offense.xregisterMovableHex();
        if (pregame_var == false) {
//        registerAttackUnit()
        }
    },
    xregisterMovableHex: function(){
//        debugger;
        Offense.movingRange.parent().parent().on('click', function (e) {

//            e.preventPropagation();

            Offense.movingRange.off('click');
            $moveableUnits.off('click');
            Offense.movableUnits.off('click');

//            debugger;
            var newLocation = $(this);
            var oldLocation = Offense.selectedUnit.parent();

            newMoveUnitToNewPosition(newLocation, oldLocation, Offense.selectedUnit);

            turn()
        });
    }
};