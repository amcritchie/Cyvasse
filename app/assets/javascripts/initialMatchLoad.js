var Tutorial = {
    step: 0,
    welcome: function () {
        $(".map").prepend("<button class='tutorialWelcome tutorial'><h5>Welcome to Cyvasse,</h5><h6> here is a quick tutorial on how to play.</h6><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialWelcome'))
    },
    selectUnit: function () {
        $(".map").prepend("<button class='tutorialSelectUnit tutorial'>&#8599<h5>These are your units,</h5><h6>click one.</h6><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialSelectUnit'));
        Tutorial.step = 2
    },
    placeUnit: function (){
        $(".map").prepend("<button class='tutorialStats tutorial'><h5>You can see this units stats here. &#8594</h5><p>(Each unit has different strengths and abilities so check them all out)</p><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialStats'));
        $(".map").prepend("<button class='tutorialPlaceUnit tutorial'><h5>Click on a blue hex, to place this unit.</h5><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialPlaceUnit'));
        Tutorial.step = 3;
    },
    secondMove: function (){
        $(".map").prepend("<button class='tutorialSecondMove tutorial'>&#8599<h5>Great!  Now you can place your units manually, or randomly place the rest of them. &#8594</h5><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialSecondMove'));
        Tutorial.step = 4;
    },
    goal: function (){
        $(".map").prepend("<button class='tutorialGoal tutorial'><img src='/images/svgs/king.svg' style='width: 30px'><h5>The goal of Cyvasse is to capture your opponents king, so hide yours!</h5><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialGoal'));
    },
    whoGoesFirst: function (){
        $(".map").prepend("<button class='tutorialWhoGoesFirst tutorial'><h5>The first turn is rewarded to the army whos king is closest to the front line.</h5>&#8596<br><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialWhoGoesFirst'));
    },
    startGame: function (){
        $(".map").prepend("<button class='tutorialStartGame tutorial'>&#8592<h5>Your army is now on the board.  You may now start the game!</h5><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialStartGame'));
//        Tutorial.step += 1
    },
    firstTurn: function (){
        $(".map").prepend("<button class='tutorialFirstTurn tutorial'><h5>Looks like your opponent goes first!</h5><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialFirstTurn'));
        Tutorial.step = 7
    },
    secondTurn: function(){
        $(".map").prepend("<button class='tutorialSecondTurn tutorial'><h5>Now its your turn, click a piece to see what it can do!</h5><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialSecondTurn'));
        Tutorial.step += 1;
    },
    attack: function(){
        $(".map").prepend("<button class='tutorialAttack tutorial'><h5>Blue hexagons can be moved to, and red hexagons are capturable enemies</h5><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialAttack'));
        Tutorial.step += 1;
    },
    goodLuck: function(){
        $(".map").prepend("<button class='tutorialGoodLuck tutorial'><h6>And that's all you need to know about Cyvasse.</h6><h5>Good Luck!!!</h5><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialGoodLuck'));
        Tutorial.step += 1;
    }
};

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
        PlaceUnits.byArray(GameStatus.convertStringToArray(You.unitsPos).reverse(),You.team);
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
        PlaceUnits.byArray(GameStatus.convertStringToArray(You.unitsPos).reverse(),You.team);
        $('[data-occupied=true]').children("svg").children("polygon").css('stroke', 'blue');
        setTimeout(function () {
            window.location.reload()
        }, 4000)
    },
    loadOldGame: function () {
        Game.turn = parseInt(document.getElementById('matchTurn').innerHTML);
        Game.whoStarted = parseInt(document.getElementById('matchWhoStarted').innerHTML);
        Game.oldGame();
    },
    finishedGame: function(){
        Game.offense = parseInt(document.getElementById('whosTurn').innerHTML);
        Game.finishedGame()
    }
};