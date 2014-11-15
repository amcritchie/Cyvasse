
var Game = {

    turn: null,
    whoStarted: null,

    offense: null,
    defense: null,

    player1name: null,
    player0name: null,

    playingAI: false,

    startGame: function(){

        Game.turn = 0;
        Game.offense = 1;
        Game.defense = Math.abs(Game.offense - 1);

        $('.loadEnemiesButton').off('click').remove();
        $('.enemyLineUpOne').off('click').remove();

        addAIButtons();
        Game.whoGoesFirst();
        Game.runTurn(Game.offense)
    },

    whoGoesFirst: function(){
        Game.offense = 1;
        Game.defense = Math.abs(offense - 1);
    },


    firstTurn: function(offense){
        Game.turn = 1;
//        $('polygon').attr('class','unSelected');
        Game.whoStarted = offense;
        Offense.runOffense(offense)

    },


    runTurn: function(offense){
        Game.turn += 1;
        Game.defense = Game.offense;
        Game.offense = Math.abs(Offense.offense - 1);

        $('.hexPolygon').css('fill','black');
        $('.hexPolygon').css('stroke','white');
        $('.hexSVG').css('overflow','hidden');
        $('.hexSVG').css('z-index','2');

        $('[data-team=1]').parent().children('svg').children('polygon').css('stroke','blue');

        $('[data-team=1]').parent().children('svg').css('overflow','overlay');
        $('[data-team=1]').parent().children('svg').css('z-index','3');
        $('[data-team=0]').parent().children('svg').css('overflow','overlay');
        $('[data-team=0]').parent().children('svg').css('z-index','3');

        $('[data-team=0]').parent().children('svg').children('polygon').css('stroke','red');

        GameStatus.saveGameStatus();
        Rotator.createAndRotateOn('turn','Turn '+Game.turn);

        setTimeout(function(){
            Rotator.rotateOff('.turn');
        },1300);

        Offense.runOffense(Game.offense);

        if ((Game.offense == 0)&&(Game.playingAI == true)){

            setTimeout(function(){
                var $unitBeingMoved = Offense.selectableUnits.random();
                $unitBeingMoved.click();
            },1500);

            setTimeout(function(){
                var $hexBeingMovedTo = Offense.moveRange.random();
                if (Offense.attackRange.length != 0){

                    $hexBeingMovedTo = Offense.attackRange.random();
                }
                $hexBeingMovedTo.click();
            },2500);

        }
    },

    oldGame: function(){

        var teamOneString = '2:grav1|20:grav1|9:19|8:21|19:22|10:37|11:52|6:55|16:57|13:59|7:61|17:63|14:70|15:75|1:76|5:78|18:82|4:83|12:87|3:91|';
        var teamTwoString = '2:grav0|20:21|19:22|18:23|17:24|16:25|15:26|14:27|13:28|12:29|11:30|10:31|9:32|8:33|7:34|6:35|5:36|4:37|3:38|1:40|';

        var teamOneArray = GameStatus.convertStringToArray(teamOneString);
        var teamTwoArray = GameStatus.convertStringToArray(teamTwoString);

        $.each(teamOneArray,function(i,e){
            Game.moveUnits(e, 1);
        });
        $.each(teamTwoArray, function(i,e){
            Game.moveUnits(e, 0);
        });

        Game.turn = 5;
        Game.runTurn(1);

        console.log(teamOneArray);
    },
    moveUnits: function(positionArray, team){
        var unit = $('[data-team='+team+'][data-index=' + positionArray[0] + ']');
        if (positionArray[1] == 'grav'+team){
            unit.attr('data-status', 'dead');
            unit.prependTo($('#'+positionArray[1]));
        }else{
            unit.attr('data-status', 'alive');
            unit.prependTo($('[data-hexIndex='+positionArray[1]+']'));
        }
    }
};