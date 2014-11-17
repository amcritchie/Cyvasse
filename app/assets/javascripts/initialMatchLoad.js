
var InitialMatchLoad = {

    onPageLoad: function () {
        LoadingFactory.loadMapUnitsAndEnemiesHTML();

        $allHexDivs = $('.hexDiv');
        $allHexSVGs = $allHexDivs.children('svg');
        $allHexPoly = $allHexSVGs.children('polygon');

        InfoBoxes.registerHoverUnit();

        PreGame.initialize();
        PreGame.loadPreGameTurn();

        pregame_var = true;
        RandomSetup.loadPregameButton();

        setTimeout(function(){
            InitialMatchLoad.loadButtons()
        }, 200);

    },

    loadButtons: function(){
        Rotator.createAndRotateOn('oldGame', 'Old Game');
        Rotator.createAndRotateOn('newGame', 'New Game');
        Rotator.createAndRotateOn('playComputer', 'Play Computer');
        Rotator.createAndRotateOn('simulation', 'Computer vs. Computer');

        $('.newGame').on('click', function () {
            InitialMatchLoad.buttonClicked();

            $(".map").prepend("<button class='startGameButton rotating'>Start Game</button>");
            Rotator.rotateOn('.auxSpace');
            Rotator.createAndRotateOn('randomSetUpButton', 'Random Setup');

            $('.randomSetUpButton').on('click', function () {
                RandomSetup.placeUnits()
            });
        });

        $('.oldGame').on('click', function () {
            InitialMatchLoad.buttonClicked();
            Game.oldGame();
        });

        $('.playComputer').on('click', function () {
            InitialMatchLoad.buttonClicked();
            Game.playingAI = true;

            $(".map").prepend("<button class='startGameButton rotating'>Start Game</button>");
            Rotator.rotateOn('.auxSpace');
            Rotator.createAndRotateOn('randomSetUpButton', 'Random Setup');

            $('.randomSetUpButton').on('click', function () {
                RandomSetup.placeUnits()
            });
        });

        $('.simulation').on('click', function () {
            InitialMatchLoad.buttonClicked();
            Game.playingAI = true;
            Game.playingAsAI = true;

            RandomSetup.placeUnits();
            RandomSetup.placeLineOne();
            PreGame.initialRange.off('click');

            Game.startGame()
        });
    },

    buttonClicked: function(){
        $('.newGame').off('click').remove();
        $('.oldGame').off('click').remove();
        $('.playComputer').off('click').remove();
        $('.simulation').off('click').remove();

        $('.xxmap').show();
    }
};