
var offense;
var defense;
var $player1name = "Alex";
var $player0name = "Tyrion";

//Units that can be hovered/clicked
var $moveable_units;
var $enemy_units;
//Selected Unit Global Variables
var $selected_unit;
var $selected_moves;
var $selected_range;
//Initializing the Hexagon Selectors
var $allHexagons;
var $initialRange;
var $movableArea;
var pregame_var;

//  Functions.
function pregame(){
    functionsForOffense();
    $('.startGameButton').on('click', function(){
        clearAllUnitMethods();
        startGame()
    })
}

function clearAllUnitMethods(){
    var $allUnits = $('*[data-team=' + 1 + '], *[data-team=' + 0 + ']');
    $allUnits.off('mouseenter');
    $allUnits.off('mouseleave');
    $allUnits.off('click')
}
function startGame(){
//    Player with King closest to te center goes first
//    but for now player 1 will go first.
    pregame_var = false;
    $allHexagons.attr('class', 'unSelected');
    offense = 1;
    defense = 0;
    turn()
}

function turn(){
    $enemy_units.off('click');
    $moveable_units = $('*[data-team=' + offense + ']');
    $enemy_units = $('*[data-team=' + defense + ']');
    functionsForOffense();
}

function functionsForOffense(){
    $moveable_units.off('mouseenter');
    $moveable_units.off('mouseleave');
    registerHoverUnit();
    registerClickUnit()
}

function registerHoverUnit(){
    $moveable_units.on({
        mouseenter: function () {
            updateInfoBox($(this));
        },
        mouseleave: function () {
        }
    });
}
function updateInfoBox(unit){
    $('#selectedUnitName').empty().append(unit.data('englishname'));
    $('#selectedUnitImage').attr('src', "../assets/pieces/" + unit.data('codename') + ".png");
    $('#selectedStrength').empty().append('Strength: ' + unit.data('strength'));
    $('#selectedMovement').empty().append('Movement: ' + unit.data('movement'));
    $('#selectedRange').empty().append('Range: ' + unit.data('changeClassOfHexagonInRange'));
    $('#selectedFlank').empty().append('Flank: ' + unit.data('flank'));
    $('#selectedTrump').empty().append('Trump: ' + unit.data('trump'));
}

function registerClickUnit(){
    $moveable_units.on('click', function(){
        $selected_range.off('click');
        selectUnit($(this));
    })
}

function selectUnit(el_unit) {
    $selected_unit = el_unit;
    $selected_moves = $selected_unit.data('movement');
    $allHexagons.attr('class', 'unSelected');
    updateSelectedRange($selected_unit.data('x_pos'), $selected_unit.data('y_pos'));
    createMovableArea();
}
function updateSelectedRange(xPos, yPos) {
    changeClassOfHexagonInRange($selected_moves, xPos, yPos, 'testRange', false);
    $selected_range = $('polygon.testRange');
    changeClassOfHexagonInRange($selected_moves, xPos, yPos, 'selectedRange', false);
}

function createMovableArea() {

    selectMovableArea();
    $movableArea.off('click');
    $initialRange.off('click');
    resetHexagons();

    registerMovableHex();
    if (pregame_var == false) {registerAttackUnit()}

}

function registerMovableHex(){
    $movableArea.on('click', function () {
        var $Hexagon = $(this);

//      If new unit, it undergoes a class change
        if ($selected_unit.hasClass('newUnit')) {
            $selected_unit.prependTo(".map");
            $selected_unit.attr('class', 'inPlayUnit')
        }
        if ( $(".auxSpace").children().length == 0) {
            $('.startGameButton').css('visibility', 'visible');
        }

        $enemy_units.off('click');

//      Moving the $movingPiece to it's new position
        moveSelectedUnitToNewPosition($selected_unit, $Hexagon.data('x-pos'), $Hexagon.data('y-pos'), $Hexagon.data('size'));
        $selected_unit = 0;
    });
}

function resetHexagons(){
    $allHexagons.attr("class", "unSelected");
    $movableArea.attr("class", "selectedRange");
}

function selectMovableArea(){
    if (pregame_var == true) {
        $movableArea = $initialRange;
    }else{
        $movableArea = $selected_range;
    }
}

function registerAttackUnit(){
    $enemy_units.on('click', function(){

        if ($selected_unit.data('strength') >= $(this).data('strength')){

            moveUnitToGraveyard($(this));

            moveSelectedUnitToNewPosition($selected_unit, $(this).data('x_pos'), $(this).data('y_pos'), $(this).data('row_size'));

            $enemy_units.off('click');
            $selected_unit = 0;

        }
    })
}
function moveUnitToGraveyard(deadUnit){
    deadUnit.css('margin-top', 0);
    deadUnit.css('margin-left', 0);
    deadUnit.attr('class', 'deadUnit');
    deadUnit.prependTo(".graveyard");
}

function moveSelectedUnitToNewPosition(movingUnit, xPos, yPos, hexRowSize){

    updateSelectedUnitMetaData(xPos, yPos, hexRowSize);

    movingUnit.css('margin-top', (yPos * 52) - 52);
    movingUnit.css('margin-left', 17 + ((11 - hexRowSize) * 30) + ((xPos * 60) - 60));

    $allHexagons.attr('class', 'unSelected');
    if (pregame_var == true) {$initialRange.attr('class', 'selectedRange')}

    $moveable_units.off('click');

    $selected_range.off();
    movingUnit = 0;

    if (pregame_var == true) {
        functionsForOffense();
    }else{
        defense = offense;
        offense = Math.abs(offense - 1);
        turn();
    }
}
function updateSelectedUnitMetaData (xPos, yPos, hexRowSize){
    $selected_unit.data('x_pos', xPos);
    $selected_unit.data('y_pos', yPos);
    $selected_unit.data('row_size', hexRowSize);
}

function changeClassOfHexagonInRange(unit_moves, unit_x, unit_y, newHexClass, flash) {
    var initialSizeUp;
    var initialSizeDown;
    var finalSizeUp;
    var finalSizeDown;
    var constantUp;
    var constantDown;

    var horizontal = 1;
    var vertical = 1;

    while (horizontal <= unit_moves) {
        changeClassOfHexCircumference(unit_x, unit_y, horizontal, finalSizeDown, finalSizeUp, newHexClass, flash);
        horizontal += 1;
    }
}

function changeClassOfHexCircumference(unit_x, unit_y, horizontal, finalSizeDown, finalSizeUp, newHexClass, click){
    var constantUp = 0;
    var constantDown = 0;
    var vertical = 1;
    var initialSizeDown = findHex(unit_x, unit_y).data('size');
    var initialSizeUp = findHex(unit_x, unit_y).data('size');

    hexClassChange((unit_x - horizontal), (unit_y), newHexClass, horizontal, click);
    hexClassChange((unit_x + horizontal), (unit_y), newHexClass, horizontal, click);

    while (horizontal >= vertical) {

        finalSizeDown = findHex(unit_x, unit_y + vertical).data('size');
        finalSizeUp = findHex(unit_x, unit_y - vertical).data('size');

        if (initialSizeDown < finalSizeDown) {constantDown += 1}
        if (initialSizeUp < finalSizeUp) {constantUp += 1}

        changeVerticalHexagons(unit_x, unit_y, vertical, vertical, horizontal, constantDown, newHexClass, click, finalSizeDown, finalSizeUp);
        changeVerticalHexagons(unit_x, unit_y, vertical, (vertical*-1), horizontal, constantUp, newHexClass, click, finalSizeDown, finalSizeUp);

        vertical += 1;
    }
}
function findHex(x_pos, y_pos) {
    return $("polygon[data-x-pos=" + x_pos + "][data-y-pos=" + y_pos + "]");
}

function changeVerticalHexagons(unit_x, unit_y, vertical, up, horizontal, constant, newHexClass, click, finalSizeDown, finalSizeUp){
    if (horizontal <= vertical) {
        verticalHexChange(unit_x, unit_y, horizontal, vertical, constant, up, newHexClass, click)
    } else {
        diagonalHexChange(unit_x, unit_y, vertical, up, horizontal, constant, newHexClass, click, finalSizeDown, finalSizeUp);
    }
}
function verticalHexChange(unit_x, unit_y, horizontal, vertical, constant, up, newHexClass, click){
    var row = 0;
    while (row <= horizontal) {
        hexClassChange((unit_x - (horizontal + row - vertical - constant)), (unit_y + up), newHexClass, horizontal, click);
        row += 1;
    }
}
function diagonalHexChange(unit_x, unit_y, vertical, up, horizontal, constantDown, newHexClass, click, finalSizeDown, finalSizeUp){
    hexClassChange((unit_x - (horizontal - constantDown)), (unit_y + up), 'testRange', horizontal, click);
    hexClassChange((unit_x + (horizontal + constantDown - vertical)), (unit_y + up), newHexClass, horizontal, click);
    var initialSizeDown = finalSizeDown;
    var initialSizeUp = finalSizeUp;
}

function hexClassChange(xPos, yPos, className, horizontal, click) {
    if (!click) {
        $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]").attr('class', className);
    } else {
        $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]").delay(30 * horizontal).queue(function (next) {
            $(this).fadeOut().attr('class', className).fadeIn();
        });
    }
}

$(document).ready(function () {
//  Hexagon selectors
//  $selected_range just need an initial selector
    $selected_range = $("polygon.selected_range");
    $initialRange = $('.selectedRange');
    $allHexagons =  $('polygon');

    pregame_var = true;

    $selected_unit = 0;
    $moveable_units = $('*[data-team=' + 1 + '], *[data-team=' + 0 + ']');
    $enemy_units = $moveable_units;

    pregame();

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