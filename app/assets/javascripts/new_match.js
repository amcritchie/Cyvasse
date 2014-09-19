

var $turn = 1;
//var pregame = 1;
var $selectedUnit = 0;
var $player1name = "Alex";
var $player0name = "Tyrion";

//Units that can be hovered/clicked
var $moveable_units;
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
//    registerHoverUnit();
    gameRegisterHoverUnit();
    $('.startGameButton').on('click', function(){
        console.log('let it begin');
//        $initialRange = 0;
        clearAllUnitMethods();
        startGame()
    })
}

function startGame(){
//    Player with King closest to te center goes first
//    but for not player 1 will go first.
    var whoGoesFirst = 1;
    turn(whoGoesFirst)
}

function clearAllUnitMethods(){
    var $allUnits = $('*[data-team=' + 1 + '], *[data-team=' + 0 + ']');
    $allUnits.off('mouseenter');
    $allUnits.off('mouseleave');
    $allUnits.off('click')
}

function turn(team_id){
    $moveable_units = $('*[data-team=' + team_id + ']');
    gameRegisterHoverUnit()
}


function gameRegisterHoverUnit(){
    $moveable_units.off('mouseenter');
    $moveable_units.off('mouseleave');

    $moveable_units.on({
        mouseenter: function () {
            var $hoverPiece = $(this);
            var $hovering_moves = $hoverPiece.data('movement');
            var $hovering_x = $hoverPiece.data('x_pos');
            var $hovering_y = $hoverPiece.data('y_pos');

//            changeClassOfHexagonInRange($hovering_moves, $hovering_x, $hovering_y, 'hoverRange', false);
            updateInfoBox($hoverPiece);

//            $(this).click(function () {
//                $moveable_units.off('mouseenter');
//                $selected_range.off('click');
//                debugger;
//
//                selectUnit($(this));
//                $selected_unit.off('click');
//            });
        },
        mouseleave: function () {
            $allHexagons.attr('class', 'unSelected');
            $initialRange.attr('class', 'selectedRange');
            if ($selected_unit != 0){$selected_range.attr('class', 'selectedRange')}
        }
    });
    $moveable_units.on('click', function(){
//        $moveable_units.off('click');
        $selected_range.off('click');

        selectUnit($(this));
        $selected_unit.off('click');
    })
}
function selectUnit(el_unit) {
    $selected_unit = el_unit;
    $selected_moves = $selected_unit.data('movement');
    var $selected_x = $selected_unit.data('x_pos');
    var $selected_y = $selected_unit.data('y_pos');

    $allHexagons.attr('class', 'unSelected');
    $initialRange.attr('class', 'selectedRange');

//    Saving the $selected_range
//    debugger;
//    gameRegisterHoverUnit();

    updateSelectedRange($selected_x, $selected_y);
    registerMovableHexs();
}
function moveUnit(xPos, yPos, hexRowSize){
    $selected_unit.css('margin-top', (yPos * 52) - 52);
    $selected_unit.css('margin-left', 17 + ((11 - hexRowSize) * 30) + ((xPos * 60) - 60));

    $allHexagons.attr('class', 'unSelected');
    $initialRange.attr('class', 'selectedRange');

//    changeClassOfHexagonInRange($selected_moves, xPos, yPos, 'hoverRange', false);
    $selected_range.off();
    $selected_unit = 0;

//    registerStartGame();
    gameRegisterHoverUnit()
}
function registerMovableHexs() {

    if (pregame_var == true) {
        $movableArea = $initialRange.add($selected_range);
    }else{
        $movableArea = $selected_range;
    }

    $movableArea = $initialRange.add($selected_range);
    $allHexagons = $('polygon');

    $movableArea.off('click');
    $initialRange.off('click');

    $allHexagons.attr("class", "unSelected");
    $movableArea.attr("class", "selectedRange");

    $movableArea.on('click', function () {
        var $Hexagon = $(this);
        var $Hexagon_x = $Hexagon.data('x-pos');
        var $Hexagon_y = $Hexagon.data('y-pos');
        var $Hexagon_size = $Hexagon.data('size');

//      If new unit, it undergoes a class change
        if ($selected_unit.hasClass('newUnit')) {
            $selected_unit.prependTo(".map");
            $selected_unit.attr('class', 'inPlayUnit')
        }
        if ( $(".auxSpace").children().length == 0) {
            $('.startGameButton').css('visibility', 'visible');
        }

//      Updating the $movingPiece's coordinates.
        $selected_unit.data('x_pos', $Hexagon_x);
        $selected_unit.data('y_pos', $Hexagon_y);
        $selected_unit.data('row_size', $Hexagon_size);

//      Moving the $movingPiece to it's new position
        moveUnit($Hexagon_x, $Hexagon_y, $Hexagon_size);
    });
}


//function registerHoverUnit(){
//    $moveable_units.off('mouseenter');
//    $moveable_units.off('mouseleave');
//
//    $moveable_units.on({
//        mouseenter: function () {
//            var $hoverPiece = $(this);
//            var $hovering_moves = $hoverPiece.data('movement');
//            var $hovering_x = $hoverPiece.data('x_pos');
//            var $hovering_y = $hoverPiece.data('y_pos');
//
//            changeClassOfHexagonInRange($hovering_moves, $hovering_x, $hovering_y, 'hoverRange', false);
//            updateInfoBox($hoverPiece);
//
//            $(this).click(function () {
//                $moveable_units.off('mouseenter');
//                $selected_range.off('click');
//                pregameSelectUnit($(this));
//                $selected_unit.off('click');
//            });
//        },
//        mouseleave: function () {
////            if ($(this) !=  $selected_unit) return;
//            $allHexagons.attr('class', 'unSelected');
//            $initialRange.attr('class', 'selectedRange');
//            if ($selected_unit != 0){$selected_range.attr('class', 'selectedRange')}
//        }
//    });
//}
function pregameSelectUnit(el_unit) {
    $selected_unit = el_unit;
    $selected_moves = $selected_unit.data('movement');
    var $selected_x = $selected_unit.data('x_pos');
    var $selected_y = $selected_unit.data('y_pos');
//    debugger;
    $allHexagons.attr('class', 'unSelected');
    $initialRange.attr('class', 'selectedRange');

//    updateSelectedRange($selected_x, $selected_y);

    registerHoverUnit();
    pregameRegisterMovableHexs();
}
function pregameRegisterMovableHexs() {

    $movableArea = $initialRange.add($selected_range);
    $allHexagons = $('polygon');

    $movableArea.off('click');
    $initialRange.off('click');

    $allHexagons.attr("class", "unSelected");
    $movableArea.attr("class", "selectedRange");

    $movableArea.on('click', function () {
        var $Hexagon = $(this);
        var $Hexagon_x = $Hexagon.data('x-pos');
        var $Hexagon_y = $Hexagon.data('y-pos');
        var $Hexagon_size = $Hexagon.data('size');

//      If new unit, it undergoes a class change
        if ($selected_unit.hasClass('newUnit')) {
            $selected_unit.prependTo(".map");
            $selected_unit.attr('class', 'inPlayUnit')
        }
        if ( $(".auxSpace").children().length == 0) {
            $('.startGameButton').css('visibility', 'visible');
        }

//      Updating the $movingPiece's coordinates.
        $selected_unit.data('x_pos', $Hexagon_x);
        $selected_unit.data('y_pos', $Hexagon_y);
        $selected_unit.data('row_size', $Hexagon_size);

//      Moving the $movingPiece to it's new position
        moveUnit($Hexagon_x, $Hexagon_y, $Hexagon_size);
    });
}


function changeClassOfHexagonInRange(unit_moves, unit_x, unit_y, unit_class, click) {
    var row;
    var initialSizeUp;
    var initialSizeDown;
    var finalSizeUp;
    var finalSizeDown;
    var constantUp;
    var constantDown;

    var horizontal = 1;
    var vertical = 1;


    while (horizontal <= unit_moves) {
        constantUp = 0;
        constantDown = 0;
        vertical = 1;
        initialSizeDown = findHex(unit_x, unit_y).data('size');
        initialSizeUp = findHex(unit_x, unit_y).data('size');

        hexClassChange((unit_x - horizontal), (unit_y), unit_class, horizontal, click);
        hexClassChange((unit_x + horizontal), (unit_y), unit_class, horizontal, click);

        while (horizontal >= vertical) {

            finalSizeDown = findHex(unit_x, unit_y + vertical).data('size');
            finalSizeUp = findHex(unit_x, unit_y - vertical).data('size');

            if (initialSizeDown < finalSizeDown) {
                constantDown = constantDown + 1
            }
            if (initialSizeUp < finalSizeUp) {
                constantUp = constantUp + 1
            }

            if (horizontal <= vertical) {
                row = 0;
                while (row <= horizontal) {
                    hexClassChange((unit_x - (horizontal + row - vertical - constantDown)), (unit_y + vertical), unit_class, horizontal, click);
                    hexClassChange((unit_x - (horizontal + row - vertical - constantUp)), (unit_y - vertical), unit_class, horizontal, click);
                    row = row + 1
                }
            } else {
                hexClassChange((unit_x - (horizontal - constantDown)), (unit_y + vertical), unit_class, horizontal, click);
                hexClassChange((unit_x - (horizontal - constantUp)), (unit_y - vertical), unit_class, horizontal, click);

                hexClassChange((unit_x + (horizontal + constantDown - vertical)), (unit_y + vertical), unit_class, horizontal, click);
                hexClassChange((unit_x + (horizontal + constantUp - vertical)), (unit_y - vertical), unit_class, horizontal, click);
                initialSizeDown = finalSizeDown;
                initialSizeUp = finalSizeUp;
            }
            vertical = vertical + 1;
        }
        horizontal = horizontal + 1;
    }
}
function updateSelectedRange(xPos, yPos) {
    changeClassOfHexagonInRange($selected_moves, xPos, yPos, 'testRange', false);
    $selected_range = $('polygon.testRange');
    changeClassOfHexagonInRange($selected_moves, xPos, yPos, 'selectedRange', false);
}
function hexClassChange(xPos, yPos, className, horizontal, click) {

    if (!click) {
        $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]").attr('class', className);
    } else {
        $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]").delay(30 * horizontal).queue(function (next) {
            $(this).fadeOut().attr('class', className).fadeIn();
            next();
        });
    }
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
function findHex(x_pos, y_pos) {
    return $("polygon[data-x-pos=" + x_pos + "][data-y-pos=" + y_pos + "]");
}


$(document).ready(function () {
//  Hexagon selectors
//  $selected_range just need an initial selector
    $selected_range = $("polygon.selected_range");
    $initialRange = $('.selectedRange');
    $allHexagons = $('polygon');

    pregame_var = true;

    $selected_unit = 0;
    $moveable_units = $('*[data-team=' + 1 + '], *[data-team=' + 0 + ']');

    pregame();
//    registerHoverUnit();
    console.log("hello this is fast");

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