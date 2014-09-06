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
    var $enemyUnit;

    var $defender = $('.inPlayUnit');
    var $hexagon = $('.brick');
    var $polygon = $('polygon');
    var $all_polygons = $('polygon');
    var $initialSpace = $('.selectedRange');
    var $selectedRange;
    var $movableArea = $('*.selectedRange');
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
//    $allienit = $('*[data-team=' + Math.abs($turn - 1) + ']
    $enemyUnit = $('*[data-team=' + Math.abs($turn) + ']');

    var range;
    range = function (unit_moves, unit_x, unit_y, unit_class) {

//      ==Display hexagons adjacent to selected unit.==
//      =========Left=========
        var horizontal = 1;
        while (horizontal <= unit_moves) {
            $("polygon[data-x-pos=" + (unit_x - horizontal) + "][data-y-pos=" + (unit_y) + "]").attr('class', unit_class);
            horizontal = horizontal + 1;
        }
//      =========Right=========
        horizontal = 1;
        while (horizontal <= unit_moves) {
            $("polygon[data-x-pos=" + (unit_x + horizontal) + "][data-y-pos=" + (unit_y) + "]").attr('class', unit_class);
            horizontal = horizontal + 1;
        }
//      =========Bottom=========
        var verticle = 1;
        horizontal = 1;
        var initialSize = $("polygon[data-x-pos=" + unit_x + "][data-y-pos=" + unit_y + "]").data('size');
        var finalSize;
        var constant = -1;
        while (verticle <= $hovering_moves) {
            finalSize = $("polygon[data-x-pos=" + unit_x + "][data-y-pos=" + (unit_y + verticle) + "]").data('size');
            if (initialSize < finalSize) {
                constant = constant + 1
            }
            while (horizontal <= ((unit_moves * 2) - (verticle - 1))) {

                $("polygon[data-x-pos=" + (unit_x - (unit_moves - (horizontal + constant))) + "][data-y-pos=" + (unit_y + verticle) + "]").attr('class', unit_class);
                horizontal = horizontal + 1;
            }
            initialSize = finalSize;
            horizontal = 1;
            verticle = verticle + 1;
        }
//      =========Top=========
        verticle = 1;
        horizontal = 1;
        initialSize = $("polygon[data-x-pos=" + unit_x + "][data-y-pos=" + unit_y + "]").data('size');
        constant = -1;
        while (verticle <= unit_moves) {
            finalSize = $("polygon[data-x-pos=" + unit_x + "][data-y-pos=" + (unit_y - verticle) + "]").data('size');
            if (initialSize < finalSize) {
                constant = constant + 1
            }
            while (horizontal <= ((unit_moves * 2) - (verticle - 1))) {

                $("polygon[data-x-pos=" + (unit_x - (unit_moves - (horizontal + constant))) + "][data-y-pos=" + (unit_y - verticle) + "]").attr('class', unit_class);
                horizontal = horizontal + 1;
            }
            initialSize = finalSize;
            horizontal = 1;
            verticle = verticle + 1;
        }
    };

    console.log($initialSpace);
//    console.log("==================");
//    console.log(Math.abs($turn - 1));
//    console.log($('*[data-team=' + Math.abs($turn ) + ']'));
//    console.log("==================");


    $unit.mouseover(function () {

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

        range($hovering_moves, $hovering_x, $hovering_y, 'hoverRange');

        console.log("==================");
        console.log($(this));
        console.log($(this).data('team'));
        console.log("==================");

        $(this).click(function () {
            $all_polygons.attr('class', 'unSelected');

            $clickedPiece = $(this);
            $clicked_moves = $clickedPiece.data('movement');
            $clicked_x = $clickedPiece.data('x_pos');
            $clicked_y = $clickedPiece.data('y_pos');
            range($clicked_moves, $clicked_x, $clicked_y, 'selectedRange');
            $selectedRange = $('.selectedRange');

//            $initialSpace = $('.selectedRange')

            $initialSpace.attr('class', 'selectedRange');
            $selectedRange.attr('class', 'selectedRange');
            $movableArea = $('*.selectedRange');
        });

        $hoverPiece.mouseleave(function () {
            $all_polygons.attr('class', 'unSelected');
            console.log($initialSpace);
            console.log($selectedRange);
            $initialSpace.attr('class', 'selectedRange');
            $selectedRange.attr('class', 'selectedRange');
        });
    });


    $enemyUnit.click(function () {

        $defenderr = $(this);
        $defender_x = $defenderr.data('x_pos');
        $defender_y = $defenderr.data('y_pos');
        $defender_size = $defenderr.data('size');


        if ($clickedPiece.data('strength') >= $defenderr.data('strength')){

            console.log("*******");
            console.log("win");

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
        console.log('vvvvvvvvv');
        console.log($clickedPiece.hasClass('newUnit'));
        console.log('^^^^^^^^^');

//      Updating the $movingPiece's coordinates.
        console.log($clickedPiece.data('x_pos'));
        $clickedPiece.data('x_pos', $Hexagon_x);
        $clickedPiece.data('y_pos', $Hexagon_y);
        $clickedPiece.data('row_size', $Hexagon_size);

//      Moving the $movingPiece to it's new position
        $clickedPiece.css('margin-top', ($Hexagon_y * 52) - 52);
        $clickedPiece.css('margin-left', 17 + ((11 - $Hexagon_size) * 30) + (($Hexagon_x * 60) - 60));


//

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

        $clickedPiece = 0;

        $all_polygons.attr('class', 'unSelected');
        $initialSpace.attr('class', 'selectedRange');
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