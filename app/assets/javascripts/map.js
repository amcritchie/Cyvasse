$(document).ready(function () {

    var $unit = $('.unit');

    $('.test1').hover(
        function () {
            $(this).toggleClass('test2');
            $(this).animate({top: "-=10px"}, 'fast');
        });



$unit.click(function () {
    var $movingPiece = $(this);

    $(document).off().keydown(function(key){
       switch(parseInt(key.which,10)){
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

//    $('.brick').click(function(){
//        $('.snowman').animate({top: "-=10px"}, 'fast');
//        $('.test1').toggleClass('selectedPiece');
//    });
});