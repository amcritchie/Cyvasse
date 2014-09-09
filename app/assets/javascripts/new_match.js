
var $all_polygons = $('polygon');
var $turn = 1;
var pregame = 1;
var $selectedUnit = 0;
var $player1name = "Alex";
var $player0name = "Tyrion";

var $initialSpace = $('.selectedRange');
var $selectedRange;



//  Functions.
//  ==display hexagons in the range of the selected unit.==

//  (6)****************************************************************
//  .delay() issues, if I do another JS function before the .queue is finished
//  it messes with the flow of movement, and sometimes there multiple flashes.
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

function findHex(x_pos, y_pos) {
    var hexagon;
    hexagon = $("polygon[data-x-pos=" + x_pos + "][data-y-pos=" + y_pos + "]");
    return hexagon;
}
function range(unit_moves, unit_x, unit_y, unit_class, click) {
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

function moveUnit($clickedPiece, $clicked_moves, hexagon){
    var $Hexagon = hexagon;
    var $Hexagon_x = $Hexagon.data('x-pos');
    var $Hexagon_y = $Hexagon.data('y-pos');
    var $Hexagon_size = $Hexagon.data('size');

//      If new unit, it undergoes a class change
    if ($clickedPiece.hasClass('newUnit')) {
        $clickedPiece.prependTo(".map");
        $clickedPiece.attr('class', 'inPlayUnit')
    }

//      Updating the $movingPiece's coordinates.
    $clickedPiece.data('x_pos', $Hexagon_x);
    $clickedPiece.data('y_pos', $Hexagon_y);
    $clickedPiece.data('row_size', $Hexagon_size);

//      Moving the $movingPiece to it's new position
    $clickedPiece.css('margin-top', ($Hexagon_y * 52) - 52);
    $clickedPiece.css('margin-left', 17 + ((11 - $Hexagon_size) * 30) + (($Hexagon_x * 60) - 60));
    $all_polygons.attr('class', 'unSelected');
}

//  (8)****************************************************************
//  Once a player completes an action, e.g. moves or attacks, the turn
//  variable should be changed, signifying the next players turn.
function registerMovableHexs($clickedPiece, $clicked_moves) {

    var $movableArea = $('*.selectedRange').off('click');

    $movableArea.attr("class", "unSelected");
    $movableArea.on('click', function () {

        var $Hexagon = $(this);
        var $Hexagon_x = $Hexagon.data('x-pos');
        var $Hexagon_y = $Hexagon.data('y-pos');
        var $Hexagon_size = $Hexagon.data('size');

//      If new unit, it undergoes a class change
        if ($clickedPiece.hasClass('newUnit')) {
            $clickedPiece.prependTo(".map");
            $clickedPiece.attr('class', 'inPlayUnit')
        }

//      Updating the $movingPiece's coordinates.
        $clickedPiece.data('x_pos', $Hexagon_x);
        $clickedPiece.data('y_pos', $Hexagon_y);
        $clickedPiece.data('row_size', $Hexagon_size);

//      Moving the $movingPiece to it's new position
        $clickedPiece.css('margin-top', ($Hexagon_y * 52) - 52);
        $clickedPiece.css('margin-left', 17 + ((11 - $Hexagon_size) * 30) + (($Hexagon_x * 60) - 60));
        $all_polygons.attr('class', 'unSelected');


//      Turn over -> Hexagons back to normal & Moving Piece is nothing.
        if ($turn == 1) {
            $turnKeeper.empty().append('Turn : ' + $player0name);
            $turn = 0;
        } else {
            $turnKeeper.empty().append('Turn : ' + $player1name);
            $turn = 1
        }


        $unit = $('*[data-team=' + Math.abs($turn - 1) + ']');
        $enemyUnit = $('*[data-team=' + Math.abs($turn) + ']');

        console.log("Change Turns");
        console.log("$unit : " + $unit);

        $all_polygons.attr('class', 'unSelected');

        $initialSpace.attr('class', 'selectedRange');
        range($clicked_moves, $Hexagon_x, $Hexagon_y, 'hoverRange', false);
        $all_polygons.attr('class', 'unSelected');
        $initialSpace.attr('class', 'selectedRange');
//        $selectedRange.attr('class', 'selectedRange');
        $clickedPiece = 0;
        $selectedRange = 0;
    });
}

function hoverOverUnit(el_unit) {

    var $hoverPiece = el_unit;
    var $hovering_moves = $hoverPiece.data('movement');
    var $hovering_x = $hoverPiece.data('x_pos');
    var $hovering_y = $hoverPiece.data('y_pos');

    range($hovering_moves, $hovering_x, $hovering_y, 'hoverRange', true);

    $('#selectedUnitName').empty().append($hoverPiece.data('englishname'));
    $('#selectedUnitImage').attr('src', "../assets/pieces/" + $hoverPiece.data('codename') + ".png");
    $('#selectedStrength').empty().append('Strength: ' + $hoverPiece.data('strength'));
    $('#selectedMovement').empty().append('Movement: ' + $hoverPiece.data('movement'));
    $('#selectedFlank').empty().append('Flank: ' + $hoverPiece.data('flank'));
    $('#selectedTrump').empty().append('Trump: ' + $hoverPiece.data('trump'));

}

function selectedUnit(el_unit) {
    $all_polygons.attr('class', 'unSelected');

    var $clickedPiece = el_unit;
    var $clicked_moves = $clickedPiece.data('movement');
    var $clicked_x = $clickedPiece.data('x_pos');
    var $clicked_y = $clickedPiece.data('y_pos');

    range($clicked_moves, $clicked_x, $clicked_y, 'selectedRange', false);
    var $selectedRange = $('.selectedRange');


    $all_polygons.attr('class', 'unSelected');
    $selectedRange.attr('class', 'selectedRange');
    console.log("This is where it starts1.");
//    registerMovableHexs($clickedPiece, $clicked_moves);
    $all_polygons.attr('class', 'unSelected');
    return [$clickedPiece, $clicked_moves]
}

$(document).ready(function () {

//    Json
    var pieceAtt;

//    Unit Stats
    var $movableArea;
    var $initialSpace = $('.selectedRange');
    var $unit = $('*[data-team=' + Math.abs($turn - 1) + '], *[data-team=' + Math.abs($turn) + ']');
    var $allyUnit = $('*[data-team=' + Math.abs($turn - 1) + ']');
    var $enemyUnit = $('*[data-team=' + Math.abs($turn) + ']');


//    (4)****************************************************************
//    Hovering over Unit, Should be able to hover over all units, but only select there Units
    $unit.on({
        mouseenter: function () {
            hoverOverUnit($(this));
            $(this).click(function () {
                $selectedUnit = selectedUnit($(this));
//                registerMovableHexs($selectedUnit[0], $selectedUnit[1])
            });
        },
        mouseleave: function () {
            $all_polygons.attr('class', 'unSelected');
            $initialSpace.attr('class', 'selectedRange');
            $selectedRange.attr('class', 'selectedRange');
        }
    });

//    ****************************************************************
//    Not Selecting ALL Polygons, but preferably can only click polys with class='inRange', and not hex containing your team or a stronger unit.
    $("polygon").on('click', function(){
        console.log('Start --->' + $(this).attr('class'));
        if ($selectedUnit == 0){
            console.log("unselected")
        }else if ($(this).attr('class') == "unSelected"){
            console.log($(this));
            moveUnit($selectedUnit[0], $selectedUnit[1], $(this))
        }else {
            console.log("last chance.")
        }
    });

//    ****************************************************************
//    Clicking on the Enemy with the attention of attacking, can only happen if unit is selected, enemy is on a hex class=inRange, and it has greater power.
    $enemyUnit.click(function () {

        var $defender = $(this);
        var $defender_x = $defender.data('x_pos');
        var $defender_y = $defender.data('y_pos');
        var $defender_size = $defender.data('size');


        if ($clickedPiece.data('strength') >= $defender.data('strength')) {

            $clickedPiece.data('x_pos', $defender_x);
            $clickedPiece.data('y_pos', $defender_y);
            $clickedPiece.data('row_size', $defender_size);

            $clickedPiece.css('margin-top', ($defender_y * 52) - 52);
            $clickedPiece.css('margin-left', 17 + ((11 - $defender_size) * 30) + (($defender_x * 60) - 60));

//      Turn over -> Hexagons back to normal & Moving Piece is nothing.
//            if ($turn == 1) {
//                $turnKeeper.empty().append('Turn : ' + $player0name);
//                $turn = 0;
//            } else {
//                $turnKeeper.empty().append('Turn : ' + $player1name);
//                $turn = 1
//            }
//            $unit = $('*[data-team=' + Math.abs($turn - 1) + ']');
//            $enemyUnit = $('*[data-team=' + Math.abs($turn) + ']');
        }

    });


//  var getAttributes = function (){};
    var getPieceAttributes = function () {
        var pieceJson = $.getJSON('/piece_attributes');
        pieceJson.success(function (jsonResponse) {
            pieceAtt = jsonResponse;
            console.log(jsonResponse)
        });
    };
    getPieceAttributes();
    registerMovableHexs();
});