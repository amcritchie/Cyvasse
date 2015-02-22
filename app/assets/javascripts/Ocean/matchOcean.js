var MatchOcean = {

    interval: null,

    shell: function (route, callback) {
        clearInterval(MatchOcean.interval);
        MatchOcean.interval = setInterval(function () {
            $.when(MatchOcean.ajax(route)).done(callback);
        }, 1500);
    },

    message: function (className, message) {
        Rotator.createAndRotateOn(className, message);
        setTimeout(function () {
            Rotator.rotateOff('.' + className);
        }, 1300);
    },

    opponentAccepted: function () {
        MatchOcean.shell('/match_status', function (res) {
            if (res) {
                MatchOcean.message('gameUpdate', 'Game Accepted');
                clearInterval(MatchOcean.interval);
                MatchOcean.opponentReady();
            }
        });
    },

    opponentReady: function () {
        var route = (Opponent.team === 0) ? '/match_away_ready' : '/match_home_ready';
        MatchOcean.shell(route, function (res) {
            if (res) {
                MatchOcean.message('gameUpdate2', 'Opponent Ready');
                clearInterval(MatchOcean.interval);
                MatchOcean.startGameData();
            }
        });
    },

    startGameData: function () {
        var route = (Opponent.team === 0) ? '/match_away_units_pos' : '/match_home_units_pos';
        $.when(MatchOcean.ajax(route)).done(function (res) {
            Opponent.ready = 'true';
            Opponent.unitsPos = res.data;
            if (You.ready == true) {
                Game.startGame()
            }
            MatchOcean.listenForUpdate();
        });
    },
    updateMatchData: function (res) {
        MatchData.homeUnitsString = res.home_units;
        MatchData.awayUnitsString = res.away_units;
        MatchData.whoStarted = res.who_started;
        Game.turn = res.turn;

        Game.lastMove = res.last_move;
        Game.utilMove = res.utility_saved_hex;

        AwayTeamNormalize.placeUnits(GameStatus.convertStringToArray(MatchData.homeUnitsString), 1);
        AwayTeamNormalize.placeUnits(GameStatus.convertStringToArray(MatchData.awayUnitsString), 0);
        AwayTeamNormalize.placeLastMove();
    },

    listenForUpdate: function () {
        MatchOcean.shell('/check_turn', function (res) {
            if (res.turn === (Game.turn + 1)) {
                clearInterval(MatchOcean.interval);
                MatchOcean.updateMatchData(res);
                HexHover.setHover();
                Game.setGameOffense();

            } else if (res.match_status == 'finished') {
                Rotator.createAndRotateOn('gameUpdate4', 'Your have been defeated');
                clearInterval(MatchOcean.interval);
                MatchOcean.updateMatchData(res);
                Game.hexVisualUpdate();
            }
        });
    },

    ajax: function (route) {
        var deferred = $.Deferred();
        $.ajax({
            type: 'put',
            url: route,
            data: {
                match_id: MatchData.matchID
            },
            success: function (response) {
                deferred.resolve(response);
            },
            error: function (response) {
                deferred.reject(response);
            }
        });
        return deferred;
    }
};