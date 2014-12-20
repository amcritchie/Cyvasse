var PreGame = {
    moveableUnits: null,
    moveableRange: null,
    initialRange: null,
    selectedUnit: null,
    hintOne: null,
    hintTwo: null,
    startAnimationExecuted: false,

    setups: [],

    initialize: function () {
        PreGame.moveableUnits = $('img[data-team=' + You.team + ']').parent();
        PreGame.initialRange = $("[data-ring=1]");
        PreGame.moveableRange = PreGame.initialRange;
    },
    loadPreGameTurn: function () {
        PreGame.hexVisualUpdate();
        PreGame.resetAndUpdateUnitsAndRange();
        PreGame.pregameClickUnit();
    },
    hexVisualUpdate: function () {
        PreGame.initialRange.children("svg").children("polygon").css('fill', 'blue');
        $('[data-occupied=true]').children("svg").children("polygon").css('fill', 'darkblue');
    },
    resetAndUpdateUnitsAndRange: function () {
        PreGame.moveableUnits.off('click');
        PreGame.moveableRange.off('click');
        PreGame.moveableUnits = PreGame.placedAndUnplacedUnits();
    },
    placedAndUnplacedUnits: function () {
        var unplacedUnits = $('img[data-team=' + You.team + '][data-status=unplaced]');
        var placedUnits = $('img[data-team=' + You.team + '][data-status=alive]').parent();
        return $(unplacedUnits).add($(placedUnits))
    },
    pregameClickUnit: function () {
        PreGame.moveableUnits.on('click', function () {
            if (Tutorial.step === 2) {
                $('.tutorial').remove();
                Tutorial.placeUnit();
            }
            PreGame.moveableRange.off('click');
            PreGame.moveableRange = PreGame.initialRange.not('[data-occupied=true]');
            PreGame.updateSelectUnit($(this));
            InfoBoxes.updateSelectBox(PreGame.unit);
            PreGame.registerClickHex();
        })
    },
    updateSelectUnit: function (unit) {
        if (unit.attr('data-status') == 'unplaced') {
            PreGame.unit = unit;
        } else {
            PreGame.unit = unit.children("img");
        }
    },
    registerClickHex: function () {
        PreGame.moveableRange.on('click', function () {
            if (Tutorial.step === 3) {
                $('.tutorial').remove();
                Tutorial.secondMove();
                PreGame.hintOne = setTimeout(function () {
                    $('.tutorial').remove();
                    Tutorial.goal();
                    PreGame.hintTwo = setTimeout(function () {
                        $('.tutorial').remove();
                        Tutorial.whoGoesFirst();
                    }, 7000)
                }, 7000);
            }
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
    finishMove: function () {
        PreGame.saveYourSide();
        PreGame.readyForStartButton();
        PreGame.loadPreGameTurn();
    },
    saveYourSide: function () {
        if (You.team == 1) {
            GameStatus.saveHomeUnitsPosition()
        } else {
            GameStatus.saveAwayUnitsPosition()
        }
    },
    readyForStartButton: function () {
        if (($(".auxSpace").children().length == 0) && (PreGame.startAnimationExecuted == false)) {
            PreGame.loadStartButton()
        }
    },
    loadStartButton: function () {
        Rotator.rotateOff($('.auxSpace'));
        Rotator.createAndRotateOn('startGameButton', 'Start Game');

        if (Game.firstGame === 'true') {
            clearTimeout(PreGame.hintOne);
            clearTimeout(PreGame.hintTwo);
            $('.tutorial').remove();
            Tutorial.startGame();
        }
        $('.startGameButton').on('click', function () {
            PreGame.onStartButtonClick();
        });
        PreGame.startAnimationExecuted = true;
    },
    onStartButtonClick: function () {
        PreGame.startButtonAjax();
        You.ready = true;
        PreGame.initialRange.off('click');
        Rotator.rotateOff($('.startGameButton'));
        Rotator.rotateOff($('.randomSetUpButton'));
        PreGame.readyOpponent();
    },
    startButtonAjax: function () {
        $.ajax({
            type: 'put',
            url: PreGame.readyPath(),
            data: {
                match_id: Game.matchID
            },
            dataType: 'json'
        });
    },
    readyPath: function () {
        if (You.team == 1) {
            return '/home_user_ready'
        } else {
            return '/away_user_ready'
        }
    },
    readyOpponent: function () {
        if (Opponent.ready == 'true') {
            Game.startGame()
        } else {
            Rotator.createAndRotateOn('pleaseWait', 'Opponent is setting up, Please Wait');
            setTimeout(function () {
                window.location.reload()
            }, 5000)
        }
    }
};