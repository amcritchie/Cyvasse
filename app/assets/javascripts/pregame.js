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

    addStartButton: function () {
        if ($(".unplacedUnitSpace").length == 0) {

            $('.auxSpace').animate(
                {
                    opacity: 0,
                    left: "+=700"
                },
                {
                    duration: 'slow',
                    complete: function () {
                        $('.auxSpace').remove();
                    }
                });

            $('.startGameButton').animate(
                {
                    opacity: 1,
                    left: "+=700"//                left: '0'
                },
                {
                    duration: 'slow'
                });




//            $('.auxSpace').fadeOut(1000);
//            $('.startGameButton').off('click').remove();
//            $(".extraSpace").prepend("<button class='startGameButton'>Start Game</button>");
            $('.startGameButton').on('click', function () {
                $initialRange.off('click');
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