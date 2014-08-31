$(document).ready(function () {

    var pieceAtt;

    var $unit = $('.unit');

    $('.test1').hover(
        function () {
            $(this).toggleClass('test2');
            $(this).animate({top: "-=10px"}, 'fast');
        });

    var getPieceAttributes = function() {
        var pieceJson = $.getJSON('/piece_attributes');
        pieceJson.success(function(jsonResponse){
            pieceAtt = jsonResponse;
            console.log(jsonResponse)
        });
    };

    $unit.click(function () {
        var $movingPiece = $(this);
        var $movingPieceAttributes = "rabble";
        console.log($movingPiece.data('type'));
        $('#selectedUnitName').empty().append($movingPiece.data('englishname'));
        $('#selectedUnitImage').attr('src', "../assets/pieces/" + $movingPiece.data('codename') + ".png");
        $('#selectedStrength').empty().append('Strength: ' + $movingPiece.data('strength'));
        $('#selectedMovement').empty().append('Movement: ' + $movingPiece.data('movement'));
        $('#selectedFlank').empty().append('Flank: ' + $movingPiece.data('flank'));
        $('#selectedTrump').empty().append('Trump: ' + $movingPiece.data('trump'));

        $(document).off().keydown(function (key) {
            switch (parseInt(key.which, 10)) {
                case 37:
                    $movingPiece.animate({left: "-=60px"}, 'fast');
                    break;
                case 38:
                    $movingPiece.animate({top: '-=52px'}, 'fast');
                    $movingPiece.animate({left: "-=30px"}, 'fast');
                    break;
                case 39:
                    $movingPiece.animate({left: '+=60px'}, 'fast');
                    break;
                case 40:
                    $movingPiece.animate({top: '+=52px'}, 'fast');
                    $movingPiece.animate({left: '+=30px'}, 'fast');
                    break;
            }
        });
    });



//    $('.circle').data('id')
    getPieceAttributes();
});