var PreGame = {
    moveableUnits: null,
    moveableRange: null,
    initialRange: null,
    selectedUnit: null,
    startAnimationExecuted: false,

    initialize: function () {
        PreGame.moveableUnits = $('img[data-team=' + 1 + ']').parent();
        PreGame.moveableRange = $("[data-innrange=true]");
        PreGame.initialRange = PreGame.moveableRange;
    },
    loadPreGameTurn: function () {
        PreGame.hexVisualUpdate();
        PreGame.resetAndUpdateUnitsAndRange();
        InfoBoxes.registerHoverUnit();
        PreGame.pregameClickUnit();
    },
    hexVisualUpdate: function () {
        PreGame.initialRange.children("svg").children("polygon").css('fill', 'royalblue');
        $('[data-occupied=true]').children("svg").children("polygon").css('fill', 'yellow');
    },
    resetAndUpdateUnitsAndRange: function () {
        PreGame.moveableUnits.off('click');
        PreGame.moveableRange.off('click');
        PreGame.moveableRange = PreGame.initialRange.not('[data-occupied=true]');
        PreGame.moveableUnits = $('img[data-team=' + 1 + ']').parent();
    },

    pregameClickUnit: function () {
        PreGame.moveableUnits.on('click', function () {
            PreGame.selectedUnit = $(this).children("img");
            InfoBoxes.updateSelectBox(PreGame.selectedUnit);
            PreGame.registerClickHex();
        })
    },
    registerClickHex: function () {
        PreGame.moveableRange.on('click', function () {
            var newLocation = $(this);
            var oldLocation = PreGame.selectedUnit.parent();
            PreGame.moveImageToMap(PreGame.selectedUnit);
            PreGame.moveUnitToNewPosition(newLocation, oldLocation, PreGame.selectedUnit);
            PreGame.finishMove();
        });
    },
    moveImageToMap: function (unit) {
        if (unit.attr('data-status') == 'unplaced') {
            $("#aux" + unit.attr('data-index')).remove();
            unit.prependTo(".map");
            unit.attr('data-status', 'alive');
        }
    },
    moveUnitToNewPosition: function (newLocation, oldLocation, movingUnit) {
        var movingTo = $(newLocation);
        var movingFrom = $(oldLocation);
        movingUnit.prependTo(movingTo);
        movingTo.attr('data-occupied', true);
        movingFrom.attr('data-occupied', false);
    },
    finishMove: function(){
        PreGame.addStartButton();
        PreGame.loadPreGameTurn();
    },
    addStartButton: function () {
        if ($(".unplacedUnitSpace").length == 0) {

            if (PreGame.startAnimationExecuted == false) {
                Rotator.rotateOff($('.auxSpace'));
                Rotator.rotateOn($('.startGameButton'));
                $('.startGameButton').on('click', function () {
                    RandomSetup.placeLineOne();
                    PreGame.initialRange.off('click');
                    Rotator.rotateOff($('.startGameButton'));
                    Rotator.rotateOff($('.randomSetUpButton'));
                    Game.startGame()
                });
                PreGame.startAnimationExecuted = true;
            }
        }
    }
};