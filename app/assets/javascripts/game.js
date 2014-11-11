
var Game = {

    turn: null,
    whoStarted: null,

    offense: null,
    defense: null,

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
        $('polygon').attr('class','unSelected');
        Game.whoStarted = offense;
        Offense.runOffense(offense)

    },


    runTurn: function(offense){
        Game.turn += 1;
        Game.defense = Game.offense;
        Game.offense = Math.abs(Offense.offense - 1);
        $('polygon').attr('class','unSelected');
        GameStatus.saveGameStatus();
        Offense.runOffense(Game.offense)
    },



    oldGame: function(){
        var teamOneString = '2:grav1|20:grav1|9:hex19|8:hex21|19:hex22|10:hex37|11:hex52|6:hex55|16:hex57|13:hex59|7:hex61|17:hex63|14:hex70|15:hex75|1:hex76|5:hex78|18:hex82|4:hex83|12:hex87|3:hex91|';
        var teamTwoString = '2:grav0|20:hex21|19:hex22|18:hex23|17:hex24|16:hex25|15:hex26|14:hex27|13:hex28|12:hex29|11:hex30|10:hex31|9:hex32|8:hex33|7:hex34|6:hex35|5:hex36|4:hex37|3:hex38|1:hex40|';

        var teamOneArray = GameStatus.convertStringToArray(teamOneString);
        var teamTwoArray = GameStatus.convertStringToArray(teamTwoString);

        $.each(teamOneArray,function(i,e){
            Game.moveUnits(e, 1);
        });

        $.each(teamTwoArray, function(i,e){
            Game.moveUnits(e, 0);
        });

        console.log(teamOneArray);
    },
    moveUnits: function(positionArray, team){
        var unit = $('[data-team='+team+'][data-index=' + positionArray[0] + ']');
        unit.prependTo($('#'+positionArray[1]));
        if (positionArray[1] == 'grav'+team){
            unit.attr('data-status', 'dead')
        }else{
            unit.attr('data-status', 'alive')
        }
    }
};