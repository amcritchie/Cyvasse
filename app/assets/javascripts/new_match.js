$(document).ready(function () {

    var pieceAtt;
    var $movingPiece;
    var $moving_x;
    var $moving_y;

    var $hoverPiece;
    var $hovering_x;
    var $hovering_y;
    var $hovering_moves;
    var $clickedPiece;
    var $clicked_moves;
    var $clicked_x;
    var $clicked_y;

    var $unit;
    var $allyUnit;
    var $enemyUnit;

    var $defender = $('.inPlayUnit');
    var $hexagon = $('.brick');
    var $polygon = $('polygon');
    var $all_polygons = $('polygon');
    var $initialSpace = $('.selectedRange');
    var $selectedRange;
//    var $movableArea = $('*.selectedRange');
    var $movableArea;
    var $range;
    var $defenderr;
    var $defender_x;
    var $defender_y;
    var $defender_size;
    var $Hexagon;
    var $Hexagon_x;
    var $Hexagon_y;
    var $Hexagon_size;

    var pregame = 1;


    var $turnKeeper = $('.turnKeeper');
    var $turn = $turnKeeper.data('turn');
    var $player1name = "Alex";
    var $player0name = "Tyrion";

    $unit = $('*[data-team=' + Math.abs($turn - 1) + '], *[data-team=' + Math.abs($turn) + ']');
    $allyUnit = $('*[data-team=' + Math.abs($turn - 1) + ']');
    $enemyUnit = $('*[data-team=' + Math.abs($turn) + ']');


//    Functions.

    var newRange;
    var row;
    var initialSizeUp;
    var initialSizeDown;
    var finalSizeUp;
    var finalSizeDown;
    var constantUp;
    var constantDown;

    function hexClassChange(xPos, yPos, className, horizontal){
        $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]").delay(100 * horizontal).fadeOut().queue(function (next) {
        $(this).attr('class', className).fadeIn();
        next();
    });
    }

    function hexClassChangeTest(xPos, yPos, className, horizontal){
        $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]").delay(100 * horizontal).fadeOut().queue(function (next) {
            $(this).attr('class', className).fadeIn();
            next();
        });
    }


    function findHex(x_pos, y_pos) {
        var hexagon;
        hexagon = $("polygon[data-x-pos=" + x_pos + "][data-y-pos=" + y_pos + "]");
        return hexagon;
    }

    //      ==Display hexagons adjacent to selected unit.==

    newRange = function (unit_moves, unit_x, unit_y, unit_class) {
        var horizontal = 1;
        var vertical = 1;
        console.log("THEStartTHEEND");


//        initialSizeDown = findHex(unit_x, unit_y).data('size');
//        initialSizeUp = findHex(unit_x, unit_y).data('size');

        while (horizontal <= unit_moves) {
            constantUp = 0;
            constantDown = 0;
            vertical = 1;
            initialSizeDown = findHex(unit_x, unit_y).data('size');
            initialSizeUp = findHex(unit_x, unit_y).data('size');



            hexClassChange((unit_x - horizontal), (unit_y), unit_class, horizontal);

            while (horizontal >= vertical) {

                finalSizeDown = findHex(unit_x, unit_y + vertical).data('size');
                finalSizeUp = findHex(unit_x, unit_y - vertical).data('size');

                if (initialSizeDown < finalSizeDown) { constantDown = constantDown + 1}
                console.log("Start -=-=--=-=-=--");
                console.log(constantDown);
                console.log("Horiz : " + horizontal);
                console.log("Vert : " + vertical);
                console.log("Initial Size : " + initialSizeDown);
                console.log("Final Size : " + finalSizeDown);
                console.log("-=-=--=-=-=--");
                if (initialSizeUp < finalSizeUp) { constantUp = constantUp + 1}

                if (horizontal <= vertical) {
                    row = 0;
                    while (row <= horizontal) {
                        hexClassChange((unit_x - (horizontal + row - vertical - constantDown)), (unit_y + vertical), unit_class, horizontal);
                        hexClassChange((unit_x - (horizontal + row - vertical - constantUp)), (unit_y - vertical), unit_class, horizontal);
                        row = row + 1
                    }
                } else {
                    hexClassChangeTest((unit_x - (horizontal - constantDown)), (unit_y + vertical), unit_class, horizontal);
                    hexClassChangeTest((unit_x - (horizontal - constantUp)), (unit_y - vertical), unit_class, horizontal);
                    initialSizeDown = finalSizeDown;
                    initialSizeUp = finalSizeUp;
                }
                vertical = vertical + 1;
            }
            horizontal = horizontal + 1;
        }
        console.log("THEENDTHEEND");
//      =========Right=========
//        horizontal = 1;
//        while (horizontal <= unit_moves) {
//            $("polygon[data-x-pos=" + (unit_x + horizontal) + "][data-y-pos=" + (unit_y) + "]").delay(60 * horizontal).queue(function (next) {
//                $(this).attr('class', unit_class);
//                next();
//            });
//            horizontal = horizontal + 1;
//        }
    };

    $unit.click(function () {

        $hoverPiece = $(this);
        $hovering_moves = $hoverPiece.data('movement');
        $hovering_x = $hoverPiece.data('x_pos');
        $hovering_y = $hoverPiece.data('y_pos');

//      Displayed selected units info in the side bar.
        $('#selectedUnitName').empty().append($hoverPiece.data('englishname'));
        $('#selectedUnitImage').attr('src', "../assets/pieces/" + $hoverPiece.data('codename') + ".png");
        $('#selectedStrength').empty().append('Strength: ' + $hoverPiece.data('strength'));
        $('#selectedMovement').empty().append('Movement: ' + $hoverPiece.data('movement'));
        $('#selectedFlank').empty().append('Flank: ' + $hoverPiece.data('flank'));
        $('#selectedTrump').empty().append('Trump: ' + $hoverPiece.data('trump'));

        newRange($hovering_moves, $hovering_x, $hovering_y, 'hoverRange');


        $(this).click(function () {
            $all_polygons.attr('class', 'unSelected');

            $clickedPiece = $(this);
            $clicked_moves = $clickedPiece.data('movement');
            $clicked_x = $clickedPiece.data('x_pos');
            $clicked_y = $clickedPiece.data('y_pos');
            newRange($clicked_moves, $clicked_x, $clicked_y, 'selectedRange');
            $selectedRange = $('.selectedRange');

//            $initialSpace = $('.selectedRange')

            $movableArea = 0;
            $initialSpace.attr('class', 'selectedRange');
            $selectedRange.attr('class', 'selectedRange');
            $movableArea = $('*.selectedRange');
        });

//        $hoverPiece.mouseleave(function () {
//            $all_polygons.attr('class', 'unSelected');
//
//            $initialSpace.attr('class', 'selectedRange');
//            $selectedRange.attr('class', 'selectedRange');
//        });
    });


    $enemyUnit.click(function () {

        $defenderr = $(this);
        $defender_x = $defenderr.data('x_pos');
        $defender_y = $defenderr.data('y_pos');
        $defender_size = $defenderr.data('size');


        if ($clickedPiece.data('strength') >= $defenderr.data('strength')) {

            $clickedPiece.data('x_pos', $defender_x);
            $clickedPiece.data('y_pos', $defender_y);
            $clickedPiece.data('row_size', $defender_size);

            $clickedPiece.css('margin-top', ($defender_y * 52) - 52);
            $clickedPiece.css('margin-left', 17 + ((11 - $defender_size) * 30) + (($defender_x * 60) - 60));

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
        }

    });

//    $movableArea = $('.selectedRange');
    $movableArea = $('*.selectedRange');
    $movableArea.click(function () {
        $Hexagon = $(this);
        $Hexagon_x = $Hexagon.data('x-pos');
        $Hexagon_y = $Hexagon.data('y-pos');
        $Hexagon_size = $Hexagon.data('size');

//          If new unit, it undergoes a class change

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

        $all_polygons.attr('class', 'unSelected');

        $initialSpace.attr('class', 'selectedRange');
        newRange($clicked_moves, $Hexagon_x, $Hexagon_y, 'hoverRange');

        $clickedPiece = 0;
        $selectedRange = 0;
        $movingPiece = 0;
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
});