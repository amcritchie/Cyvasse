$(document).ready(function () {

    var pieceAtt;
    var $movingPiece;
    var $moving_x;
    var $moving_y;
    var $unit = $('.newUnit');
    var $hexagon = $('.brick');
    var $polygon = $('polygon');


    $testsize = $('#snowman').data('row_size');
    $testy = $('#snowman').data('y_pos');
    $testx = $('#snowman').data('x_pos');


//  Info on clicked hexagon
    $polygon.click(function(){
        console.log("Hex X-pos: " + $(this).data('x-pos'));
        console.log("Hex Y-pos: " + $(this).data('y-pos'));
        console.log("Size: " + $(this).data('size'));
    });


//  Selected Unit
    $unit.click(function () { $("polygon").attr('class', 'unSelected')});

    $unit.click(function () {

        $movingPiece = $(this);
        $moves = $movingPiece.data('movement');
        $moving_x = $movingPiece.data('x_pos');
        $moving_y = $movingPiece.data('y_pos');
        $("polygon").attr('class', 'unSelected');


//      Display hexagons adjacent to selected unit.
//      Left
        var horizontal = 1;
        while ( horizontal <= $moves){
            $("polygon[data-x-pos="+ ($moving_x - horizontal) +"][data-y-pos="+ ($moving_y) +"]").attr('class', 'inRange');
            horizontal = horizontal + 1;}
//      Right
        horizontal = 1;
        while ( horizontal <= $moves){
            $("polygon[data-x-pos="+ ($moving_x + horizontal) +"][data-y-pos="+ ($moving_y) +"]").attr('class', 'inRange');
            horizontal = horizontal + 1;}

//      Bottom
        var verticle = 1;
        horizontal = 1;
        var initialSize = $("polygon[data-x-pos="+$moving_x+"][data-y-pos="+$moving_y+"]").data('size');
        var finalSize;
        var constant = -1;
        while ( verticle <= $moves){
            finalSize = $("polygon[data-x-pos="+$moving_x+"][data-y-pos="+($moving_y + verticle)+"]").data('size');
            if (initialSize < finalSize) {constant = constant + 1}
            while( horizontal <= (($moves*2) - (verticle - 1))) {

                $("polygon[data-x-pos="+($moving_x - ($moves - (horizontal + constant)))+"][data-y-pos="+ ($moving_y + verticle) +"]").attr('class', 'inRange');
                horizontal = horizontal + 1;
            }
            initialSize = finalSize;
            horizontal = 1;
            verticle = verticle + 1;
        }

//      Top
        verticle = 1;
        horizontal = 1;
        initialSize = $("polygon[data-x-pos="+$moving_x+"][data-y-pos="+$moving_y+"]").data('size');
        constant = -1;
        while ( verticle <= $moves){
            finalSize = $("polygon[data-x-pos="+$moving_x+"][data-y-pos="+($moving_y - verticle)+"]").data('size');
            if (initialSize < finalSize) {constant = constant + 1}
            while( horizontal <= (($moves*2) - (verticle - 1))) {

                $("polygon[data-x-pos="+($moving_x - ($moves -(horizontal + constant)))+"][data-y-pos="+ ($moving_y - verticle) +"]").attr('class', 'inRange');
                horizontal = horizontal + 1;
            }
            initialSize = finalSize;
            horizontal = 1;
            verticle = verticle + 1;
        }


//      Displayed selected units info in the side bar.
        console.log($movingPiece.data('codename'));
        console.log($movingPiece.data('end===='));
        $('#selectedUnitName').empty().append($movingPiece.data('englishname'));
        $('#selectedUnitImage').attr('src', "../assets/pieces/" + $movingPiece.data('codename') + ".png");
        $('#selectedStrength').empty().append('Strength: ' + $movingPiece.data('strength'));
        $('#selectedMovement').empty().append('Movement: ' + $movingPiece.data('movement'));
        $('#selectedFlank').empty().append('Flank: ' + $movingPiece.data('flank'));
        $('#selectedTrump').empty().append('Trump: ' + $movingPiece.data('trump'));
        console.log($movingPiece.data('codename'));



//      Selected Piece after selecting a Unit



//      Selected Hexagon after selecting a Unit to move.
        $polygon.off().click(function(){
            var $clickedHexagon_x = $(this).data('x-pos');
            var $clickedHexagon_y = $(this).data('y-pos');
            var $clickedHexagon_size = $(this).data('size');

//          If new unit, it undergoes a class change
            if ($movingPiece.hasClass('newUnit')){
                $movingPiece.prependTo(".map");
                $movingPiece.attr('class', 'inPlayUnit')}

//          Updating the $movingPiece's coordinates.
            $movingPiece.data('x_pos', $clickedHexagon_x);
            $movingPiece.data('y_pos', $clickedHexagon_y);
            $movingPiece.data('row_size', $clickedHexagon_size);

//          Moving the $movingPiece to it's new position
            $movingPiece.css('margin-top', ($clickedHexagon_y * 52) - 52);
            $movingPiece.css('margin-left', 17 + ((11 - $clickedHexagon_size)*30) + (($clickedHexagon_x * 60.3) - 60.3));
//


//          Turn over -> Hexagons back to normal & Moving Piece is nothing.
            $("polygon").attr('class', 'unSelected');
            $movingPiece = 0;
        });
    });

    var getPieceAttributes = function() {
        var pieceJson = $.getJSON('/piece_attributes');
        pieceJson.success(function(jsonResponse){
            pieceAtt = jsonResponse;
            console.log(jsonResponse)
        });
    };
    getPieceAttributes();
});