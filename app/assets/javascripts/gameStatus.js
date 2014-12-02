var GameStatus = {

    saveHomeUnitsPosition: function(){
        var teamArray = GameStatus.saveTeam(1);
        if (You.team == 0) {
            teamArray = GameStatus.mirrorArray(teamArray);
        }
        var teamString = GameStatus.convertArrayToString(teamArray);
        $.ajax({
            type: 'put',
            url: '/update_home_units_position',
            data: {
                match_id: Game.matchID,
                home_units: teamString
            },
            dataType: 'json'
        });
    },

    saveAwayUnitsPosition: function(){
        var teamArray = GameStatus.saveTeam(0);
        if (You.team == 0) {
            teamArray = GameStatus.mirrorArray(teamArray);
        }
        var teamString = GameStatus.convertArrayToString(teamArray);
        $.ajax({
            type: 'put',
            url: '/update_away_units_position',
            data: {
                match_id: Game.matchID,
                away_units: teamString
            },
            dataType: 'json'
        });
    },

    saveGameStatus: function () {
        var teamOneArray = GameStatus.saveTeam(1);
        var teamZeroArray = GameStatus.saveTeam(0);

        if (You.team == 0) {
            teamOneArray = GameStatus.mirrorArray(teamOneArray);
            teamZeroArray = GameStatus.mirrorArray(teamZeroArray);
        }

        var teamOneString = GameStatus.convertArrayToString(teamOneArray);
        var teamZeroString = GameStatus.convertArrayToString(teamZeroArray);

        $.ajax({
            type: 'put',
            url: '/update_match_info',
            data: {
                turn: Game.turn,
                whos_turn: Game.offense,
                match_id: Game.matchID,
                home_units: teamOneString,
                away_units: teamZeroString
            },
            dataType: 'json'
        });
    },

    saveTeam: function (team) {
        var array = [];
        $.each($('[data-team=' + team + ']'), function (index, unit) {
            if ($(unit).attr('data-status') == 'alive') {
                array.push([$(unit).attr('data-index'), $(unit).parent().attr('data-hexIndex')]);
            } else if (You.ready == 'true') {
                array.push([$(unit).attr('data-index'), 'g' + team])
            } else {
                array.push([$(unit).attr('data-index'), 'lDock'])
            }
        });
        return array;
    },
    mirrorArray: function(array){
        var flippedArray = [];
        $.each(array, function (i, e) {
            var location = e[1];
            if ($.isNumeric(location)) {
                location = 92 - parseInt(e[1])
            }
            flippedArray.push([e[0], location]);
        });
        return flippedArray;
    },
    convertArrayToString: function (array) {
        var string = "";
        $.each(array, function () {
            string += $(this)[0] + ':' + $(this)[1] + '|';
        });
        return string;
    },
    convertStringToArray: function (string) {
        var array = [];
        $.each(string.split('|'), function (i, e) {
            array.push(e.split(':'));
        });
        array.pop();
        return array
    }
};