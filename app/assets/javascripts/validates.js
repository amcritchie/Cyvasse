var Validates = {
    rabble: ['1', '1', '3', '0', 'none'],
    spearman: ['2', '2', '2', '0', 'lighthorse,heavyhorse'],
    elephant: ['4', '4', '3', '0', 'none'],
    lighthorse: ['2', '2', '5', '0', 'none'],
    heavyhorse: ['3', '3', '4', '0', 'none'],
    crossbowman: ['2', '1', '1', '2', 'none'],
    catapult: ['4', '1', '2', '3', 'none'],
    trebuchet: ['1', '1', '1', '3', 'dragon'],
    dragon: ['5', '5', '10', '0', 'none'],
    king: ['2', '2', '2', '0', 'none'],
    mountain: ['9', '9', '0', '0', 'none'],

    arrayEqual: function (a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    },

    unitStats: function (unit) {
        var unitClass = unit.children('img').attr('data-codename');
        var unitStats = [
            unit.children('img').attr('data-attack'),
            unit.children('img').attr('data-defence'),
            unit.children('img').attr('data-moverange'),
            unit.children('img').attr('data-attackrange'),
            unit.children('img').attr('data-trump')
        ];
        return !!Validates.arrayEqual(Validates[unitClass], unitStats);
    },

    combat: function (attacker, defender) {
        if (attacker.children('img').attr('data-team') == defender.children('img').attr('data-team')) {
            return false
        } else {
            return !!(Validates.unitStats(attacker) && Validates.unitStats(defender));
        }
    },

    unitsPosition: function () {
        GameStatus.setValidationString();
        if (You.team == 0) {
            return !!((You.unitsPos == GameStatus.teamZeroString) && (Opponent.unitsPos = GameStatus.teamOneString));
        } else {
            return !!((You.unitsPos == GameStatus.teamOneString) && (Opponent.unitsPos = GameStatus.teamZeroString));
        }
    }
};