var Validates = {

    king: {attack: 2, defence: 2, moveRange: 2, attackRange: 0, trump: 'none'},
    rabble: {attack: 1, defence: 1, moveRange: 3, attackRange: 0, trump: 'none'},
    dragon: {attack: 5, defence: 5, moveRange: 10, attackRange: 0, trump: 'none'},
    mountain: {attack: 9, defence: 9, moveRange: 0, attackRange: 0, trump: 'none'},
    elephant: {attack: 4, defence: 4, moveRange: 3, attackRange: 0, trump: 'none'},
    catapult: {attack: 4, defence: 1, moveRange: 2, attackRange: 3, trump: 'none'},
    lighthorse: {attack: 2, defence: 2, moveRange: 3, attackRange: 0, trump: 'none'},
    heavyhorse: {attack: 3, defence: 3, moveRange: 2, attackRange: 0, trump: 'none'},
    trebuchet: {attack: 1, defence: 1, moveRange: 1, attackRange: 3, trump: 'dragon'},
    crossbowman: {attack: 2, defence: 1, moveRange: 1, attackRange: 2, trump: 'none'},
    spearman: {attack: 2, defence: 2, moveRange: 2, attackRange: 0, trump: 'lighthorse,heavyhorse'},

    teamZeroCount: null,
    teamOneCount: null,

    unitStats: function (unit) {
        var unitClass = unit.children('img').attr('data-codename');
        var unitStats = {
            attack: parseInt(unit.children('img').attr('data-attack')),
            defence:  parseInt(unit.children('img').attr('data-defence')),
            moveRange:  parseInt(unit.children('img').attr('data-moverange')),
            attackRange:  parseInt(unit.children('img').attr('data-attackrange')),
            trump:  unit.children('img').attr('data-trump')
        };
        return JSON.stringify(Validates[unitClass]) === JSON.stringify(unitStats);
    },
    combat: function (attacker, defender) {
        if (attacker.children('img').attr('data-team') == defender.children('img').attr('data-team')) {
            return false
        } else {
            return !!(Validates.unitStats(attacker) && Validates.unitStats(defender));
        }
    },
    updateUnitCount: function () {
        var hexDivs = $('.hexDiv');
        Validates.teamOneCount = hexDivs.children('img.unit1').length;
        Validates.teamZeroCount = hexDivs.children('img.unit0').length;
    },
    validateMovement: function (mover) {
        console.log('boardInt - ' + Validates.boardIntact());
        console.log('unitStat - ' + Validates.unitStats(mover));
        console.log('mover - ' + mover);
//        console.log('unitStat - ' + Validates.unitStats(mover));

        return (
            Validates.boardIntact()
            && Validates.unitStats(mover)
            || Offense.jump == 2
            )
    },
    validateAttack: function (attacker, defender) {
        return (
            Validates.boardIntact()
            && Validates.combat(attacker, defender)
            || Offense.jump == 2
            )
    },
    boardIntact: function () {
        return (
            Validates.hexsIntact()
            && Validates.unitsExist()
            && Validates.unitsPosition()
            )
    },
    hexsIntact: function () {
        return(
            $('.hexDiv').length == 91
            && $('.hexSVG').length == 91
            && $('.hexPolygon').length == 91
            )
    },
    unitsExist: function () {
        var hexDivs = $('.hexDiv');
        return(
            Validates.teamZeroCount == hexDivs.children('img.unit0').length
            && Validates.teamOneCount == hexDivs.children('img.unit1').length
            )
    },
    unitsPosition: function () {
        GameStatus.setValidationString();
        if (You.team == 0) {
            return !!((You.unitsPos == GameStatus.teamZeroString) && (Opponent.unitsPos = GameStatus.teamOneString));
        } else {
            return !!((You.unitsPos == GameStatus.teamOneString) && (Opponent.unitsPos = GameStatus.teamZeroString));
        }
    },

    notPassed: function (code) {
        Rotator.createAndRotateOn('turn', 'Warning: Tampering with units, will result in a loss-' + code);
        setTimeout(function () {
            window.location.reload()
        }, 3000);
    }
};