var You = {
    id: null,
    team: null,
    ready: null,
    unitsPos: null,
    outlines: null,
    setAttributes: function (id, team, ready, unitsPos) {
        You.id = id;
        You.team = team;
        You.ready = ready;
        You.unitsPos = unitsPos;
        You.outlines = document.getElementById('togglePreference').innerHTML;
    }
};

var Opponent = {
    id: null,
    isA: null,
    team: null,
    ready: null,
    unitsPos: null,
    setAttributes: function (id, team, ready, unitsPos) {
        Opponent.id = id;
        Opponent.team = team;
        Opponent.ready = ready;
        Opponent.unitsPos = unitsPos;
        Opponent.isA = document.getElementById('matchAgainst').innerHTML;
    }
};