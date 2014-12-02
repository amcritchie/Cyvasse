var LoadingFactory = {
    loadMapUnitsAndEnemiesHTML: function () {
        var templateMap = JST['LoadFactory/views/map'];
        var templateUnits = JST['LoadFactory/views/units'];
        var templateEnemies = JST['LoadFactory/views/enemies'];

        var mapHTML = templateMap({map: Map.createMap()});
        var unitsHTML = templateUnits({units: CreateUnits.createAllUnits(You.team)});
        var enemiesHTML = templateEnemies({enemies: CreateUnits.createAllUnits(Opponent.team)});

        LoadingFactory.loadPartsOfMatchHTML();
        LoadingFactory.moveSVGsToPosition(mapHTML, unitsHTML, enemiesHTML);
    },

    loadPartsOfMatchHTML: function () {
        $('#match').append('<div class="map"></div>');
        LoadingFactory.prependThingToMap($(".map"));
    },
    prependThingToMap: function (map) {
        map.prepend("<article class='auxSpace rotating' id='lDock'></article>");
        $('#metaInfo').prepend("<article class=enemyBay></article>");
        map.prepend("<article class=graveyard id=g1 data-hexIndex=g1><a>Team 1 Graveyard</a></article>");
        map.prepend("<article class=graveyard id=g0 data-hexIndex=g0><a>Team 0 Graveyard</a></article>");
        map.prepend("<article class=board></article>");
    },
    moveSVGsToPosition: function (map, units, enemies) {
        $(".board").prepend(map);
        $(".auxSpace").prepend(units);
        $(".enemyBay").prepend(enemies);
    }
};