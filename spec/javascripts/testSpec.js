//
//describe("A suite", function() {
//    it("contains spec with an expectation", function() {
//        expect(true).toBe(true);
//    });
//});
//
//describe("A suite", function() {
//    it("contains spec with an expectation", function() {
//        expect(true).toBe(true);
//    });
//});
//
//describe("A suite", function() {
//    it("contains spec with an expectation", function() {
//        expect(true).toBe(true);
//    });
//});

// load correct page
// rabble = (data-index == 12)
//  hex = (#hex55)

// click rabble
// click hex

// expect
//rabble.parent == fjwepijf

describe("Click Unit", function () {
    beforeEach(function (done) {


        loadFixtures('game.html');
        var map = create_map();
        var user = { name: 'Jaco', surname: 'Pretorius', thearray: map };

        var templateFunction = JST['views/map'];
        var result = templateFunction(user);

        var allUnits = createAllUnits();
        var hash = { units: allUnits, name: 'Alex'};
        var createUnits = JST['views/units'];
        var units = createUnits(hash);


        loadMapAndUnits(units, result);
//        debugger;

//        setTimeout(function() {
//            $movingRange = $("polygon.selected_range");
//            var $initialRange = $('.selectedRange');
//            $initialRange = $('[data-innRange = true]');

//            $allHexagons = $('polygon');
        $allSquares = $('.ssquare');

//            console.log($('[data-index=25 ]').children('svg'));

//            $('.loadEnemiesButton').on('click', function () {
//                placeEnemies()
//            });
//            $('.randomSetUpButton').on('click', function () {
//                placeUnits();
////            $('.randomSetUpButton').off('click')
//            });
        var $movingRange = $("[data-innrange=true]");
        pregame();

//        }, 100);

        done()
    });
    it("Then place it", function () {
        expect(true).toBe(true);

        expect($(".auxSpace")).toExist();
        console.log($(".auxSpace").children());
//        debugger;
//        done();
//        setTimeout(function() {

        var rabbleImage = $('[data-index=3]');
        var rabble = $('#aux3');
        var hex = $('#hex55');

        expect(rabbleImage.parent().attr("class")).toEqual("sssquare");

//        pregameClickUnit();

//        debugger;
//        rabble.click(function(){
//            hex.click(function(){
//                expect(rabble.parent().attr("class")).toEqual("ssquare");
//
//            });
//
//        });
        $movingRange = $("[data-innrange=true]");
        var $initialRange = $movingRange;

        pregameClickUnit();

        rabble.click();

        debugger;

        hex.off('click');

        $movingRange.on('click', function () {


            var $Hexagon = $(this);

            xPos = 4;
            yPos = 7;
            moveImageToMap($selectedUnit);
            if ($(".auxSpace").children().length == 0) {
                $('.startGameButton').css('visibility', 'visible');
            }

//            $enemyUnitsInRange.off('click');
//            moveUnitToNewPosition($selectedUnit, $(this).attr('data-xPosss'), $(this).attr('data-yPosss'), $Hexagon.data('size'), $selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));

            var hexMovingTo = $("[data-xPosss=" + xPos + "][data-yPosss=" + yPos + "]");

            if (pregame_var == true) {
                $selectedUnit.prependTo(hexMovingTo);

            } else {
                $selectedUnit.children('img').prependTo(hexMovingTo);
            }
            hexMovingTo.attr('data-occupied', true);
            hexMovingTo.attr('data-team', $selectedUnit.data('team'));
            hexMovingTo.attr('data-off', $selectedUnit.data('strength'));
            hexMovingTo.attr('data-movement', $selectedUnit.data('movement'));
            hexMovingTo.attr('data-src', $selectedUnit.attr('src'));
            hexMovingTo.attr('data-range', $selectedUnit.data('range'));

            $('polygon').attr('class', 'unSelected');
            if (pregame_var == true) {
                $initialRange.children("svg").children("polygon").attr('class', 'selectedRange')
            }
            $moveableUnits.off('click');
            $movingRange.off('click');

//            debugger;

            if (pregame_var == true) {
//                functionsForPregame();
            }

        });

        hex.click();

//        debugger;
        expect(rabbleImage.parent().attr("class")).toEqual("ssquare");


//        debugger;


//        hex.click();

        expect(rabble).toExist();

//        }, 1000);
    })
});