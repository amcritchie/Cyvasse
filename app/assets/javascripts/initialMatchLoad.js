var InitialMatchLoad = {
    onPageLoad: function () {
        Game.grabMatchData();
        LoadingFactory.loadMapUnitsAndEnemiesHTML();
        InitialMatchLoad.setGlobalHexVariables();
        if (You.ready == 'true') {
            InitialMatchLoad.readyFunctions();
        } else {
            InitialMatchLoad.notReadyFunctions();
        }
    },
    setGlobalHexVariables: function(){
        $allHexDivs = $('.hexDiv');
        $allHexSVGs = $allHexDivs.children('svg');
        $allHexPoly = $allHexSVGs.children('polygon');
        $allHexPoly.css('fill', 'black');
    },
    readyFunctions: function(){
        if (Game.matchStatus == 'finished'){
            InitialMatchLoad.finishedGame();
        } else {
            if (Opponent.ready == 'true') {

                InitialMatchLoad.loadOldGame();
            } else {
                InitialMatchLoad.readyPlayer();
            }
        }
    },
    notReadyFunctions: function(){
        PreGame.initialize();
        if (You.unitsPos == '') {
            InitialMatchLoad.freshLoad()
        } else {
            InitialMatchLoad.continuePregame()
        }
    },
    freshLoad: function () {
        PreGame.loadPreGameTurn();
        Rotator.rotateOn('.auxSpace');
        InitialMatchLoad.randomSetupButton();
        if (Game.firstGame === 'true'){
            Tutorial.welcome();
            setTimeout(function(){
                Tutorial.selectUnit();
            },1000);
        }
    },
    continuePregame: function () {
        AwayTeamNormalize.placeUnits(GameStatus.convertStringToArray(You.unitsPos).reverse(),You.team);
        PreGame.loadPreGameTurn();
        InitialMatchLoad.randomSetupButton();
        if ($(".auxSpace").children().length != 0) {
            Rotator.rotateOn('.auxSpace');
        } else {
            PreGame.loadStartButton();
        }
    },
    randomSetupButton: function(){
        Rotator.createAndRotateOn('randomSetUpButton', 'Random Setup');
        $('.randomSetUpButton').on('click', function () {
            RandomSetup.placeUnits();
            PreGame.saveYourSide();
            Tutorial.step = 6;
        });
    },
    readyPlayer: function(){
        Rotator.createAndRotateOn('pleaseWait', 'Opponent is setting up, Please Wait');
        AwayTeamNormalize.placeUnits(GameStatus.convertStringToArray(You.unitsPos).reverse(),You.team);
        $('[data-occupied=true]').children("svg").children("polygon").css('stroke', 'blue');
        setTimeout(function () {
            window.location.reload()
        }, 4000)
    },
    loadOldGame: function () {
        Game.turn = parseInt(document.getElementById('matchTurn').innerHTML);
        Game.whoStarted = parseInt(document.getElementById('matchWhoStarted').innerHTML);
        Game.lastMove = document.getElementById('matchLastMove').innerHTML;
        Game.oldGame();
    },
    finishedGame: function(){
        Game.offense = parseInt(document.getElementById('whosTurn').innerHTML);
        Game.finishedGame()
    }
};