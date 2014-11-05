
var Game = {

    turn: null,
    whoStarted: null,

    firstTurn: function(offense){

        Game.turn = 1;
        $('polygon').attr('class','unSelected');

        Game.whoStarted = offense;

        Offense.registerClickUnit(offense)

    },

    runTurn: function(offense){
        Game.turn += 1;
        $('polygon').attr('class','unSelected');

        GameStatus.saveGameStatus();
        Offense.registerClickUnit(offense)
    },

    oldGame: function(){
        var teamOneString = '2:graveyard1|20:graveyard1|9:hex19|8:hex21|19:hex22|10:hex37|11:hex52|6:hex55|16:hex57|13:hex59|7:hex61|17:hex63|14:hex70|15:hex75|1:hex76|5:hex78|18:hex82|4:hex83|12:hex87|3:hex91|';
        var teamTwoString = '2:graveyard0|20:hex21|19:hex22|18:hex23|17:hex24|16:hex25|15:hex26|14:hex27|13:hex28|12:hex29|11:hex30|10:hex31|9:hex32|8:hex33|7:hex34|6:hex35|5:hex36|4:hex37|3:hex38|1:hex40|';

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
        if (positionArray[1] == 'graveyard'+team){
            unit.attr('data-status', 'dead')
        }else{
            unit.attr('data-status', 'alive')
        }
    }
};

var GameStatus = {

    saveGameStatus: function(){
        var teamOne = GameStatus.saveTeam(1);
        var teamZero = GameStatus.saveTeam(0);

        var teamOneString = GameStatus.convertArrayToString(teamOne);
        var teamZeroString = GameStatus.convertArrayToString(teamZero);

        console.log('===================================');
        console.log('Turn : '+ Game.turn - 1);
        console.log('-----------------------------------');

        console.log('Team 1');
        console.log(teamOneString);
        console.log('-----------------------------------');

        console.log('Team 0');
        console.log(teamZeroString);

    },

    saveTeam: function(team){
        var array = [];
        $.each($('[data-team='+team+']'), function(index,unit){
            array.push([$(unit).attr('data-index'), $(unit).parent().attr('id')]);
        });
        return array;
    },
    convertArrayToString: function(array){
        var string = "";
        $.each(array,function(){
            string += $(this)[0] + ':' + $(this)[1] + '|';
        });
        return string;
    },
    convertStringToArray: function(string){
        var array = [];
        $.each(string.split('|'), function(i,e){
            array.push(e.split(':'));
        });
        array.pop();
        return array
    }

};