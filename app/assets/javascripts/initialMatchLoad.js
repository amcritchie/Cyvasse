var InitialMatchLoad = {
    onPageLoad: function () {
        MatchData.loadMatchDataToJavaScript();
        LoadingFactory.loadMapUnitsAndEnemiesHTML();
        InitialMatchLoad.setGlobalHexVariables();
        InitialMatchLoad.runGame();
    },
    setGlobalHexVariables: function(){
        $allHexDivs = $('.hexDiv');
        $allHexSVGs = $allHexDivs.children('svg');
        $allHexPoly = $allHexSVGs.children('polygon');
        $allHexPoly.css('fill', 'black');
    },
    runGame: function () {
        if (You.ready == 'true') {
            InitialMatchLoad.readyFunctions();
        } else {
            InitialMatchLoad.notReadyFunctions();
        }
    },
    notReadyFunctions: function(){
        if (You.unitsPos == '') {
            InitialMatchLoad.freshLoad()
        } else {
            InitialMatchLoad.continuePregame()
        }
    },
    freshLoad: function () {
        Rotator.rotateOn('.auxSpace');
        InitialMatchLoad.loadPregame();
        if (MatchData.firstGame === 'true'){
            Tutorial.welcome();
        }
    },
    continuePregame: function () {
        AwayTeamNormalize.placeUnits(GameStatus.convertStringToArray(You.unitsPos).reverse(),You.team);
        InitialMatchLoad.loadPregame();
        if ($(".auxSpace").children().length != 0) {
            Rotator.rotateOn('.auxSpace');
        } else {
            PreGame.loadStartButton();
        }
    },
    loadPregame: function () {
        PreGame.initialize();
        PreGame.loadPreGameTurn();
        InitialMatchLoad.savedSetups();
        InitialMatchLoad.randomSetupButton();
    },
    readyFunctions: function(){
        if (Game.status == 'finished'){
            InitialMatchLoad.finishedGame();
        } else {
            InitialMatchLoad.nonFinishedGame();
        }
    },
    finishedGame: function(){
        Game.offense = parseInt(document.getElementById('whosTurn').innerHTML);
        Game.finishedGame()
    },
    nonFinishedGame: function () {
        if (Opponent.ready == 'true') {
            InitialMatchLoad.continueGame();
        } else {
            InitialMatchLoad.opponentNotReady();
        }
    },
    continueGame: function () {
        Game.turn = parseInt(document.getElementById('matchTurn').innerHTML);
        Game.lastMove = document.getElementById('matchLastMove').innerHTML;
        MatchData.whoStarted = parseInt(document.getElementById('matchWhoStarted').innerHTML);
        Game.oldGame();
    },
    opponentNotReady: function(){
        Rotator.createAndRotateOn('pleaseWait', 'Opponent is setting up, Please Wait');
        AwayTeamNormalize.placeUnits(GameStatus.convertStringToArray(You.unitsPos).reverse(),You.team);
        $('[data-occupied=true]').children("svg").children("polygon").css('stroke', 'blue');
        setTimeout(function () {
            window.location.reload()
        }, 4000)
    },
    randomSetupButton: function(){
        Rotator.createAndRotateOn('randomSetUpButton', 'Random Setup');
        $('.randomSetUpButton').on('click', function () {
            RandomSetup.placeUnits();
            PreGame.saveYourSide();
            Tutorial.step = 6;
        });
    },
    savedSetups: function(){
        for (var i = 1; i <= 3; i++) {
            var setup = $('#setup'+i);
            if (setup.data('name')){
                PreGame.setups[i] = [setup.data('name'),setup.data('unitposition'),setup.data('id')]
            } else {
                PreGame.setups[i] = ['Blank',null,null]
            }
            Rotator.createAndRotateSetupButton(i, PreGame.setups[i][0]);
        }
        Setup.activateClick();
    }
};