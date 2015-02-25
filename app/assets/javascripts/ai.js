var AI = {

    killableEnemies: null,

    unitBeingMoved: null,
    hexBeingMovedTo: null,

    selectRandom: function(list) {
        var randomElement = list[Math.floor((Math.random()*list.length )+1)];
        return $(randomElement)
    },

    shouldAIMove: function () {
        if ((Game.offense == 0) && (Game.playingAI == true)) {
            AI.makeAMove();
        }
        if ((Game.offense == 1) && (Game.playingAsAI == true)) {
            AI.makeAMove();
        }
    },

    makeAMove: function () {

        var moveableUnits = Offense.selectableUnits.not($('[alt=mountain]').parent());

        AI.findKillableEnemies(moveableUnits);

        if (AI.unitBeingMoved == 'empty') {
            AI.unitBeingMoved = AI.selectRandom(Offense.selectableUnits.not($('[alt=mountain]').parent()));
//            AI.unitBeingMoved = Offense.selectableUnits.not($('[alt=mountain]').parent()).random();
        }

        setTimeout(function () {

            Offense.utility = false;
            Game.utilMove = false;

            debugger;
            Offense.selectUnit(AI.unitBeingMoved);

            if (AI.hexBeingMovedTo == 'empty') {
                AI.hexBeingMovedTo = AI.selectRandom(Offense.moveRange);
//                AI.hexBeingMovedTo = Offense.moveRange[Math.floor((Math.random()* Offense.moveRange.length )+1)];

                if (Offense.attackRange.length != 0) {
                    AI.hexBeingMovedTo = AI.selectRandom(Offense.attackRange);
//                    AI.hexBeingMovedTo = Offense.attackRange[Math.floor((Math.random()* Offense.attackRange.length )+1)];
                }
            }

            setTimeout(function () {
                Offense.moveToAttack(AI.hexBeingMovedTo);
                if ((SelectedUnit.rank == 'cavalry')) {
                    setTimeout(function () {
                        AI.findKillableEnemies(SelectedUnit.unit.parent());
                        if (AI.hexBeingMovedTo == 'empty') {
                            AI.hexBeingMovedTo = Offense.moveRange[Math.floor((Math.random()* Offense.moveRange.length )+1)];
                            if (Offense.attackRange.length != 0) {
                                AI.hexBeingMovedTo = Offense.attackRange[Math.floor((Math.random()* Offense.attackRange.length )+1)];
                            }
                        }
                        Offense.moveToAttack($(AI.hexBeingMovedTo));
                    }, 1000);
                }

            }, 1000);

        }, 1500);
    },

    findKillableEnemies: function (moveableUnits) {
        AI.killableEnemies = [];
        AI.unitBeingMoved = 'empty';
        AI.hexBeingMovedTo = 'empty';
        Array.prototype.slice.call(moveableUnits).forEach(function (e) {
            AI.checkKillableEnemies(e.children[0]);
        });

        AI.SearchKillableEnemiesFor('rabble');
        AI.SearchKillableEnemiesFor('light horse');
        AI.SearchKillableEnemiesFor('spearman');
        AI.SearchKillableEnemiesFor('crossbowman');
        AI.SearchKillableEnemiesFor('heavy horse');
        AI.SearchKillableEnemiesFor('elephant');
        AI.SearchKillableEnemiesFor('trebuchet');
        AI.SearchKillableEnemiesFor('catapult');
        AI.SearchKillableEnemiesFor('dragon');
        AI.SearchKillableEnemiesFor('king');
    },

    checkKillableEnemies: function (unit) {


        $('.hexDiv').attr('data-ring', 8);
        $('.hexDiv').attr('data-locked', false);
        $(unit).parent().attr('data-ring', 9);

        $('.hexDiv').attr('data-rangeRing', 8);
        $('.hexDiv').attr('data-rangeLocked', false);
        $(unit).parent().attr('data-rangeRing', 9);

        var potentialRange = PotentialRange.create($(unit), $(unit).attr('data-moverange')).parent().parent();
        MoveRings.createRings($(unit), potentialRange);

        if ($(unit).attr('data-rank') == 'range') {

            var potentialAttackRange = PotentialRange.create($(unit), $(unit).attr('data-attackrange')).parent().parent();
            RangeRings.createRings($(unit), potentialAttackRange); // <------ Not working.

            var attackRange = potentialAttackRange.filter(function () {
                return ($(this).attr('data-rangeRing') <= 29) && ($(this).attr('data-rangeRing') >= 20)
            });

        } else {

            var attackRange = potentialRange.filter(function () {
                return ($(this).attr('data-ring') <= 49) && ($(this).attr('data-ring') >= 30)
            });
        }

        var string = '';

        var array = [];

        Array.prototype.slice.call(attackRange).forEach(function (e) {

            AI.killableEnemies.push([e.children[0].getAttribute('alt'), e.getAttribute('id'), $(unit).attr('alt'), $(unit).parent().attr('id')]);
        });

        $allHexPoly.attr('class', 'hexPolygon');

        var moveRange = potentialRange.filter(function () {
            return ($(this).attr('data-ring') <= 19) && ($(this).attr('data-ring') >= 10)
        });

        $('.hexDiv').attr('data-ring', 8);
        $('.hexDiv').attr('data-locked', false);

        $('.hexDiv').attr('data-rangeRing', 8);
        $('.hexDiv').attr('data-rangeLocked', false);

    },

    potentialRange: function () {
        var range = null;
        if (SelectedUnit.unit.data('rank') == 'range') {
            range = SelectedUnit.attackRange
        } else {
            range = SelectedUnit.moveRange
        }
        return PotentialRange.create(SelectedUnit.unit, SelectedUnit.xPos, SelectedUnit.yPos, range).parent().parent();
    },

    SearchKillableEnemiesFor: function (unitName) {
        AI.killableEnemies.forEach(function (e) {
            if (e[0] == unitName) {
                AI.unitBeingMoved = $('#' + e[3]);
                AI.hexBeingMovedTo = $('#' + e[1]);
            }
        });
    }
};
