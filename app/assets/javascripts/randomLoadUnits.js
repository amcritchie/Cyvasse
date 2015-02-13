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
                possibleSpots.push('[data-hexIndex=' + $(hex).attr('data-hexIndex') + ']');
            });
            RandomSetup.possibleSpots = possibleSpots;
            RandomSetup.moveUnitsToSpotsRandomly(movingUnits,possibleSpots);
        }

        $('.randomSetUpButton').off('click');
        $('.randomSetUpButton').on('click', function () {
            RandomSetup.placeUnits();
            PreGame.saveYourSide();

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
            console.log('how many')
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
        var qav1 = "11:39|6:38|4:37|19:36|18:35|8:34|10:33|7:32|9:31|5:28|12:27|13:26|15:25|3:24|1:19|17:18|14:17|2:16|16:10|";
        var qav2 = "10:38|9:37|6:36|11:35|7:34|8:33|1:32|3:26|15:25|2:24|18:18|19:17|5:16|16:15|12:10|13:9|4:8|17:3|14:2|";
        var qav3 = "11:38|6:37|7:35|10:34|2:33|9:27|8:26|5:25|19:24|18:23|4:22|14:17|1:16|12:15|15:14|3:9|13:8|17:7|16:1|";

        var tyr1 = "8:38|1:37|7:36|6:35|13:34|10:33|9:32|19:27|15:26|5:25|12:24|11:23|18:19|14:18|17:17|4:16|3:15|2:14|16:11|";
        var tyr2 = "6:38|9:37|11:36|7:35|4:34|18:33|19:32|5:31|8:27|10:26|3:25|15:24|13:23|12:22|16:17|1:16|14:15|17:14|2:8|";
        var tyr3 = "19:40|18:39|5:38|7:37|10:36|8:35|3:34|1:33|12:30|13:29|4:28|6:27|11:26|9:25|2:24|17:21|14:20|15:19|16:13|";

        var hal1 = "12:39|2:38|9:37|6:36|7:35|8:34|10:33|11:32|4:28|14:26|5:25|13:24|15:23|3:22|1:19|18:13|19:12|16:8|17:6|";
        var hal2 = "7:38|10:37|8:36|2:35|9:34|11:33|6:32|3:29|16:23|4:19|14:17|5:16|19:15|18:14|15:9|13:8|12:7|1:2|17:1|";
        var hal3 = "9:40|11:39|7:38|1:37|3:34|6:33|10:32|2:31|14:28|5:27|8:26|4:25|15:24|16:19|13:18|12:17|19:11|17:10|18:9|";

        var dor1 = "18:40|19:39|7:38|6:37|4:36|11:33|9:32|10:31|13:30|12:29|14:28|15:27|5:26|17:21|3:19|2:18|8:17|1:12|16:10|";
        var dor2 = "2:40|9:39|6:38|12:37|4:36|5:35|7:34|10:33|11:32|1:31|3:27|14:26|15:25|13:24|8:23|16:12|18:8|19:7|17:1|";
        var dor3 = "7:39|8:37|11:36|6:35|19:34|10:28|5:27|4:26|15:25|18:24|16:23|9:21|13:18|12:17|2:15|3:11|17:10|14:9|1:7|";

        var ben1 = "6:26|7:25|9:19|4:18|18:17|19:16|10:15|12:14|8:12|5:11|13:10|2:9|1:8|11:7|16:5|14:4|17:3|15:2|3:1|";
        var ben2 = "11:39|2:38|9:37|7:36|8:35|6:34|10:33|1:32|5:20|3:17|4:16|19:15|18:14|15:9|13:8|12:7|16:5|14:2|17:1|";
        var ben3 = "9:39|2:38|7:37|10:36|11:35|6:34|1:33|8:32|16:19|3:18|4:17|5:16|18:15|19:14|15:10|14:9|12:8|13:7|17:1|";

        var aeg1 = "9:39|6:37|8:36|7:35|4:34|19:33|18:32|5:31|10:27|3:26|15:25|1:24|12:23|13:22|11:18|2:17|16:16|14:15|17:14|";
        var aeg2 = "5:40|4:39|18:38|12:37|13:36|8:35|10:34|6:33|9:32|7:31|15:30|14:29|19:28|1:26|2:25|17:21|11:20|16:13|3:12|";
        var aeg3 = "1:40|7:39|12:38|9:37|11:36|6:35|10:34|8:33|16:32|13:31|4:28|19:27|15:26|14:25|18:24|5:23|2:22|17:17|3:16|";

        var arrays;
        if (MatchData.awayUserID == 2){
            arrays = [qav1,qav2,qav3];
        } else if (MatchData.awayUserID == 3){
            arrays = [tyr1,tyr2,tyr3];
        } else if (MatchData.awayUserID == 4){
            arrays = [hal1,hal2,hal3];
        } else if (MatchData.awayUserID == 5){
            arrays = [dor1,dor2,dor3];
        } else if (MatchData.awayUserID == 6){
            arrays = [ben1,ben2,ben3];
        } else if (MatchData.awayUserID == 7){
            arrays = [aeg1,aeg2,aeg3];
        }

        AwayTeamNormalize.placeUnits(GameStatus.convertStringToArray(shuffle(arrays).pop()).reverse(),0)
    }
};