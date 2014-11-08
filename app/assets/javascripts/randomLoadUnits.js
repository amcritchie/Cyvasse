
var RandomSetup = {

    team: null,
    dockType: null,
    possibleSpots: null,

    loadPregameButton: function() {
        $(".extraSpace").prepend("<button class='loadEnemiesButton'>Load Enemies</button>");
//        $(".extraSpace").prepend("<button class='randomSetUpButton'>Random Setup</button>");
        $(".extraSpace").prepend("<button class='enemyLineUpOne'>Lineup 1</button>");

//        $('.loadEnemiesButton').on('click', function () { RandomSetup.placeEnemies() });
//        $('.randomSetUpButton').on('click', function () { RandomSetup.placeUnits() });

        $('.enemyLineUpOne').on('click', function () {
            RandomSetup.placeLineOne()
        });
    },

    placeEnemies: function(){
        RandomSetup.dockType = 'enemy';
        var possibleSpots = [];
        for(var i=1;i<=40;i++){ possibleSpots.push('#hex'+i) }
        RandomSetup.team = 0;
        RandomSetup.possibleSpots = possibleSpots;
        RandomSetup.moveTeamToRandomSpots();
        $('.loadEnemiesButton').off('click');
        $('.loadEnemiesButton').on('click', function () { RandomSetup.placeEnemies() });
    },
    placeUnits: function(){
        RandomSetup.dockType = 'aux';
        var possibleSpots = [];
        for(var i=52;i<=91;i++){ possibleSpots.push('#hex'+i) }
        RandomSetup.team = 1;
        RandomSetup.possibleSpots = possibleSpots;
        RandomSetup.moveTeamToRandomSpots();
        $('.randomSetUpButton').off('click');
        $('.randomSetUpButton').on('click', function () { RandomSetup.placeUnits() });
    },
    placeLineOne: function(){
        RandomSetup.dockType = 'enemy';
        var possibleSpots = [];
        for(var i=21;i<=40;i++){ possibleSpots.push('#hex'+i) }
        RandomSetup.team = 0;
        RandomSetup.possibleSpots = possibleSpots;
        RandomSetup.moveTeamToOrderSpots();
        $('.loadEnemiesButton').off('click');
        $('.loadEnemiesButton').on('click', function () { RandomSetup.placeEnemies() });
    },
    moveTeamToRandomSpots: function(){
        for (var i = 0; i < 20; i++) {
            var shuffledArray = shuffle(RandomSetup.possibleSpots);
            var newLocation = shuffledArray.pop();
            RandomSetup.possibleSpots = shuffledArray;
            var movingUnit = $("[data-index=" + (parseInt(i) + 1) + "][data-team=" + RandomSetup.team + "]");
            var oldLocation = movingUnit.parent();

            RandomSetup.moveImageToMap(movingUnit);
            newMoveUnitToNewPosition(newLocation, oldLocation, movingUnit);
        }
        PreGame.addStartButton();
        PreGame.loadPreGameFunctions();
    },
    moveTeamToOrderSpots: function(){
        for (var i = 0; i < 20; i++) {
//            var shuffledArray = shuffle(RandomSetup.possibleSpots);
            var newLocation = RandomSetup.possibleSpots.pop();
//            RandomSetup.possibleSpots = shuffledArray;
            var movingUnit = $("[data-index=" + (parseInt(i) + 1) + "][data-team=" + RandomSetup.team + "]");
            var oldLocation = movingUnit.parent();

            RandomSetup.moveImageToMap(movingUnit);
            newMoveUnitToNewPosition(newLocation, oldLocation, movingUnit);
        }
        PreGame.addStartButton();
        PreGame.loadPreGameFunctions();
    },
    moveImageToMap: function(unit){
        if (unit.attr('data-status') == 'unplaced') {
            $("#"+ RandomSetup.dockType + unit.attr('data-index') + " ").remove();
            unit.prependTo(".map");
            unit.attr('data-status', 'alive');
        }
    }
};