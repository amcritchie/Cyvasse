var LoadingFactory = {

    loadMapUnitsAndEnemiesHTML: function () {
        var map = { map: Map.createMap() };
        var templateMap = JST['views/map'];
        var result = templateMap(map);

        var hash = { units: CreateUnits.createAllUnits(1)};
        var templateUnits = JST['views/units'];
        var units = templateUnits(hash);

        var enemyHash = { enemies: CreateUnits.createAllUnits(0) };
        var templateEnemies = JST['views/enemies'];
        var enemies = templateEnemies(enemyHash);

        LoadingFactory.loadPartsOfMatchHTML();
        LoadingFactory.moveSVGsToPosition(result, units, enemies);
    },

    loadPartsOfMatchHTML: function () {
        $('.match').append('<div class="map"></div>');
        LoadingFactory.prependThingToMap($(".map"));
    },
    prependThingToMap: function (map) {
        map.prepend("<article class='auxSpace rotating'></article>");
        map.prepend("<article class=enemyBay></article>");
        map.prepend("<article class=graveyard id=grav1></article>");
        map.prepend("<article class=graveyard id=grav0></article>");
        map.prepend("<article class=board></article>");
    },
    moveSVGsToPosition: function (map, units, enemies) {
        $(".board").prepend(map);
        $(".auxSpace").prepend(units);
        $(".enemyBay").prepend(enemies);
    }
};