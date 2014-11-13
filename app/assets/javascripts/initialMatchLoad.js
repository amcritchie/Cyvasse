
var InitialMatchLoad = {

    onPageLoad: function () {
        LoadingFactory.loadMapUnitsAndEnemiesHTML();

        InfoBoxes.registerHoverUnit();

        PreGame.initialize();
        PreGame.loadPreGameTurn();

        pregame_var = true;
        RandomSetup.loadPregameButton();

        setTimeout(function(){
            InitialMatchLoad.loadButtons()
        }, 2000);
    },

    loadButtons: function(){
        Rotator.createAndRotateOn('oldGame', 'Old Game');
        Rotator.createAndRotateOn('newGame', 'New Game');

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
    },

    buttonClicked: function(){
        $('.newGame').off('click').remove();
        $('.oldGame').off('click').remove();
        $('.xxmap').show();
    }
};