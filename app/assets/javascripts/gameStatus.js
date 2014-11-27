
var GameStatus = {

    saveGameStatus: function(){
        var teamOne = GameStatus.saveTeam(1);
        var teamZero = GameStatus.saveTeam(0);

        var teamOneString = GameStatus.convertArrayToString(teamOne);
        var teamZeroString = GameStatus.convertArrayToString(teamZero);

        $.ajax({
            type: 'put',
            url: '/update_match_info',
            data: {
                turn: Game.turn,
                match_id: Game.matchID,
                home_units: teamOneString,
                away_units: teamZeroString
            },
            dataType: 'json'
        });

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
            if ($(unit).attr('data-status') == 'alive'){
                array.push([$(unit).attr('data-index'), $(unit).parent().attr('data-hexIndex')]);
            } else {
                array.push([$(unit).attr('data-index'),'g'+team])
            }
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