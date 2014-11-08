var PreGame = {

    loadPreGameFunctions: function () {
        PreGame.initializeHexagons();
        PreGame.resetAndUpdateUnitsAndRange();
        registerHoverUnit();
//        debugger;
        PreGame.pregameClickUnit();
    },

    initializeHexagons: function () {
        $allHexagons.attr('class', 'unSelected');
        $initialRange.children("svg").children("polygon").attr('class', 'selectedRange');
        $('[data-occupied=true]').children("svg").children("polygon").attr('class', 'yourUnit');
    },

    resetAndUpdateUnitsAndRange: function () {
        $movingRange.off('click');
        $moveableUnits.off('click');
        $movingRange = $initialRange.not('[data-occupied=true]');
        $moveableUnits = $('img[data-team=' + 1 + ']').parent();
    },

    pregameClickUnit: function () {
        $moveableUnits.on('click', function () {
            $selectedUnit = $(this).children("img");
            updateSelectBox($selectedUnit);
            PreGame.registerClickHex($movingRange);
        })
    },

    registerClickHex: function (movingRange) {
        movingRange.on('click', function () {
            var newLocation = $(this);
            var oldLocation = $selectedUnit.parent();
            PreGame.moveImageToMap($selectedUnit);
            PreGame.moveUnitToNewPosition(newLocation, oldLocation, $selectedUnit);
            PreGame.addStartButton();
            PreGame.loadPreGameFunctions();
        });
    },



    startAnimationExecuted: false,
    addStartButton: function () {
        if ($(".unplacedUnitSpace").length == 0) {

            if (PreGame.startAnimationExecuted == false) {
                Rotator.rotateOff($('.auxSpace'));
                Rotator.rotateOn($('.startGameButton'));
                PreGame.startAnimationExecuted = true;
            } else {
                $('.startGameButton').off('click');
            }

            $('.startGameButton').on('click', function () {
                RandomSetup.placeLineOne();
                $initialRange.off('click');
                Rotator.rotateOff($('.startGameButton'));
                Rotator.rotateOff($('.randomSetUpButton'));

                startGame()
            })
        }
    },

    moveImageToMap: function(unit){
        if (unit.attr('data-status') == 'unplaced') {
            $("#aux" + unit.attr('data-index') + " ").remove();
            unit.prependTo(".map");
            unit.attr('data-status', 'alive');
        }
    },

    moveUnitToNewPosition: function(newLocation, oldLocation, movingUnit){
        var movingTo = $(newLocation);
        var movingFrom = $(oldLocation);
        movingUnit.prependTo(movingTo);
        movingTo.attr('data-occupied', true);
        movingFrom.attr('data-occupied', false);
    }

};

var Rotator = {
    createAndRotateOn: function(button,text){
        $(".xxmap").prepend("<button class='" + button +" rotating'>" + text + "</button>");
        Rotator.rotateOn($('.'+button))
    },

    rotateOn: function(button){
        $(button).animate(
            {
                opacity: 1,
                left: "+=700"
            },
            {
                duration: 'slow'
            });
    },
    rotateOff: function(button){
        $(button).animate(
            {
                opacity: 0,
                left: "+=700"
            },
            {
                duration: 'slow',
                complete: function () {
                    $(button).remove();
                }
            });
    }

};