var Game = {
    turn: null,
    status: null,
    whosTurn: null,

    offense: null,
    defense: null,

    playingAI: false,
    playingAsAI: false,

    lastMove: [0, 0],

    enterStartingGame: function () {
        Game.turn = 1;
        Game.opponentOpeningArray();


    },

    initStartGame: function () {
        var deferred = $.Deferred();

        Game.turn = 1;
        Game.opponentOpeningArray();
        if ((MatchData.fastGame) && (You.team === 0)) {
            var interval;
            interval = setInterval(function () {
                $.ajax({
                    type: 'put',
                    url: '/who_goes_first',
                    data: {
                        match_id: MatchData.matchID
                    },
                    success: function (response) {
                        if ((response.data == 0) || (response.data == 1)) {
                            clearInterval(interval);
                            Game.offense = response.data;
                            deferred.resolve();
                        }
                    },
                    error: function (response) {
                        console.log('initStartGame - ajax error');
                        deferred.reject(response);
                    }
//            dataType: 'json'
                });
            }, 500);
        } else {
            Game.whoGoesFirst();
            $.ajax({
                type: 'put',
                url: '/start_game',
                data: {match_id: MatchData.matchID, who_started: Game.offense},
                dataType: 'json'
            });
            deferred.resolve();
        }
        return deferred;
    },

    startGame: function () {

        $.when(Game.initStartGame()).done(function (res) {

            Rotator.rotateOff('.pleaseWait');

            GameStatus.saveGameStatus();
            Game.updateOpponentsObjects();
            HexHover.setHover();

            if (Game.offense == You.team) {
                Rotator.createAndRotateOn('whoGoesFirst', 'You have the first move.');
            } else {
                Rotator.createAndRotateOn('whoGoesFirst', 'Opponent has the first move.');
            }
            setTimeout(function () {
                Rotator.rotateOff('.whoGoesFirst');
            }, 1800);

            if (MatchData.firstGame === 'true') {
                $('.tutorial').remove();
                Tutorial.firstTurn();
                setTimeout(function () {
                    Game.runTurn(Game.offense)
                }, 2000);
            } else {
                Game.runTurn(Game.offense)
            }
        });

    },

    opponentOpeningArray: function () {
        AwayTeamNormalize.placeUnits(GameStatus.convertStringToArray(Opponent.unitsPos).reverse(), Opponent.team);
    },

    whoGoesFirst: function () {

        var $team0King = $('[alt=king][data-team="0"]');
        var $team1King = $('[alt=king][data-team="1"]');

        var team0distance = (Math.abs(6 - $team0King.parent().data('ypos')));
        var team1distance = (Math.abs(6 - $team1King.parent().data('ypos')));

        if (team0distance > team1distance) {
            Game.offense = 1;
        } else if (team0distance < team1distance) {
            Game.offense = 0;
        } else {
            Game.offense = (Math.floor(Math.random() * 2))
        }
    },

    firstTurn: function (offense) {
        Game.turn = 1;
        MatchData.whoStarted = offense;
        Offense.runOffense(offense)
    },

    runTurn: function (offense) {
        clearInterval(Animation.function);
        var turnString = (Game.offense == You.team) ? 'Your move' : 'Opponents Move';
        Rotator.createAndRotateOn('turn', 'Turn ' + Game.turn + ' - ' + turnString);
        setTimeout(function () {
            Rotator.rotateOff('.turn');
        }, 1800);
        Validates.updateUnitCount();
        Game.hexVisualUpdate();
        Offense.runOffense(Game.offense);

        if (Game.offense == You.team) {
            clearInterval(MatchOcean.interval);
        } else {
            MatchOcean.listenForUpdate()
        }
        AI.shouldAIMove();
    },

    hexVisualUpdate: function () {
        $('.hexPolygon').css('fill', 'black');
        $('.hexPolygon').css('stroke', 'white');
        $('.hexSVG').css('overflow', 'overlay');
        $('.hexSVG').css('z-index', '2');
        $('.hexDiv').removeClass('hexHover');
        $('[data-hexIndex=' + Game.lastMove[1] + ']').children('svg').children('polygon').css('fill', 'orange');
        $('[data-hexIndex=' + Game.lastMove[0] + ']').children('svg').children('polygon').css('fill', 'orange');
        $('[data-hexIndex=' + Game.utilMove + ']').children('svg').children('polygon').css('fill', 'orange');
    },

    placeTeam: function (team, string) {
        var teamArray = GameStatus.convertStringToArray(string);
        $.each(teamArray, function (i, e) {
            Game.moveUnits(e, team);
        });
    },

    oldGame: function () {
        AwayTeamNormalize.placeUnits(GameStatus.convertStringToArray(MatchData.homeUnitsString), 1);
        AwayTeamNormalize.placeUnits(GameStatus.convertStringToArray(MatchData.awayUnitsString), 0);
        AwayTeamNormalize.placeLastMove();
        HexHover.setHover();
        Game.setGameOffense();
//        if (MatchData.whoStarted == 1) {
//            Game.offense = Game.turn % 2
//        } else {
//            Game.offense = Math.abs((Game.turn % 2) - 1)
//        }
//        if (Game.turn === 0) {
//            Game.startGame()
//        } else {
//            Game.runTurn();
//        }
    },

    setGameOffense: function() {
        if (MatchData.whoStarted == 1) {
            Game.offense = Game.turn % 2
        } else {
            Game.offense = Math.abs((Game.turn % 2) - 1)
        }
        if (Game.turn === 0) {
            Game.startGame()
        } else {
            Game.runTurn();
        }
    },

    finishedGame: function () {
        AwayTeamNormalize.placeUnits(GameStatus.convertStringToArray(MatchData.homeUnitsString), 1);
        AwayTeamNormalize.placeUnits(GameStatus.convertStringToArray(MatchData.awayUnitsString), 0);
        HexHover.setHover();

        if (Game.whosTurn == You.team) {
            Rotator.createAndRotateOn('over', 'You win, at turn ' + Game.turn + '.');
        } else {
            Rotator.createAndRotateOn('over', 'You were defeated, at turn ' + Game.turn + '.');
        }
    },

    moveUnits: function (positionArray, team) {
        var unit = $('[data-team=' + team + '][data-index=' + positionArray[0] + ']');
        if (positionArray[1] == 'g' + team) {
            unit.attr('data-status', 'dead');
            unit.appendTo($('#' + positionArray[1]));
        } else if (positionArray[1] == 'lDock') {
            unit.attr('data-status', 'unplaced');
            unit.prependTo($('#' + positionArray[1]));
        } else {
            unit.attr('data-status', 'alive');
            unit.prependTo($('[data-hexIndex=' + positionArray[1] + ']'));
            $('[data-hexIndex=' + positionArray[1] + ']').attr('data-occupied', 'true')
        }
    },

    finishTurn: function () {
        Game.turn += 1;
        Game.lastMove = [Offense.oldLocation.attr('data-hexIndex'), Offense.newLocation.attr('data-hexIndex')];
        Game.defense = Game.offense;
        Game.offense = Math.abs(Game.offense - 1);
        GameStatus.saveGameStatus();
        if (!!Offense.utility) {
            if (You.team == 0) {
                Offense.utility = 92 - Offense.utility;
            }
            $.ajax({
                type: 'put',
                url: '/cavalry_first_jump',
                data: {match_id: MatchData.matchID, cavalry_first_jump: Offense.utility},
                dataType: 'json'
            });
        }
        NotificationOcean.removeNotification(MatchData.matchID);
        Game.updateOpponentsObjects();
        if (Tutorial.step == 7) {
            $('.tutorial').remove();
            Tutorial.secondTurn();
            Game.runTurn();
        } else if (Tutorial.step == 9) {
            $('.tutorial').remove();
            Tutorial.goodLuck();
            Game.runTurn();
            setTimeout(function () {
                $('.tutorial').remove();
                Tutorial.checkOutRoot();
            }, 3000);
        } else {
            Game.runTurn();
        }
    },

    updateOpponentsObjects: function () {
        if (You.team == 0) {
            You.unitsPos = GameStatus.convertArrayToString(GameStatus.teamZeroArray);
            Opponent.unitsPos = GameStatus.convertArrayToString(GameStatus.teamOneArray);
        } else {
            You.unitsPos = GameStatus.convertArrayToString(GameStatus.teamOneArray);
            Opponent.unitsPos = GameStatus.convertArrayToString(GameStatus.teamZeroArray);
        }
    },

    over: function () {
        $.when(GameStatus.saveGameStatusss()).done(function (categories) {
            var stop = new Date();
            var teamNum = Game.offense;
            if (teamNum == You.team) {
                Rotator.createAndRotateOn('over', 'You win, at turn ' + Game.turn + '.');
            } else {
                Rotator.createAndRotateOn('over', 'You were defeated, at turn ' + Game.turn + '.');
            }
            $.ajax({
                type: 'put',
                url: '/finish_game',
                data: {match_id: MatchData.matchID, winner: Game.offense},
                dataType: 'json'
            });
        });

//            GameStatus.saveGameStatusss();

    }
};