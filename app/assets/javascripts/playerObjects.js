var You = {
    team: null,
    ready: null,
    unitsPos: null,
    outlines: null,
    setAttributes: function (team, ready, unitsPos) {
        You.team = team;
        You.ready = ready;
        You.unitsPos = unitsPos;
        You.outlines = document.getElementById('togglePreference').innerHTML;
    }
};

var Opponent = {
    isA: null,
    team: null,
    ready: null,
    unitsPos: null,
    setAttributes: function (team, ready, unitsPos) {
        Opponent.team = team;
        Opponent.ready = ready;
        Opponent.unitsPos = unitsPos;
        Opponent.isA = document.getElementById('matchAgainst').innerHTML;
    }
};