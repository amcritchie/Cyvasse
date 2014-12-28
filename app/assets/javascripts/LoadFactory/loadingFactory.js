var LoadingFactory = {
    loadMapUnitsAndEnemiesHTML: function () {
        $('#testP').prepend("<svg><polygon points='1,1 100,100 1,100' style='fill: red;'></polygon></svg>");
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
        if (You.team == 1){
            $('#youInfo').append("<p>Graveyard</p><div class=graveyard id=g1 data-hexIndex=g1></div>");
            $('#opponentInfo').append("<p>Graveyard</p><div class=graveyard id=g0 data-hexIndex=g0></div>");
        } else {
            $('#youInfo').append("<p>Graveyard</p><div class=graveyard id=g0 data-hexIndex=g0></div>");
            $('#opponentInfo').append("<p>Graveyard</p><div class=graveyard id=g1 data-hexIndex=g1></div>");
        }
        map.prepend("<article class=board></article>");
    },
    moveSVGsToPosition: function (map, units, enemies) {
        $(".board").prepend(map);
        $(".auxSpace").prepend(units);
        $(".enemyBay").prepend(enemies);
    }
};