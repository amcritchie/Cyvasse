var PreGame = {

//    loadPregameButton: function () {
//        debugger;
//        $(".map").prepend("<button class='loadEnemiesButton'>Load Enemies</button>");
//        $(".map").prepend("<button class='randomSetUpButton'>Random Setup</button>");
//        $(".map").prepend("<button class='randomSetUpButton'>Random Setup</button>");
//
//        $(".map").prepend("<button class='enemyLineUpOne'>Enemy Lineup 1</button>");
//
//        $('.loadEnemiesButton').on('click', function () {
//            placeEnemies()
//        });
//        $('.randomSetUpButton').on('click', function () {
//            placeUnits()
//        });
//        $('.enemyLineUpOne').on('click', function () {
//            placeLineOne()
//        });
//    },

    loadPreGameFunctions: function () {
        PreGame.initializeHexagons();
        PreGame.resetAndUpdateUnitsAndRange();
        registerHoverUnit();
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
            $('.startGameButton').off('click').remove();
            $(".map").prepend("<button class='startGameButton'>Start Game</button>");
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