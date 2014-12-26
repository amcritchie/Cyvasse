var Range = {
    potentialMoveRange: null,
    potentialProjectileRange: null,
    update: function () {
        Range.initialize();
        Range.setPotentialRanges();
        if ((SelectedUnit.unit.attr('data-rank') == 'cavalry')&&(Offense.jump == 1)){
            CavalryMoveRings.createRings(SelectedUnit.unit, PotentialRange.create(SelectedUnit.unit, 2*SelectedUnit.moveRange).parent().parent());
            $allHexDivs.attr('data-locked', false);
        }
        MoveRings.createRings(SelectedUnit.unit, Range.potentialMoveRange);
        Range.updateMovementRange(Range.potentialMoveRange);
        if (SelectedUnit.unit.attr('data-rank') != 'range') {
            Range.updateMeleeRange();
        } else {
            RangeRings.createRings(SelectedUnit.unit, Range.potentialProjectileRange); // <------ Not working.
            Range.updateProjectileRange();
        }
        $allHexPoly.attr('class', 'hexPolygon');
        Animation.runAnimation();
    },
    initialize: function () {
        $allHexDivs.attr('data-ring', 8);
        $allHexDivs.attr('data-locked', false);
        SelectedUnit.unit.parent().attr('data-ring', 9);

        $allHexDivs.attr('data-rangeRing', 8);
        $allHexDivs.attr('data-rangeLocked', false);
        SelectedUnit.unit.parent().attr('data-rangeRing', 9);
    },
    setPotentialRanges: function () {
        Range.potentialMoveRange = PotentialRange.create(SelectedUnit.unit, SelectedUnit.moveRange).parent().parent();
        if (SelectedUnit.unit.data('rank') == 'range') {
            Range.potentialProjectileRange = PotentialRange.create(SelectedUnit.unit, SelectedUnit.attackRange).parent().parent();
        }
    },
    updateMovementRange: function (range) {
        Offense.moveRange.off('click');
        Offense.moveRange = range.filter(function () {
            return ($(this).attr('data-ring') <= 19) && ($(this).attr('data-ring') >= 10)
        });
    },
    updateMeleeRange: function (range) {
        Offense.attackRange.off('click');
        Offense.attackRange = $(Range.potentialMoveRange).filter(function () {
            return ($(this).attr('data-ring') <= 49) && ($(this).attr('data-ring') >= 30)
        });
    },
    updateProjectileRange: function () {
        Offense.attackRange.off('click');
        Offense.attackRange = $(Range.potentialProjectileRange).filter(function () {
            return ($(this).attr('data-rangeRing') <= 29) && ($(this).attr('data-rangeRing') >= 20)
        });
    }
};