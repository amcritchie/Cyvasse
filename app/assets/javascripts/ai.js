
var AI = {

    killableEnemies: null,

    makeAMove: function () {

        AI.killableEnemies = [];
        var moveableUnits = Offense.selectableUnits.not($('[alt=mountain]').parent());

        var $unitBeingMoved = 'empty';
        var $hexBeingMovedTo = 'empty';

        Array.prototype.slice.call(moveableUnits).forEach(function (e) {
            AI.checkKillableEnemies(e.children[0]);
        });

        AI.killableEnemies.forEach(function(e){
            if (e[0] == 'rabble'){
                $unitBeingMoved = $('#'+e[3]);
                $hexBeingMovedTo = $('#'+e[1]);
            }
        });

        AI.killableEnemies.forEach(function(e){
            if (e[0] == 'light horse'){
                $unitBeingMoved = $('#'+e[3]);
                $hexBeingMovedTo = $('#'+e[1]);
            }
        });

        AI.killableEnemies.forEach(function(e){
            if (e[0] == 'spearman'){
                $unitBeingMoved = $('#'+e[3]);
                $hexBeingMovedTo = $('#'+e[1]);
            }
        });

        AI.killableEnemies.forEach(function(e){
            if (e[0] == 'crossbowman'){
                $unitBeingMoved = $('#'+e[3]);
                $hexBeingMovedTo = $('#'+e[1]);
            }
        });

        AI.killableEnemies.forEach(function(e){
            if (e[0] == 'heavy horse'){
                $unitBeingMoved = $('#'+e[3]);
                $hexBeingMovedTo = $('#'+e[1]);
            }
        });

        AI.killableEnemies.forEach(function(e){
            if (e[0] == 'elephant'){
                $unitBeingMoved = $('#'+e[3]);
                $hexBeingMovedTo = $('#'+e[1]);
            }
        });

        AI.killableEnemies.forEach(function(e){
            if (e[0] == 'trebuchet'){
                $unitBeingMoved = $('#'+e[3]);
                $hexBeingMovedTo = $('#'+e[1]);
            }
        });

        AI.killableEnemies.forEach(function(e){
            if (e[0] == 'catapult'){
                $unitBeingMoved = $('#'+e[3]);
                $hexBeingMovedTo = $('#'+e[1]);
            }
        });

        AI.killableEnemies.forEach(function(e){
            if (e[0] == 'dragon'){
                $unitBeingMoved = $('#'+e[3]);
                $hexBeingMovedTo = $('#'+e[1]);
            }
        });

        AI.killableEnemies.forEach(function(e){
            if (e[0] == 'king'){
                $unitBeingMoved = $('#'+e[3]);
                $hexBeingMovedTo = $('#'+e[1]);
            }
        });

        if ($unitBeingMoved == 'empty'){
            $unitBeingMoved = Offense.selectableUnits.not($('[alt=mountain]').parent()).random();
        }

        setTimeout(function () {
            $unitBeingMoved.click();

            if ($hexBeingMovedTo == 'empty'){
                $hexBeingMovedTo = Offense.moveRange.random();

                if (Offense.attackRange.length != 0) {
                    $hexBeingMovedTo = Offense.attackRange.random();
                }
            }


            setTimeout(function () {
                $hexBeingMovedTo.click();
            }, 1000);


        }, 1500);

    },

    checkKillableEnemies: function(unit){

        $('.hexDiv').attr('data-ring', 8);
        $('.hexDiv').attr('data-locked', false);
        $(unit).parent().attr('data-ring', 9);

        $('.hexDiv').attr('data-rangeRing', 8);
        $('.hexDiv').attr('data-rangeLocked', false);
        $(unit).parent().attr('data-rangeRing', 9);

        var potentialRange = PotentialRange.create($(unit), $(unit).attr('data-moverange')).parent().parent();
        Rings.createRings($(unit), potentialRange);

        if ($(unit).attr('data-rank') == 'range'){

            var potentialAttackRange = PotentialRange.create($(unit), $(unit).attr('data-attackrange')).parent().parent();
            RangeRings.createRings($(unit),potentialAttackRange); // <------ Not working.

            var attackRange = potentialAttackRange.filter(function () {
                return ($(this).attr('data-rangeRing') <= 89) && ($(this).attr('data-rangeRing') >= 80)
            });

        } else {

            var attackRange = potentialRange.filter(function () {
                return ($(this).attr('data-ring') <= 39) && ($(this).attr('data-ring') >= 30)
            });
        }

        var string = '';

        var array = [];

        Array.prototype.slice.call(attackRange).forEach(function (e) {

            AI.killableEnemies.push([e.children[0].getAttribute('alt'),e.getAttribute('id'),$(unit).attr('alt'),$(unit).parent().attr('id')]);
        });

        $allHexagons.attr('class', 'hexPolygon');

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
};
