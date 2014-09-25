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
var $attackRange;
var $allHexagons;
var $initialRange;

//Initializing the Hexagon Selectors
var pregame_var;

//  Functions.
function pregame() {
    functionsForOffense();
    $('.startGameButton').on('click', function () {
        clearAllUnitMethods();
        startGame();
        $('.startGameButton').hide()
    })
}
function clearAllUnitMethods() {
    var $allUnits = $('*[data-team=' + 1 + '], *[data-team=' + 0 + ']');
    $allUnits.off('mouseenter');
    $allUnits.off('mouseleave');
    $allUnits.off('click')
}
function startGame() {
    $allHexagons.attr('class', 'unSelected');
    pregame_var = false;
    whoGoesFirst();
    turn()
}

function whoGoesFirst(){
    offense = 1;
    defense = Math.abs(offense - 1);
}

function turn() {
    $enemyUnitsInRange.off('click');
    $moveableUnits = $('*[data-team=' + offense + ']');
    $enemyUnits = $('*[data-team=' + defense + ']');
    $enemyUnitsInRange = $enemyUnits;
    functionsForOffense();
}

function functionsForOffense() {
    $moveableUnits.off('mouseenter');
    $moveableUnits.off('mouseleave');
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
    $('#selectedUnitImage').attr('src', "../assets/pieces/" + unit.data('codename') + ".png");
    $('#selectedStrength').empty().append('Strength: ' + unit.data('strength'));
    $('#selectedMovement').empty().append('Movement: ' + unit.data('movement'));
    $('#selectedRange').empty().append('Range: ' + unit.data('range'));
    $('#selectedFlank').empty().append('Flank: ' + unit.data('flank'));
    $('#selectedTrump').empty().append('Trump: ' + unit.data('trump'));
}

function registerClickUnit() {
    $moveableUnits.on('click', function () {
        $movingRange.off('click');
        selectUnit($(this));
    })
}

function selectUnit(el_unit) {
    $('img').attr('data-inrange', false);
    $enemyUnitsInRange.off('click');
    $selectedUnit = el_unit;
    updateUnitRange($selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));
    createMovableArea();
}

function updateUnitRange(xPos, yPos) {
    updateMovementRange($selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));
    updateEnemyInRange($selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));
    $allHexagons.attr('class', 'unSelected');
    $attackRange.attr('class', 'hoverRange');
    $movingRange.attr('class', 'selectedRange');
}
function updateMovementRange(xPos, yPos) {
    $allHexagons.attr('class', 'unSelected');
    changeClassOfHexagonInRange($selectedUnit.data('movement'), xPos, yPos, 'testRange', false);
    $movingRange = $('polygon.testRange');
}
function updateEnemyInRange(xPos, yPos) {
    $allHexagons.attr('class', 'unSelected');
    changeClassOfHexagonInRange($selectedUnit.data('range'), xPos, yPos, 'testRange', false);
    $attackRange = $('polygon.testRange');
    $enemyUnitsInRange = $('*[data-inrange=' + true + ']');
}

function createMovableArea() {
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

        moveUnitToNewPosition($selectedUnit, $Hexagon.data('x-pos'), $Hexagon.data('y-pos'), $Hexagon.data('size'));
        $selectedUnit = 0;
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

        if ($selectedUnit.data('strength') >= $(this).data('strength')) {

            moveUnitToGraveyard($(this));

            if ($selectedUnit.data('range') == 0) {
                moveUnitToNewPosition($selectedUnit, $(this).data('x_pos'), $(this).data('y_pos'), $(this).data('row_size'));
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

        }
    })
}
function moveUnitToGraveyard(deadUnit) {
    deadUnit.css('margin-top', 0);
    deadUnit.css('margin-left', 0);
    deadUnit.attr('class', 'deadUnit');
    deadUnit.prependTo(".graveyard");
}

function moveUnitToNewPosition(movingUnit, xPos, yPos, hexRowSize) {

    movingUnit.css('margin-top', (yPos * 52) - 52);
    movingUnit.css('margin-left', 17 + ((11 - hexRowSize) * 30) + ((xPos * 60) - 60));

    updateUnitMetaData(movingUnit, xPos, yPos, hexRowSize);

    $allHexagons.attr('class', 'unSelected');
    if (pregame_var == true) {
        $initialRange.attr('class', 'selectedRange')
    }
    $moveableUnits.off('click');

    if (pregame_var == true) {
        functionsForOffense();
    } else {
        defense = offense;
        offense = Math.abs(offense - 1);
        turn();
    }
}
function updateUnitMetaData(movingUnit, xPos, yPos, hexRowSize) {
    movingUnit.attr('data-x_pos', xPos);
    movingUnit.attr('data-y_pos', yPos);
    movingUnit.data('y_pos', yPos);
    movingUnit.data('x_pos', xPos);
    movingUnit.data('row_size', hexRowSize);
}

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
function findHex(x_pos, y_pos) {
    return $("polygon[data-x-pos=" + x_pos + "][data-y-pos=" + y_pos + "]");
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

    $('*[data-x_pos=' + xPos + '][data-y_pos=' + yPos + '][data-team=' + defense + ']').attr('data-inrange', true);
    if (!click) {
        $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]").attr('class', className);
    } else {
        $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]").delay(30 * horizontal).queue(function (next) {
            $(this).fadeOut().attr('class', className).fadeIn();
        });
    }
}

function placeEnemies() {
    var $enemies = $('*[data-team=' + 0 + ']');
    movingGroupToMap($enemies);
    $('.loadEnemies').hide()
}
function placeUnits() {
    var $units = $('*[data-team=' + 1 + ']');
    movingGroupToMap($units);
    $('.startGameButton').css('visibility', 'visible');
    $('.randomSetUp').hide()
}
function movingGroupToMap(group){
    group.each(function () {
        moveImageToMap($(this));
        moveUnitToNewPosition($(this), $(this).data('x_pos'), $(this).data('y_pos'), $(this).data('row_size'));
    });
}

$(document).ready(function () {

    $movingRange = $("polygon.selected_range");
    $attackRange = $movingRange;
    $initialRange = $('.selectedRange');
    $allHexagons = $('polygon');

    pregame_var = true;

    $selectedUnit = 0;
    $moveableUnits = $('*[data-team=' + 1 + '], *[data-team=' + 0 + ']');
    $enemyUnitsInRange = $moveableUnits;

    pregame();

    $('.loadEnemies').on('click', function () {
        placeEnemies()
    });
    $('.randomSetUp').on('click', function () {
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