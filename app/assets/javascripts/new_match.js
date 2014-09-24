var offense;
var defense;
var $player1name = "Alex";
var $player0name = "Tyrion";

//Units that can be hovered/clicked
var $moveable_units;
var $enemy_units;
var $enemy_units_in_range;
//Selected Unit Global Variables
var $selected_unit;
var $selected_moves;
var $selectedMovingRange;
//Initializing the Hexagon Selectors
var $allHexagons;
var $initialRange;
var $movableArea;
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
    console.log("clearAllUnitMethods ");

    var $allUnits = $('*[data-team=' + 1 + '], *[data-team=' + 0 + ']');
    $allUnits.off('mouseenter');
    $allUnits.off('mouseleave');
    $allUnits.off('click')
}
function startGame() {
    console.log("startGame ");

//    Player with King closest to te center goes first
//    but for now player 1 will go first.

    pregame_var = false;
    $allHexagons.attr('class', 'unSelected');
    offense = 1;
    defense = 0;
    turn()
}

function turn() {
    console.log(" turn");

    $enemy_units_in_range.off('click');
    $('img').attr('data-inrange', false);
    $moveable_units = $('*[data-team=' + offense + ']');
    $enemy_units = $('*[data-team=' + defense + ']');
    $enemy_units_in_range = $enemy_units;
    functionsForOffense();
}

function functionsForOffense() {
    console.log("functionsForOffense ");

    $moveable_units.off('mouseenter');
    $moveable_units.off('mouseleave');
    registerHoverUnit();
    registerClickUnit()
}

function registerHoverUnit() {
    console.log("registerHoverUnit ");

    $moveable_units.on({
        mouseenter: function () {
            updateInfoBox($(this));
        },
        mouseleave: function () {
        }
    });
}
function updateInfoBox(unit) {
    console.log("updateInfoBox ");

    $('#selectedUnitName').empty().append(unit.data('englishname'));
    $('#selectedUnitImage').attr('src', "../assets/pieces/" + unit.data('codename') + ".png");
    $('#selectedStrength').empty().append('Strength: ' + unit.data('strength'));
    $('#selectedMovement').empty().append('Movement: ' + unit.data('movement'));
    $('#selectedRange').empty().append('Range: ' + unit.data('range'));
    $('#selectedFlank').empty().append('Flank: ' + unit.data('flank'));
    $('#selectedTrump').empty().append('Trump: ' + unit.data('trump'));
}

function registerClickUnit() {
//    console.log("registerClickUnit ");

    $moveable_units.on('click', function () {
        $selectedMovingRange.off('click');
        selectUnit($(this));
    })
}

function selectUnit(el_unit) {
//    console.log("selectUnit ");
    $('img').attr('data-inrange', false);
    $enemy_units_in_range.off('click');
    $selected_unit = el_unit;
    $selected_moves = $selected_unit.data('movement');
    $allHexagons.attr('class', 'unSelected');

    updateSelectedRange($selected_unit.data('x_pos'), $selected_unit.data('y_pos'));
    createMovableArea();
}
function updateSelectedRange(xPos, yPos) {
//    console.log("updateSelectedRange ");
    changeClassOfHexagonInRange($selected_moves, xPos, yPos, 'testRange', false);
    $selectedMovingRange = $('polygon.testRange');
    changeClassOfHexagonInRange($selected_moves, xPos, yPos, 'selectedRange', false);
//    if $selected_unit.data('range')
    $enemy_units_in_range = $('*[data-inrange=' + true + ']');
}

function createMovableArea() {
//    console.log("createMovableArea ");
    selectMovableArea();
    $movableArea.off('click');
    $initialRange.off('click');
    resetHexagons();

    registerMovableHex();
    if (pregame_var == false) {
        registerAttackUnit()
    }

}

function registerMovableHex() {
//    console.log("registerMovableHex ");

    $movableArea.on('click', function () {
        var $Hexagon = $(this);

//      If new unit, it undergoes a class change
        if ($selected_unit.hasClass('newUnit')) {
            $selected_unit.prependTo(".map");
            $selected_unit.attr('class', 'inPlayUnit')
        }
        if ($(".auxSpace").children().length == 0) {
            $('.startGameButton').css('visibility', 'visible');
        }

        $enemy_units_in_range.off('click');

//      Moving the $movingPiece to it's new position
        moveSelectedUnitToNewPosition($selected_unit, $Hexagon.data('x-pos'), $Hexagon.data('y-pos'), $Hexagon.data('size'));
        $selected_unit = 0;
    });
}

function resetHexagons() {
//    console.log("resetHexagons ");
    $allHexagons.attr("class", "unSelected");
    $movableArea.attr("class", "selectedRange");
}

function selectMovableArea() {
//    console.log(" selectMovableArea");
    if (pregame_var == true) {
        $movableArea = $initialRange;
    } else {
        $movableArea = $selectedMovingRange;
    }
}

function registerAttackUnit() {
//    console.log("registerAttackUnit ");

    $enemy_units_in_range.on('click', function () {

        if ($selected_unit.data('strength') >= $(this).data('strength')) {

            moveUnitToGraveyard($(this));

            if ($selected_unit.data('range')  == 0) {
                moveSelectedUnitToNewPosition($selected_unit, $(this).data('x_pos'), $(this).data('y_pos'), $(this).data('row_size'));
            }else{
                $allHexagons.attr('class', 'unSelected');

                $moveable_units.off('click');

                $selectedMovingRange.off();

                defense = offense;
                offense = Math.abs(offense - 1);
                turn();
            }

            $enemy_units_in_range.off('click');
            $selected_unit = 0;

        }
    })
}
function moveUnitToGraveyard(deadUnit) {
    console.log("moveUnitToGraveyard ");

    deadUnit.css('margin-top', 0);
    deadUnit.css('margin-left', 0);
    deadUnit.attr('class', 'deadUnit');
    deadUnit.prependTo(".graveyard");
}

function moveSelectedUnitToNewPosition(movingUnit, xPos, yPos, hexRowSize) {
//    console.log("moveSelectedUnitToNewPosition");

    movingUnit.css('margin-top', (yPos * 52) - 52);
    movingUnit.css('margin-left', 17 + ((11 - hexRowSize) * 30) + ((xPos * 60) - 60));

    updateSelectedUnitMetaData(movingUnit, xPos, yPos, hexRowSize);

    $allHexagons.attr('class', 'unSelected');
    if (pregame_var == true) {
        $initialRange.attr('class', 'selectedRange')
    }


    $moveable_units.off('click');

    $selectedMovingRange.off();
    movingUnit = 0;

    if (pregame_var == true) {
        functionsForOffense();
    } else {
        defense = offense;
        offense = Math.abs(offense - 1);
        turn();
    }
}
function updateSelectedUnitMetaData(movingUnit, xPos, yPos, hexRowSize) {
//    console.log("updateSelectedUnitMetaData");

    movingUnit.attr('data-x_pos', xPos);
    movingUnit.attr('data-y_pos', yPos);
    movingUnit.data('y_pos', yPos);
    movingUnit.data('x_pos', xPos);

    movingUnit.data('row_size', hexRowSize);
}

function changeClassOfHexagonInRange(unit_moves, unit_x, unit_y, newHexClass, flash) {
//    console.log("changeClassOfHexagonInRange ");

//    var initialSizeUp;
//    var initialSizeDown;
//    var finalSizeUp;
//    var finalSizeDown;
//    var constantUp;
//    var constantDown;
//    var vertical = 1;
    var horizontal = 1;
    while (horizontal <= unit_moves) {
        changeClassOfHexCircumference(unit_x, unit_y, horizontal, newHexClass, flash);
        horizontal += 1;
    }
}

function changeClassOfHexCircumference(unit_x, unit_y, horizontal, newHexClass, click) {
//    console.log("changeClassOfHexCircumference ");

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
//    console.log("findHex ");

    return $("polygon[data-x-pos=" + x_pos + "][data-y-pos=" + y_pos + "]");
}

function changeVerticalHexagons(unit_x, unit_y, vertical, up, horizontal, constant, newHexClass, click) {
//    console.log(" changeVerticalHexagons");
    if (horizontal <= vertical) {
        verticalHexChange(unit_x, unit_y, horizontal, vertical, constant, up, newHexClass, click)
    } else {
        diagonalHexChange(unit_x, unit_y, vertical, up, horizontal, constant, newHexClass, click);
    }
}

function verticalHexChange(unit_x, unit_y, horizontal, vertical, constant, up, newHexClass, click) {
//    console.log(" verticalHexChange");
    var row = 0;
    while (row <= horizontal) {
        hexClassChange((unit_x - (horizontal + row - vertical - constant)), (unit_y + up), newHexClass, horizontal, click);
        row += 1;
    }
}
function diagonalHexChange(unit_x, unit_y, vertical, up, horizontal, constantDown, newHexClass, click) {
//    console.log("diagonalHexChange ");

    hexClassChange((unit_x - (horizontal - constantDown)), (unit_y + up), 'testRange', horizontal, click);
    hexClassChange((unit_x + (horizontal + constantDown - vertical)), (unit_y + up), newHexClass, horizontal, click);

}

function hexClassChange(xPos, yPos, className, horizontal, click) {
//    console.log("hexClassChange ");

    $('*[data-x_pos=' + xPos + '][data-y_pos=' + yPos + '][data-team=' + defense + ']').attr('data-inrange', true);
    if (!click) {
        $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]").attr('class', className);
    } else {
        $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]").delay(30 * horizontal).queue(function (next) {
            $(this).fadeOut().attr('class', className).fadeIn();
        });
    }
}

function placeEnemies(){
    var $enemies = $('*[data-team=' + 0 + ']');
    $enemies.each(function(enemy){
        if ($(this).hasClass('newUnit')) {
            $(this).prependTo(".map");
            $(this).attr('class', 'inPlayUnit')
        }
        moveSelectedUnitToNewPosition($(this), $(this).data('x_pos'), $(this).data('y_pos'), $(this).data('row_size'));
        $('.loadEnemies').hide()

    });
}

function placeUnits(){
    var $units = $('*[data-team=' + 1 + ']');
    $units.each(function(enemy){
        if ($(this).hasClass('newUnit')) {
            $(this).prependTo(".map");
            $(this).attr('class', 'inPlayUnit')
        }
        moveSelectedUnitToNewPosition($(this), $(this).data('x_pos'), $(this).data('y_pos'), $(this).data('row_size'));
    });
    $('.startGameButton').css('visibility', 'visible');
    $('.randomSetUp').hide()
    }

$(document).ready(function () {
    console.log("$(document).ready ");

//  Hexagon selectors
//  $selectedMovingRange just need an initial selector
    $selectedMovingRange = $("polygon.selected_range");
    $initialRange = $('.selectedRange');
    $allHexagons = $('polygon');

    pregame_var = true;

    $selected_unit = 0;
    $moveable_units = $('*[data-team=' + 1 + '], *[data-team=' + 0 + ']');
    $enemy_units_in_range = $moveable_units;

    pregame();

    $('.loadEnemies').on('click', function(){
       placeEnemies()
    });
    $('.randomSetUp').on('click', function(){
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