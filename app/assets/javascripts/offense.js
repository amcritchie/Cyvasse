var Offense = {
    jump: 1,
    defense: null,
    selectableUnits: $('hex53'),
    newLocation: $('hex52'),
    oldLocation: $('hex52'),
    moveRange: $('hex52'),
    attackRange: $('hex54'),
    utility: false,

    runOffense: function (offense) {
        Offense.jump = 1;
        Offense.defense = Math.abs(offense - 1);
        Offense.selectableUnits = $('[data-status=alive][data-team=' + offense + ']').parent();
        Offense.registerClickUnit()
    },
    registerClickUnit: function () {
        if (Game.offense == You.team) {
            Offense.selectableUnits.on('click', function () {
                Tutorial.stepEight();
                Offense.validatesClickedUnit($(this));
            })
        }
    },
    validatesClickedUnit: function (unit) {
        if (Validates.unitStats(unit)) {
            Offense.utility = false;
            Game.utilMove = false;
            Offense.selectUnit(unit);
        } else {
            Validates.notPassed();
        }
    },
    selectUnit: function (unit) {
        Offense.refreshHexVisual();
        SelectedUnit.update(unit.children('img'));
        InfoBox.update(unit.children('img'));
        Offense.registerMoveOrAttack();
    },
    refreshHexVisual: function () {
        clearInterval(Animation.function);
        $allHexPoly.css('fill', 'black');
        $allHexPoly.css('stroke', 'white');
        $allHexSVGs.css('overflow', 'overlay');
        $allHexSVGs.css('z-index', '2');
    },
    registerMoveOrAttack: function () {
        Range.update();
        if (Game.offense == You.team) {
            Offense.registerMovableHex();
            Offense.registerAttackUnit();
        }
    },
    registerMovableHex: function () {
        Offense.moveRange.on('click', function () {
            var validation = Validates.validateMovement(SelectedUnit.unit.parent());
            Offense.validatesAction($(this), validation);
        });
    },
    registerAttackUnit: function () {
        Offense.attackRange.on('click', function () {
            var validation = Validates.validateAttack(SelectedUnit.unit.parent(), $(this));
            Offense.validatesAction($(this), validation);
        });
    },
    validatesAction: function (unit, validation) {
        if (validation) {
            Offense.moveToAttack(unit);
        } else {
            Validates.notPassed();
        }
    },
    moveToAttack: function (hex) {
        Offense.newLocation = hex;
        Offense.oldLocation = SelectedUnit.unit.parent();
        if (hex.children('img').length == 0) {
            Offense.moveUnitToNewPosition();
        } else {
            Offense.captureEnemy(hex);
        }
        if ((SelectedUnit.rank == 'cavalry') && (Offense.jump == 1)) {

            Offense.utility = parseInt(Offense.oldLocation.attr('data-hexIndex'));
//            if (You.team == 0) {
//                Offense.utility = 92 - Offense.utility;
//                Game.utilMove = 92 - Game.utilMove;
//            }
            Game.utilMove = Offense.utility;
            Offense.turnOffClickHandlers();
            Offense.jump = 2;
            Validates.updateUnitCount();
            Offense.selectUnit(SelectedUnit.unit.parent());
        } else {
            Offense.finishTurn()
        }
    },
    moveUnitToNewPosition: function () {
        var movingTo = $(Offense.newLocation);
        var movingFrom = $(Offense.oldLocation);
        SelectedUnit.unit.prependTo(movingTo);
        movingTo.attr('data-occupied', true);
        movingFrom.attr('data-occupied', false);
    },
    captureEnemy: function (hex) {
        Death.unitKilled(hex.children("img"));
        if (SelectedUnit.range == 0) {
            Offense.moveUnitToNewPosition();
        }
    },
    turnOffClickHandlers: function () {
        $allHexPoly.css('fill', 'black');
        Offense.moveRange.off('click');
        Offense.attackRange.off('click');
        Offense.selectableUnits.off('click');
    },
    finishTurn: function () {
        $('.hideSelectedUnitInfo').css('visibility', 'hidden');
        Offense.turnOffClickHandlers();
        SelectedUnit.clear();
        if ($('[alt=king][data-status=dead]').length == 1) {
            Game.over();
        } else {
            Game.finishTurn();
        }
    }
};