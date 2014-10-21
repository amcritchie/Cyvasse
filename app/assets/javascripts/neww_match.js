var offense;
var defense;
var $player1name = "Alex";
var $player0name = "Tyrion";

//Units that can be hovered/clicked
var $moveableUnits;
var $enemyUnits;
var $enemyUnitsInRange;
//Selected Unit Global Variables
var $selectedUnit;
var $movingRange;
var $movingRangeView;
var $attackRange;
var $allHexagons;
var $initialRange;

//Initializing the Hexagon Selectors
var pregame_var;

//  Functions.
function pregame() {
    functionsForOffense();
    $('.startGameButton').on('click', function () {
        startGame()
    })
}
function startGame() {
    pregame_var = false;
    addAIButtons();
    whoGoesFirst();
    turn()
}

function addAIButtons() {
    $('.startGameButton').hide();
    $('.moveUnitButton').css('visibility', 'visible');
    $('.fiveTurnsButton').css('visibility', 'visible');
    $('.tenTurnsButton').css('visibility', 'visible');
}
function whoGoesFirst() {
    offense = 1;
    defense = Math.abs(offense - 1);
}

function turn() {
    initializeTurn();
    refreshAIButtons();
    functionsForOffense();
}

function initializeTurn(){
    $allHexagons.attr('class', 'unSelected');
    $('img').attr('data-inRange', false);
    $moveableUnits.off('click');
    $moveableUnits = $('.inPlayUnit*[data-team=' + offense + ']');
    $enemyUnits = $('*[data-team=' + defense + ']');
}
function refreshAIButtons() {
    $('.moveUnitButton').off('click');
    $('.fiveTurnsButton').off('click');
    $('.tenTurnsButton').off('click');
    $('.moveUnitButton').on('click', function () {
        runTurns(1)
    });
    $('.fiveTurnsButton').on('click', function () {
        runTurns(5)
    });
    $('.tenTurnsButton').on('click', function () {
        runTurns(10)
    });
}
function runTurns(howMany) {
    for (var i = 0; i < howMany; i++) {
        setTimeout(function () {
            runATurn();
        }, 1000 * i);
    }
}

function functionsForOffense() {
    $moveableUnits.off('mouseenter');
    $moveableUnits.off('mouseleave');
    $moveableUnits.off('click');
    registerHoverUnit();
    registerClickUnit()
}

function registerHoverUnit() {
    $moveableUnits.on({
        mouseenter: function () {
            updateInfoBox($(this));
        },
        mouseleave: function () {
        }
    });
}
function updateInfoBox(unit) {

    $('#selectedUnitName').empty().append(unit.data('englishname'));
    console.log(unit.data('alive'));
    console.log(unit.data('codename'));

    $('#selectedUnitImage').attr('src', "../assets/svgs/" + unit.data('codename') + ".svg");
    $('#selectedStrength').empty().append('Strength: ' + unit.data('strength'));
    $('#selectedMovement').empty().append('Movement: ' + unit.data('movement'));
    $('#selectedRange').empty().append('Range: ' + unit.data('range'));
    $('#selectedFlank').empty().append('Flank: ' + unit.data('flank'));
    $('#selectedTrump').empty().append('Trump: ' + unit.data('trump'));
}

function registerClickUnit() {
    $moveableUnits.on('click', function () {
        $movingRange.off('click');
//        $enemyUnitsInRange.off('click');
        selectUnit($(this));
    })
}

function selectUnit(el_unit) {
    $selectedUnit = el_unit;
//    $enemyUnitsInRange.off('click');
    updateUnitRanges($selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));
}

function updateUnitRanges(xPos, yPos) {
    $('img').attr('data-inRange', false);
    updateMovementRange($selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));
    updateEnemyInRange($selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));
    refreshHexagonClasses();
    registerMovableArea();
}
function updateMovementRange(xPos, yPos) {
    $movingRangeView = createRangeSelector($selectedUnit.data('movement'), xPos, yPos);
    $movingRange = $movingRangeView.filter(function () {
        return $(this).data('occupied') == false
    });
}
function updateEnemyInRange(xPos, yPos) {
    $attackRange = createRangeSelector($selectedUnit.data('range'), xPos, yPos);
    var $inRange = $('.inPlayUnit*[data-inRange=' + true + ']');
    $enemyUnitsInRange = $inRange.filter(function () {
        return $(this).attr('data-strength') <= $selectedUnit.attr('data-strength')
    });
}
function createRangeSelector(range, xPos, yPos){
    $allHexagons.attr('class', 'unSelected');
    changeClassOfHexagonInRange(range, xPos, yPos, 'testRange', false);
    return $('polygon.testRange');
}

function refreshHexagonClasses() {
    $allHexagons.attr('class', 'unSelected');
    $attackRange.attr('class', 'hoverRange');
    $movingRangeView.attr('class', 'selectedRange');
}

function registerMovableArea() {
    registerPregameArea();
    $movingRange.off('click');
    registerMovableHex();
    if (pregame_var == false) {
        registerAttackUnit()
    }
}

function registerPregameArea() {
    if (pregame_var == true) {
        $allHexagons.attr('class', 'unSelected');
        $initialRange.attr('class', 'selectedRange');
        $movingRange = $initialRange;
    }
}

function registerMovableHex() {
    $movingRange.on('click', function () {
        var $Hexagon = $(this);

        moveImageToMap($selectedUnit);
        if ($(".auxSpace").children().length == 0) {
            $('.startGameButton').css('visibility', 'visible');
        }

        $enemyUnitsInRange.off('click');

        moveUnitToNewPosition($selectedUnit, $Hexagon.data('x-pos'), $Hexagon.data('y-pos'), $Hexagon.data('size'), $selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));
    });
}
function moveImageToMap(unit) {
    if (unit.hasClass('newUnit')) {
        unit.prependTo(".map");
        unit.attr('class', 'inPlayUnit')
    }
}

function registerAttackUnit() {
    $enemyUnitsInRange.on('click', function () {
        moveUnitToGraveyard($(this));
        if ($selectedUnit.data('range') == 0) {
            moveUnitToNewPosition($selectedUnit, $(this).data('x_pos'), $(this).data('y_pos'), $(this).data('row_size'), $selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));
        } else {
            $allHexagons.attr('class', 'unSelected');
            $moveableUnits.off('click');
            $movingRange.off();
            defense = offense;
            offense = Math.abs(offense - 1);
            turn();
        }
        $enemyUnitsInRange.off('click');
        $selectedUnit = 0;
    })
}
function moveUnitToGraveyard(deadUnit) {
    deadUnit.css('margin-top', 0);
    deadUnit.css('margin-left', 0);
    deadUnit.attr('class', 'deadUnit');
    deadUnit.prependTo(".graveyard");
}

function moveUnitToNewPosition(movingUnit, xPos, yPos, hexRowSize, xPosOld, yPosOld) {

    console.log("________________");
    console.log("xPos -> " + xPos);
    console.log("yPos => " + yPos);
    console.log("rowSize ~> " + hexRowSize);

//    console.log("movingUnit" + movingUnit);
//    debugger;
//    xPos = 2;
//    yPos = 9;
//    hexRowSize = 8;
    movingUnit.css('margin-left', 23 + ((11 - hexRowSize) * 30) + ((xPos * 60) - 65));

    movingUnit.css('margin-top', (yPos * 52) - 52);

//    movingUnit.css('margin-left', 113 + 55);

//    movingUnit.css('margin-top', 416);

//    debugger;
    updateMetaData(movingUnit, xPos, yPos, xPosOld, yPosOld, hexRowSize);
//    debugger;
    $allHexagons.attr('class', 'unSelected');
    if (pregame_var == true) {
        $initialRange.attr('class', 'selectedRange')
    }
    $moveableUnits.off('click');
    $movingRange.off('click');

    if (pregame_var == true) {
        functionsForOffense();
    } else {
        defense = offense;
        offense = Math.abs(offense - 1);
        turn();
    }
}
function updateMetaData(movingUnit, xPos, yPos, xPosOld, yPosOld, hexRowSize){
    var $hexOld = findHex(xPosOld, yPosOld);
    $hexOld.attr('data-occupied', false);
    updateUnitMetaData(movingUnit, xPos, yPos, hexRowSize);
    var $hex = findHex(xPos, yPos);
    $hex.attr('data-occupied', true);
}
function updateUnitMetaData(movingUnit, xPos, yPos, hexRowSize) {
    movingUnit.attr('data-x_pos', xPos);
    movingUnit.attr('data-y_pos', yPos);
    movingUnit.data('y_pos', yPos);
    movingUnit.data('x_pos', xPos);
    movingUnit.data('row_size', hexRowSize);
//    This Screws with the positioning(place dragon on y=9 x=2, and load.
//    movingUnit.attr('data-rowSize', hexRowSize);

}

//------Range hex------
function changeClassOfHexagonInRange(unit_moves, unit_x, unit_y, newHexClass, flash) {
    var horizontal = 1;
    while (horizontal <= unit_moves) {
        changeClassOfHexCircumference(unit_x, unit_y, horizontal, newHexClass, flash);
        horizontal += 1;
    }
}
function changeClassOfHexCircumference(unit_x, unit_y, horizontal, newHexClass, click) {

    var constantUp = 0;
    var constantDown = 0;
    var initialSizeDown = findHex(unit_x, unit_y).data('size');
    var initialSizeUp = findHex(unit_x, unit_y).data('size');

    var vertical = 1;
    hexClassChange((unit_x - horizontal), (unit_y), newHexClass, horizontal, click);
    hexClassChange((unit_x + horizontal), (unit_y), newHexClass, horizontal, click);

    while (horizontal >= vertical) {

        var finalSizeDown = findHex(unit_x, unit_y + vertical).data('size');
        var finalSizeUp = findHex(unit_x, unit_y - vertical).data('size');

        if (initialSizeDown < finalSizeDown) {
            constantDown += 1;
        }
        if (initialSizeUp < finalSizeUp) {
            constantUp += 1;
        }

        changeVerticalHexagons(unit_x, unit_y, vertical, vertical, horizontal, constantDown, newHexClass, click);
        changeVerticalHexagons(unit_x, unit_y, vertical, (vertical * -1), horizontal, constantUp, newHexClass, click);

        initialSizeDown = finalSizeDown;
        initialSizeUp = finalSizeUp;
        vertical += 1;
    }
}
function findHex(xPos, yPos) {
    return $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]");
}
function changeVerticalHexagons(unit_x, unit_y, vertical, up, horizontal, constant, newHexClass, click) {
    if (horizontal <= vertical) {
        verticalHexChange(unit_x, unit_y, horizontal, vertical, constant, up, newHexClass, click)
    } else {
        diagonalHexChange(unit_x, unit_y, vertical, up, horizontal, constant, newHexClass, click);
    }
}
function verticalHexChange(unit_x, unit_y, horizontal, vertical, constant, up, newHexClass, click) {
    var row = 0;
    while (row <= horizontal) {
        hexClassChange((unit_x - (horizontal + row - vertical - constant)), (unit_y + up), newHexClass, horizontal, click);
        row += 1;
    }
}
function diagonalHexChange(unit_x, unit_y, vertical, up, horizontal, constantDown, newHexClass, click) {
    hexClassChange((unit_x - (horizontal - constantDown)), (unit_y + up), 'testRange', horizontal, click);
    hexClassChange((unit_x + (horizontal + constantDown - vertical)), (unit_y + up), newHexClass, horizontal, click);
}
function hexClassChange(xPos, yPos, className, horizontal, click) {

    $('*[data-x_pos=' + xPos + '][data-y_pos=' + yPos + '][data-team=' + defense + ']').attr('data-inRange', true);
    if (!click) {
        $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]").attr('class', className);
    } else {
        $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]").delay(30 * horizontal).queue(function (next) {
            $(this).fadeOut().attr('class', className).fadeIn();
        });
    }
}
//------Range hex------

function placeEnemies() {
    var $enemies = $('*[data-team=' + 0 + ']');
    movingGroupToMap($enemies);
    $('.loadEnemiesButton').hide()
}
function placeUnits() {
    var $units = $('*[data-team=' + 1 + ']');
    movingGroupToMap($units);
    $('.startGameButton').css('visibility', 'visible');
    $('.randomSetUpButton').hide()
}
function movingGroupToMap(group) {
    group.each(function () {
        moveImageToMap($(this));
//        (if $(this).data)
        console.log("============");
        console.log("Name ~> " + $(this).data('codename'));
        console.log("rdata-xPos ~> " + $(this).data('xPos'));
        console.log("data-yPos ~> " + $(this).data('yPos'));

        moveUnitToNewPosition($(this), $(this).data('xPos'), $(this).data('yPos'), $(this).data('rowsize'));
//        moveUnitToNewPosition($(this), $(this).attr('data-xPos'), $(this).attr('data-yPos'), $(this).data('rowsize'));
    });
}

function runATurn() {
    var $unitBeingMoved = $moveableUnits.random();
    $unitBeingMoved.click();
    setTimeout(function () {
        var $hexBeingMovedTo = $movingRange.random();
        var $enemyBeingAttacked = $enemyUnitsInRange.random();
        moveUnitAI($hexBeingMovedTo, $enemyBeingAttacked);
    }, 500);
}
function moveUnitAI(movableHexagons, attackableEnemies) {
    if ($enemyUnitsInRange.length == 0) {
        movableHexagons.click();
    } else {
        attackableEnemies.click();
    }
}
$.fn.random = function () {
    return this.eq(Math.floor(Math.random() * this.length));
};

$(document).ready(function () {

//    $("#dragon").

    $movingRange = $("polygon.selected_range");
    $attackRange = $movingRange;
    $enemyUnitsInRange = $movingRange;
    $initialRange = $('.selectedRange');
    $allHexagons = $('polygon');

    pregame_var = true;

    $moveableUnits = $('*[data-team=' + 1 + '], *[data-team=' + 0 + ']');
    $enemyUnitsInRange = $moveableUnits;

    pregame();
    $('.loadEnemiesButton').on('click', function () {
        placeEnemies()
    });
    $('.randomSetUpButton').on('click', function () {
        placeUnits()
    });

//  Json
    var pieceAtt;
    var getPieceAttributes = function () {
        var pieceJson = $.getJSON('/piece_attributes');
        pieceJson.success(function (jsonResponse) {
            pieceAtt = jsonResponse;
            console.log(jsonResponse)
        });
    };
    getPieceAttributes();
});