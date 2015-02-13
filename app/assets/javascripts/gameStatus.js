var GameStatus = {

    teamOneArray: null,
    teamZeroArray: null,
    teamOneString: null,
    teamZeroString: null,

    positionOfYourUnits: function () {
        var teamArray = GameStatus.saveTeam(You.team);
        if (You.team == 0) {
            teamArray = GameStatus.mirrorArray(teamArray);
        }
        return GameStatus.convertArrayToString(teamArray.sort());
    },

    southPositionOfYourUnits: function () {
        var teamArray = GameStatus.saveTeam(You.team);
        return GameStatus.convertArrayToString(teamArray.sort());
    },

    saveHomeUnitsPosition: function () {
        var teamArray = GameStatus.saveTeam(1);
        if (You.team == 0) {
            teamArray = GameStatus.mirrorArray(teamArray);
        }
        var teamString = GameStatus.convertArrayToString(teamArray);

        $.ajax({
            type: 'put',
            url: '/update_home_units_position',
            data: {
                match_id: MatchData.matchID,
                home_units: teamString
            },
            dataType: 'json'
        });
    },

    saveAwayUnitsPosition: function () {
        var teamArray = GameStatus.saveTeam(0);
        if (You.team == 0) {
            teamArray = GameStatus.mirrorArray(teamArray);
        }
        var teamString = GameStatus.convertArrayToString(teamArray);
        $.ajax({
            type: 'put',
            url: '/update_away_units_position',
            data: {
                match_id: MatchData.matchID,
                away_units: teamString
            },
            dataType: 'json'
        });
    },

    setStrings: function () {
        GameStatus.teamOneArray = GameStatus.saveTeam(1);
        GameStatus.teamZeroArray = GameStatus.saveTeam(0);

        if (You.team == 0) {
            GameStatus.teamOneArray = GameStatus.mirrorArray(GameStatus.teamOneArray.sort());
            GameStatus.teamZeroArray = GameStatus.mirrorArray(GameStatus.teamZeroArray.sort());
        }

        GameStatus.teamOneString = GameStatus.convertArrayToString(GameStatus.teamOneArray.sort());
        GameStatus.teamZeroString = GameStatus.convertArrayToString(GameStatus.teamZeroArray.sort());
    },

    setValidationString: function () {
        GameStatus.teamOneArray = GameStatus.saveTeam(1);
        GameStatus.teamZeroArray = GameStatus.saveTeam(0);

        console.log('======1====');
        console.log(GameStatus.teamOneArray.sort());
        console.log('==========');
        console.log('=========');
        console.log(GameStatus.teamZeroArray.sort());
        console.log('==========');

        if (You.team == 0) {
            GameStatus.teamOneArray = GameStatus.mirrorArray(GameStatus.teamOneArray).sort();
            GameStatus.teamZeroArray = GameStatus.mirrorArray(GameStatus.teamZeroArray).sort();
        }

//        if (Game.whoStarted == 1){
//            if (((1+Game.turn) % 2) == 0){
        GameStatus.teamOneString = GameStatus.convertArrayToString(GameStatus.teamOneArray.sort());
        GameStatus.teamZeroString = GameStatus.convertArrayToString(GameStatus.teamZeroArray.sort());
//            } else {
//                GameStatus.teamOneString = GameStatus.convertArrayToString(GameStatus.teamOneArray.sort());
//                GameStatus.teamZeroString = GameStatus.convertArrayToString(GameStatus.teamZeroArray.sort());
//            }
//        }

    },

    setLastMove: function () {
        var oldLocation = parseInt(Offense.oldLocation.attr('data-hexIndex'));
        var newLocation = parseInt(Offense.newLocation.attr('data-hexIndex'));
        if (You.team == 0) {
            oldLocation = 92 - oldLocation;
            newLocation = 92 - newLocation;
        }
        return oldLocation + ',' + newLocation
    },

    saveGameStatus: function () {
        GameStatus.setStrings();
        GameStatus.setLastMove();

        $.ajax({
            type: 'put',
            url: '/update_match_info',
            data: {
                turn: Game.turn,
                whos_turn: Game.offense,
                match_id: MatchData.matchID,
                home_units: GameStatus.teamOneString,
                away_units: GameStatus.teamZeroString,
                last_move: GameStatus.setLastMove()
            },
            dataType: 'json'
        });
    },

    saveTeam: function (team) {
        var array = [];
        $.each($('[data-team=' + team + ']'), function (index, unit) {
            if ($(unit).attr('data-status') == 'alive') {
                array.push([$(unit).attr('data-index'), $(unit).parent().attr('data-hexIndex')]);
            } else if ((You.ready == true) || (You.ready == 'true')) {
                array.push([$(unit).attr('data-index'), 'g' + team])
            } else {
                array.push([$(unit).attr('data-index'), 'lDock'])
            }
        });
        return array;
    },
    mirrorArray: function (array) {
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