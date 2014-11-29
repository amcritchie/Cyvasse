
var You = {
    team: null,
    ready: null,
    unitsPos: null
};

var Opponent = {
    isA: null,
    team: null,
    ready: null,
    unitsPos: null
};

var Game = {

    turn: null,

    whoStarted: null,
    startTime: null,

    offense: null,
    defense: null,

    player1name: null,
    player0name: null,

    playingAI: false,
    playingAsAI: false,

    currentUser: null,
    homeUser:null,
    awayUser:null,

    currentUserIsTeam: null,

    matchID: null,
    matchStatus: null,
    matchAgainst: null,
    homeUnitsString: null,
    awayUnitsString: null,

    grabMatchData: function(){
        Game.currentUser = parseInt(document.getElementById('currentUserID').innerHTML);
        Game.homeUser = parseInt(document.getElementById('homeID').innerHTML);
        Game.awayUser = parseInt(document.getElementById('awayID').innerHTML);

        if (Game.currentUser == Game.homeUser){
            Game.currentUserIsTeam = 1;
            You.team = 1;
            You.ready = document.getElementById('homeReady').innerHTML;
            You.unitsPos = document.getElementById('homeUnitsPos').innerHTML;
            Opponent.team = 0;
            Opponent.ready = document.getElementById('awayReady').innerHTML;
            Opponent.unitsPos = document.getElementById('awayUnitsPos').innerHTML;

        } else if (Game.currentUser == Game.awayUser){
            Game.currentUserIsTeam = 0;
            You.team = 0;
            You.ready = document.getElementById('awayReady').innerHTML;
            You.unitsPos = document.getElementById('awayUnitsPos').innerHTML;
            Opponent.team = 1;
            Opponent.ready = document.getElementById('homeReady').innerHTML;
            Opponent.unitsPos = document.getElementById('homeUnitsPos').innerHTML;
        } else{
            debugger;
        }

        Game.turn = parseInt(document.getElementById('matchTurn').innerHTML);
        Game.whoStarted = parseInt(document.getElementById('matchWhoStarted').innerHTML);

        Game.matchID = parseInt(document.getElementById('matchID').innerHTML);
        Game.matchStatus = document.getElementById('matchStatus').innerHTML;
        Game.matchAgainst = document.getElementById('matchAgainst').innerHTML;
        Game.homeUnitsString = document.getElementById('homeUnitsPos').innerHTML;
        Game.awayUnitsString = document.getElementById('awayUnitsPos').innerHTML;

        Opponent.isA = Game.matchAgainst;
    },

    startGame: function () {

        Game.turn = 1;

        $('.loadEnemiesButton').off('click').remove();
        $('.enemyLineUpOne').off('click').remove();

        addAIButtons();
        Game.whoGoesFirst();

        GameStatus.saveGameStatus();
        $.ajax({
            type: 'put',
            url: '/start_game',
            data: {match_id: Game.matchID, who_started: Game.offense},
            dataType: 'json'
        });

        Rotator.createAndRotateOn('whoGoesFirst', 'Team ' + Game.offense + ' moves first.');
        setTimeout(function () {
            Rotator.rotateOff('.whoGoesFirst');
        }, 1300);

        Game.startTime = new Date();
        Game.runTurn(Game.offense)
    },

    whoGoesFirst: function () {

        var $team0King = $('[alt=king][data-team=0]');
        var $team1King = $('[alt=king][data-team=1]');

        var team0distance = (Math.abs(6 - $team0King.parent().data('ypos')));
        var team1distance = (Math.abs(6 - $team1King.parent().data('ypos')));


        if (team0distance > team1distance) {
            Game.offense = 1;
        } else {
            Game.offense = 0;
        }
    },

    firstTurn: function (offense) {
        Game.turn = 1;
        Game.whoStarted = offense;
        Offense.runOffense(offense)

    },


    runTurn: function (offense) {

        clearInterval(Animation.function);
        Rotator.createAndRotateOn('turn', 'Turn ' + Game.turn);

        setTimeout(function () {
            Rotator.rotateOff('.turn');
        }, 1300);

        $('.hexPolygon').css('fill', 'black');
        $('.hexPolygon').css('stroke', 'white');
        $('.hexSVG').css('overflow', 'hidden');
        $('.hexSVG').css('z-index', '2');

        $('[data-team=1]').parent().children('svg').children('polygon').css('stroke', 'blue');

        $('[data-team=1]').parent().children('svg').css('overflow', 'overlay');
        $('[data-team=1]').parent().children('svg').css('z-index', '3');
        $('[data-team=0]').parent().children('svg').css('overflow', 'overlay');
        $('[data-team=0]').parent().children('svg').css('z-index', '3');

        $('[data-team=0]').parent().children('svg').children('polygon').css('stroke', 'red');

        Offense.runOffense(Game.offense);

        if ((Game.offense == 0) && (Game.playingAI == true)) {
            AI.makeAMove();
        }

        if ((Game.offense == 1) && (Game.playingAsAI == true)) {
            AI.makeAMove();
        }
    },

    placeTeam: function(team, string){
        var teamArray = GameStatus.convertStringToArray(string);
        $.each(teamArray, function (i, e) {
            Game.moveUnits(e, team);
        });
    },

    oldGame: function () {

        var teamOneArray = GameStatus.convertStringToArray(Game.homeUnitsString);
        var teamTwoArray = GameStatus.convertStringToArray(Game.awayUnitsString);

        $.each(teamOneArray, function (i, e) {
            Game.moveUnits(e, 1);
        });
        $.each(teamTwoArray, function (i, e) {
            Game.moveUnits(e, 0);
        });


        if (Game.whoStarted == 1){
            Game.offense = Game.turn%2
        } else {
            Game.offense = Math.abs((Game.turn%2) - 1)
        }

        Game.runTurn();
    },

    moveUnits: function (positionArray, team) {
        var unit = $('[data-team=' + team + '][data-index=' + positionArray[0] + ']');
        if (positionArray[1] == 'g' + team) {
            unit.attr('data-status', 'dead');
            unit.prependTo($('#' + positionArray[1]));
        } else if (positionArray[1] == 'lDock'){

            unit.attr('data-status', 'unplaced');
            unit.prependTo($('#' + positionArray[1]));

        }else {
            unit.attr('data-status', 'alive');
            unit.prependTo($('[data-hexIndex=' + positionArray[1] + ']'));
            $('[data-hexIndex=' + positionArray[1] + ']').attr('data-occupied','true')
        }
    },

    finishTurn: function(){
        Game.turn += 1;
        Game.defense = Game.offense;
        Game.offense = Math.abs(Game.offense - 1);

        GameStatus.saveGameStatus();

        Game.runTurn();
    },

    over: function(){
        var stop = new Date();
        var teamNum = Game.offense;
        Rotator.createAndRotateOn('over', 'Team: '+teamNum+' wins, at turn ' + Game.turn + '.  The game took '+parseInt((stop - Game.startTime)/1000)+'s');
    }
};

