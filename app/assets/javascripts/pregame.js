
var PreGame = {
    moveableUnits: null,
    moveableRange: null,
    initialRange: null,
    selectedUnit: null,
    startAnimationExecuted: false,

    initialize: function () {
        PreGame.moveableUnits = $('img[data-team=' + 1 + ']').parent();
        PreGame.initialRange = $("[data-ring=1]");
        PreGame.moveableRange = PreGame.initialRange;
    },
    continueSetup: function(){

        var teamArray = GameStatus.convertStringToArray(You.unitsPos).reverse();

        $.each(teamArray, function (i, e) {
            Game.moveUnits(e, 1);
        });

        PreGame.loadPreGameTurn()

    },
    loadPreGameTurn: function () {
        PreGame.hexVisualUpdate();
        PreGame.resetAndUpdateUnitsAndRange();
        InfoBoxes.registerHoverUnit();
        PreGame.pregameClickUnit();
    },
    hexVisualUpdate: function () {
        PreGame.initialRange.children("svg").children("polygon").css('fill', 'blue');
        $('[data-occupied=true]').children("svg").children("polygon").css('fill', 'darkblue');
    },
    resetAndUpdateUnitsAndRange: function () {
        PreGame.moveableUnits.off('click');
        PreGame.moveableRange.off('click');
        PreGame.moveableRange = PreGame.initialRange.not('[data-occupied=true]');

        var unplacedUnits = $('img[data-team=' + 1 + '][data-status=unplaced]');
        var placedUnits = $('img[data-team=' + 1 + '][data-status=alive]').parent();
        PreGame.moveableUnits = $(unplacedUnits).add($(placedUnits));
    },

    pregameClickUnit: function () {
        PreGame.moveableUnits.on('click', function () {
            PreGame.moveableRange.off('click');
            PreGame.moveableRange = PreGame.initialRange.not('[data-occupied=true]');

            if ($(this).attr('data-status') == 'unplaced'){
                PreGame.unit = $(this);
            } else {
                PreGame.unit = $(this).children("img");
            }

            InfoBoxes.updateSelectBox(PreGame.unit);
            PreGame.registerClickHex();
        })
    },
    registerClickHex: function () {
        PreGame.moveableRange.on('click', function () {
            var newLocation = $(this);
            var oldLocation = PreGame.unit.parent();
            PreGame.moveImageToMap(PreGame.unit);
            PreGame.moveUnitToNewPosition(newLocation, oldLocation, PreGame.unit);
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
        GameStatus.saveGameStatus();

        PreGame.addStartButton();
        PreGame.loadPreGameTurn();
    },
    addStartButton: function () {
        if ($(".auxSpace").children().length == 0) {

            if (PreGame.startAnimationExecuted == false) {
                Rotator.rotateOff($('.auxSpace'));
                Rotator.rotateOn($('.startGameButton'));

                var readyPath;
                if (You.team == 1){
                    readyPath = '/home_user_ready'
                }else {
                    readyPath = '/away_user_ready'
                }
                $('.startGameButton').on('click', function () {
                    $.ajax({
                        type: 'put',
                        url: readyPath,
                        data: {
                            match_id: Game.matchID
                        },
                        dataType: 'json'
                    });
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