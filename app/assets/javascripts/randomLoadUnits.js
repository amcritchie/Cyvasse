var RandomSetup = {

    team: null,
    teamSize: null,
    dockType: null,
    possibleSpots: null,

    loadPregameButton: function () {
        $(".extraSpace").prepend("<button class='loadEnemiesButton'>Load Enemies</button>");
        $(".extraSpace").prepend("<button class='enemyLineUpOne'>Lineup 1</button>");
        $('.enemyLineUpOne').on('click', function () {
            RandomSetup.placeLineOne()
        });
    },

    placeEnemies: function () {
        RandomSetup.dockType = 'enemy';
        var possibleSpots = [];
        for (var i = 1; i <= 40; i++) {
            possibleSpots.push('[data-hexIndex=' + i + ']')
        }
        RandomSetup.team = 0;
        RandomSetup.teamSize = $("[data-team=" + RandomSetup.team + "]").length;
        RandomSetup.possibleSpots = possibleSpots;
        RandomSetup.moveTeamToRandomSpots();
        $('.loadEnemiesButton').off('click');
        $('.loadEnemiesButton').on('click', function () {
            RandomSetup.placeEnemies()
        });
    },
    placeUnits: function () {
        RandomSetup.dockType = 'aux';
        var possibleSpots = [];
        RandomSetup.team = You.team;
        RandomSetup.teamSize = $("[data-team=" + RandomSetup.team + "]").length;
        if (($(".auxSpace").children().length == 0)) {
            for (var i = 52; i <= 91; i++) {
                possibleSpots.push('[data-hexIndex=' + i + ']')
            }
            RandomSetup.possibleSpots = possibleSpots;
            RandomSetup.moveTeamToRandomSpots();
        }else{
            var possiblePlaces = $('[data-ring=1][data-occupied=false]');
            var movingUnits = $('[data-status=unplaced][data-team='+You.team+']');
            $.each(possiblePlaces, function(index,hex){
                possibleSpots.push('[data-hexIndex=' + $(hex).attr('data-hexIndex') + ']')
            });
            RandomSetup.possibleSpots = possibleSpots;
            RandomSetup.moveUnitsToSpotsRandomly(movingUnits,possibleSpots);
        }

        $('.randomSetUpButton').off('click');
        $('.randomSetUpButton').on('click', function () {
            RandomSetup.placeUnits()
        });
    },
    placeLineOne: function () {
        RandomSetup.dockType = 'enemy';
        var possibleSpots = [];
        for (var i = 21; i <= 40; i++) {
            possibleSpots.push('[data-hexIndex=' + i + ']')
        }
        RandomSetup.team = 0;
        RandomSetup.teamSize = $("[data-team=" + RandomSetup.team + "]").length;
        RandomSetup.possibleSpots = possibleSpots;
        RandomSetup.moveTeamToOrderSpots();
        $('.loadEnemiesButton').off('click');
        $('.loadEnemiesButton').on('click', function () {
            RandomSetup.placeEnemies()
        });
    },
    moveUnitsToSpotsRandomly: function(units,spots){
        $.each(units, function(index, unit){

            var shuffledArray = shuffle(spots);
            var newLocation = shuffledArray.pop();
            spots = shuffledArray;
            var movingUnit = $(unit);
            var oldLocation = movingUnit.parent();

            RandomSetup.moveImageToMap(movingUnit);
            RandomSetup.moveUnitToNewPosition(newLocation, oldLocation, movingUnit)
        });
        PreGame.readyForStartButton();
        PreGame.loadPreGameTurn();
    },

    moveTeamToRandomSpots: function () {
        $('.hexDiv').attr('data-occupied', false);
        for (var i = 0; i < RandomSetup.teamSize; i++) {
            var shuffledArray = shuffle(RandomSetup.possibleSpots);
            var newLocation = shuffledArray.pop();
            RandomSetup.possibleSpots = shuffledArray;
            var movingUnit = $("[data-index=" + (parseInt(i) + 1) + "][data-team=" + RandomSetup.team + "]");
            var oldLocation = movingUnit.parent();

            RandomSetup.moveImageToMap(movingUnit);
            RandomSetup.moveUnitToNewPosition(newLocation, oldLocation, movingUnit)
        }
        PreGame.readyForStartButton();
        PreGame.loadPreGameTurn();
    },
    moveTeamToOrderSpots: function () {
        for (var i = 0; i < 20; i++) {
            var newLocation = RandomSetup.possibleSpots.pop();
            var movingUnit = $("[data-index=" + (parseInt(i) + 1) + "][data-team=" + RandomSetup.team + "]");
            var oldLocation = movingUnit.parent();

            RandomSetup.moveImageToMap(movingUnit);
            RandomSetup.moveUnitToNewPosition(newLocation, oldLocation, movingUnit)
        }
        PreGame.readyForStartButton();
        PreGame.loadPreGameTurn();
    },
    moveUnitToNewPosition: function (newLocation, oldLocation, movingUnit) {
        var movingTo = $(newLocation);
        var movingFrom = $(oldLocation);
        movingUnit.prependTo(movingTo);
        movingTo.attr('data-occupied', true);
    },
    moveImageToMap: function (unit) {
        if (unit.attr('data-status') == 'unplaced') {
            $("#" + RandomSetup.dockType + unit.attr('data-index') + " ").remove();
            unit.prependTo(".map");
            unit.attr('data-status', 'alive');
        }
    },
    placeComputerLineUp: function(){
        var rightReserve = "2:40|9:39|6:38|12:37|4:36|5:35|7:34|10:33|11:32|1:31|3:27|14:26|15:25|13:24|8:23|16:12|18:8|19:7|17:1|";
        var leftReserve = "12:39|2:38|9:37|6:36|7:35|8:34|10:33|11:32|4:28|14:26|5:25|13:24|15:23|3:22|1:19|18:13|19:12|16:8|17:6|";
        var westWatch = "18:40|19:39|7:38|6:37|4:36|11:33|9:32|10:31|13:30|12:29|14:28|15:27|5:26|17:21|3:19|2:18|8:17|1:12|16:10|";
        var behindRange = "10:39|6:38|8:37|18:36|19:35|5:34|12:33|9:32|1:29|15:28|4:27|17:26|7:25|14:24|2:23|13:18|11:15|3:10|16:7|";
        var arrays = [rightReserve,leftReserve,westWatch,behindRange];
        PlaceUnits.byArray(GameStatus.convertStringToArray(shuffle(arrays).pop()).reverse(),0)
    }
};