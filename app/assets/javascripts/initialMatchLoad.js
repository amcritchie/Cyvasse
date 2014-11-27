
var InitialMatchLoad = {

    onPageLoad: function () {
        LoadingFactory.loadMapUnitsAndEnemiesHTML();
        Game.grabMatchData();

        if (Game.matchAgainst == 'computer'){
            Game.playingAI = true
        }

        $allHexDivs = $('.hexDiv');
        $allHexSVGs = $allHexDivs.children('svg');
        $allHexPoly = $allHexSVGs.children('polygon');

        if (Game.matchStatus == 'new'){
            InitialMatchLoad.loadNewGameComputer();
        } else if (Game.matchStatus == 'in progress') {
            Game.turn = parseInt(document.getElementById('matchTurn').innerHTML);
            Game.whoStarted = parseInt(document.getElementById('matchWhoStarted').innerHTML);
            InitialMatchLoad.loadOldGame();
        } else if (Game.matchStatus == 'pending'){
            InitialMatchLoad.loadNewGamePending();
        }
    },

    loadNewGameComputer: function(){

        PreGame.initialize();
        PreGame.loadPreGameTurn();
        pregame_var = true;
        Game.playingAI = true;

        $(".map").prepend("<button class='startGameButton rotating'>Start Game</button>");
        Rotator.rotateOn('.auxSpace');
        Rotator.createAndRotateOn('randomSetUpButton', 'Random Setup');

        $('.randomSetUpButton').on('click', function () {
            RandomSetup.placeUnits()
        });

    },

    loadNewGamePending: function(){
        InitialMatchLoad.buttonClicked();

        $(".map").prepend("<button class='startGameButton rotating'>Start Game</button>");
        Rotator.rotateOn('.auxSpace');
        Rotator.createAndRotateOn('randomSetUpButton', 'Random Setup');

        $('.randomSetUpButton').on('click', function () {
            RandomSetup.placeUnits()
        });
    },

    loadOldGame: function(){
        Game.oldGame();
    },

    loadButtons: function(){
//        Rotator.createAndRotateOn('oldGame', 'Old Game');
//        Rotator.createAndRotateOn('newGame', 'New Game');
//        Rotator.createAndRotateOn('playComputer', 'Play Computer');
//        Rotator.createAndRotateOn('simulation', 'Computer vs. Computer');

        $('.newGame').on('click', function () {
//            InitialMatchLoad.buttonClicked();
//
//            $(".map").prepend("<button class='startGameButton rotating'>Start Game</button>");
//            Rotator.rotateOn('.auxSpace');
//            Rotator.createAndRotateOn('randomSetUpButton', 'Random Setup');
//
//            $('.randomSetUpButton').on('click', function () {
//                RandomSetup.placeUnits()
//            });
        });

        $('.oldGame').on('click', function () {
//            InitialMatchLoad.buttonClicked();
//            Game.oldGame();
        });

        $('.playComputer').on('click', function () {
//            InitialMatchLoad.buttonClicked();
//            Game.playingAI = true;
//
//            $(".map").prepend("<button class='startGameButton rotating'>Start Game</button>");
//            Rotator.rotateOn('.auxSpace');
//            Rotator.createAndRotateOn('randomSetUpButton', 'Random Setup');
//
//            $('.randomSetUpButton').on('click', function () {
//                RandomSetup.placeUnits()
//            });
        });

        $('.simulation').on('click', function () {
            InitialMatchLoad.buttonClicked();
            Game.playingAI = true;
            Game.playingAsAI = true;

            var setup0 = Math.floor(Math.random() * 3) + 1;
            var setup1 = Math.floor(Math.random() * 3) + 1;

            var string0;
            var string1;

            if (setup0 == 1){
//                string0 = '19:22|18:23|17:24|16:25|15:26|14:27|13:28|12:29|11:30|10:31|9:32|8:33|7:34|6:35|5:36|4:37|3:38|2:39|1:40|'
                string0 = '4:36|5:35|1:32|2:39|3:33|7:27|6:25|9:23|8:29|11:22|10:30|12:24|13:28|14:26|19:34|18:37|17:18|16:17|15:16|'

            } else if (setup0 == 2) {
                string0 = '1:39|2:23|3:28|4:33|5:25|6:16|7:36|' +
                    '8:35|9:27|10:38|11:32|' +
                    '12:26|13:34|14:29|15:24|' +
                    '16:20|17:6|18:12|19:13|'

            } else {
                string0 = '19:22|18:23|17:24|16:25|15:26|14:27|13:28|12:29|11:30|10:31|9:32|8:33|7:34|6:35|5:36|4:37|3:38|2:39|1:40|'
            }


            if (setup1 == 1){
                string1 = '13:52|1:53|9:54|18:55|10:56|5:57|19:58|8:59|7:60|3:61|4:62|14:63|12:64|15:65|11:66|6:67|16:70|17:74|2:75|'
            } else if (setup1 == 2) {
                string1 = '2:52|1:53|8:54|11:55|5:56|6:57|4:58|3:59|9:60|10:61|12:63|15:65|7:66|14:67|13:69|18:84|19:85|16:86|17:91|'
            } else {
                string1 = '2:52|1:53|8:54|11:55|5:56|6:57|4:58|3:59|9:60|10:61|12:63|15:65|7:66|14:67|13:69|18:84|19:85|16:86|17:91|'
            }

            Game.placeTeam(1,string1);
            Game.placeTeam(0,string0);

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