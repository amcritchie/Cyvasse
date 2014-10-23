var offense;
var defense;
var $player1name = "Alex";
var $player0name = "Tyrion";

//Units that can be hovered/clicked
var $moveableUnits;
var $enemyUnits;
var $enemyUnitsInRange;
//Selected Unit Global Variables
var $selectedUnit;
var $movingRange;
var $movingRangeView;
var $movinfRangeVieww;
var $attackRange;
var $allHexagons;
var $allSquares;
var $initialRange;

//Initializing the Hexagon Selectors
var pregame_var;

//  Functions.
function pregame() {
//    functionsForOffense();
    functionsForPregame();
    $('.startGameButton').on('click', function () { startGame() })
}

function startGame() {
    pregame_var = false;
    $('.randomSetUpButton').hide();
    addAIButtons();
    whoGoesFirst();
    turn()
}

function addAIButtons() {
    $('.startGameButton').hide();
    $('.moveUnitButton').css('visibility', 'visible');
    $('.fiveTurnsButton').css('visibility', 'visible');
    $('.tenTurnsButton').css('visibility', 'visible');
}
function whoGoesFirst() {
    offense = 1;
    defense = Math.abs(offense - 1);
}

function turn() {
    initializeTurn();
    refreshAIButtons();
    functionsForOffense();
}

function initializeTurn(){
    $allHexagons.attr('class', 'unSelected');
    $allSquares.children("svg").children("polygon").attr('class', 'unSelected');
//    $('img').attr('data-inRange', false);
    $moveableUnits.off('click');
//    $moveableUnits = $('.inPlayUnit*[data-team=' + offense + ']');
//    $enemyUnits = $('*[data-team=' + defense + ']');
    $moveableUnits = $('.ssquare*[data-team=' + offense + ']');
    $enemyUnits = $('.ssquare*[data-team=' + defense + ']');
}
function refreshAIButtons() {
    $('.moveUnitButton').off('click');
    $('.fiveTurnsButton').off('click');
    $('.tenTurnsButton').off('click');
    $('.moveUnitButton').on('click', function () {
        runTurns(1)
    });
    $('.fiveTurnsButton').on('click', function () {
        runTurns(5)
    });
    $('.tenTurnsButton').on('click', function () {
        runTurns(10)
    });
}
function runTurns(howMany) {
    for (var i = 0; i < howMany; i++) {
        setTimeout(function () {
            runATurn();
        }, 1000 * i);
    }
}

function functionsForOffense() {
    $moveableUnits.off('mouseenter');
    $moveableUnits.off('mouseleave');
    $moveableUnits.off('click');
    registerHoverUnit();
    registerClickUnit()
}

function functionsForPregame(){
    $moveableUnits.off('mouseenter');
    $moveableUnits.off('mouseleave');
    $moveableUnits.off('click');
    $moveableUnits = $('div[data-team=' + 1 + '], div[data-team=' + 0 + ']');

    registerHoverUnit();
//    registerClickUnit();
    pregameClickUnit();
}
function pregameClickUnit(){
    $moveableUnits.on('click', function () {

        $selectedUnit = $(this).children("img");

        $movingRange.on('click', function () {

            var $Hexagon = $(this);

            moveImageToMap($selectedUnit);
            if ($(".auxSpace").children().length == 0) {
                $('.startGameButton').css('visibility', 'visible');
            }

            $enemyUnitsInRange.off('click');
            moveUnitToNewPosition($selectedUnit, $(this).attr('data-xPosss'), $(this).attr('data-yPosss'), $Hexagon.data('size'), $selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));

        });
    })
}
function moveImageToMap(unit) {
    if (unit.hasClass('newUnit')) {
        unit.prependTo(".map");
        unit.attr('class', 'inPlayUnit')
    }
}


function registerHoverUnit() {
    $moveableUnits.on({
        mouseenter: function () {
            updateInfoBox($(this));
        },
        mouseleave: function () {
        }
    });
}
function updateInfoBox(unit) {

    $('#selectedUnitName').empty().append(unit.children("img").attr('alt'));

//    if (pregame_var == true) {
        $('#selectedUnitImage').attr('src', "../assets/svgs/" + unit.children("img").attr('id') + ".svg");
        $('#selectedStrength').empty().append('Strength: ' + unit.children("img").data('strength'));
        $('#selectedMovement').empty().append('Movement: ' + unit.children("img").data('movement'));
        $('#selectedRange').empty().append('Range: ' + unit.children("img").data('range'));
        $('#selectedFlank').empty().append('Flank: ' + unit.children("img").data('flank'));
        $('#selectedTrump').empty().append('Trump: ' + unit.children("img").data('trump'));
//    }else{
//        $('#selectedUnitImage').attr('src', unit.data('src'));
//        $('#selectedStrength').empty().append('Strength: ' + unit.attr('data-off'));
//        $('#selectedMovement').empty().append('Movement: ' + unit.attr('data-movement'));
//        $('#selectedRange').empty().append('Range: ' + unit.attr('data-range'));
//        $('#selectedFlank').empty().append('Flank: ' + unit.attr('data-flank'));
//        $('#selectedTrump').empty().append('Trump: ' + unit.attr('data-trump'));
//    }

}

function registerClickUnit() {
    $moveableUnits.on('click', function () {
//        $movingRange.off('click');
//        $enemyUnitsInRange.off('click');
        selectUnit($(this));
    })
}
function selectUnit(el_unit) {
    $selectedUnit = el_unit;
//    $enemyUnitsInRange.off('click');
    console.log($selectedUnit);
    updateUnitRanges($selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));
}


function updateUnitRanges(xPos, yPos) {
    $('img').attr('data-inRange', false);
//    if (pregame_var == true) {
        $('.ssquare').attr('data-innRange', false);
//    }

    updateMovementRange(parseInt($selectedUnit.attr('data-xPosss')), parseInt($selectedUnit.attr('data-yPosss')));

    updateEnemyInRange(parseInt($selectedUnit.attr('data-xPosss')), parseInt($selectedUnit.attr('data-yPosss')));
    refreshHexagonClasses();
    registerMovableArea();
}
function updateMovementRange(xPos, yPos) {

    $movingRangeView = createRangeSelector($selectedUnit.data('movement'), xPos, yPos);

    if (pregame_var == true){
        $movingRangeVieww = $movingRange
    } else {
        $movingRangeVieww = $('[data-innRange = true]');
    }

//    $movingRangeVieww.off('click');
    console.log($movingRangeView);
    console.log("--------===--------");
    console.log($movingRangeVieww);

    $movingRange = $movingRangeVieww.filter(function () {
        return $(this).data('occupied') == false
    });
    console.log($movingRange);



}
function updateEnemyInRange(xPos, yPos) {
    $attackRange = createRangeSelector(parseInt($selectedUnit.data('range')), xPos, yPos);
    var $inRange = $('.inPlayUnit*[data-inRange=' + true + ']');
    var $inRangee = $('[data-innRange = true][data-team = ' + defense + ']');
    $enemyUnitsInRange = $inRangee.filter(function () {
//        debugger;
        return $(this).attr('data-off') <= $selectedUnit.attr('data-off')
    });
}
function createRangeSelector(range, xPos, yPos){
    $allHexagons.attr('class', 'unSelected');
//    console.log($allHexagons);
    changeClassOfHexagonInRange(range, xPos, yPos, 'testRange', false);
    return $('polygon.testRange');
}

function refreshHexagonClasses() {
    $allHexagons.attr('class', 'unSelected');
    $attackRange.attr('class', 'hoverRange');
    $movingRangeView.attr('class', 'selectedRange');
//    $movinfRangeVieww.attr('class')
}

function registerMovableArea() {
    registerPregameArea();

//    NEW
//    $movingRange.off('click');


    registerMovableHex();
    if (pregame_var == false) {
        registerAttackUnit()
    }
}

function registerPregameArea() {
    if (pregame_var == true) {
        $allHexagons.attr('class', 'unSelected');

//        $initialRange.attr('class', 'selectedRange');
        $initialRange.children("svg").children("polygon").attr('class', 'selectedRange');


        $movingRange = $initialRange;

    }
}

function registerMovableHex() {


    $movingRange.on('click', function () {
        console.log($(this));
        var $Hexagon = $(this);

        moveImageToMap($selectedUnit);
        if ($(".auxSpace").children().length == 0) {
            $('.startGameButton').css('visibility', 'visible');
        }


        $enemyUnitsInRange.off('click');

        console.log($(this));
//        debugger;
        console.log( $Hexagon.data('xPosss'));
//        moveUnitToNewPosition($selectedUnit, $Hexagon.data('x-pos'), $Hexagon.data('y-pos'), $Hexagon.data('size'), $selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));
        moveUnitToNewPosition($selectedUnit, $(this).attr('data-xPosss'), $(this).attr('data-yPosss'), $Hexagon.data('size'), $selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));

    });
}

function registerAttackUnit() {
    $enemyUnitsInRange.on('click', function () {
        moveUnitToGraveyard($(this).children("img"));
        if ($selectedUnit.data('range') == 0) {
//            moveUnitToNewPosition($selectedUnit, $(this).data('x_pos'), $(this).data('y_pos'), $(this).data('row_size'), $selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));
            moveUnitToNewPosition($selectedUnit, $(this).attr('data-xPosss'), $(this).attr('data-yPosss'), $(this).data('row_size'), $selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));

        } else {
            $allHexagons.attr('class', 'unSelected');
            $moveableUnits.off('click');
            $movingRange.off();
            defense = offense;
            offense = Math.abs(offense - 1);
            turn();
        }
        $enemyUnitsInRange.off('click');
        $selectedUnit = 0;
    })
}
function moveUnitToGraveyard(deadUnit) {
    deadUnit.css('margin-top', 0);
    deadUnit.css('margin-left', 0);
    deadUnit.attr('class', 'deadUnit');
    deadUnit.prependTo(".graveyard");
}

function moveUnitToNewPosition(movingUnit, xPos, yPos, hexRowSize, xPosOld, yPosOld) {

    var hexMovingTo = $("[data-xPosss=" + xPos + "][data-yPosss=" + yPos + "]");

    if (pregame_var == true){
        movingUnit.prependTo(hexMovingTo);

    }else{
        movingUnit.children('img').prependTo(hexMovingTo);
    }
    hexMovingTo.attr('data-occupied', true);
    hexMovingTo.attr('data-team', movingUnit.data('team'));
    hexMovingTo.attr('data-off', movingUnit.data('strength'));
    hexMovingTo.attr('data-movement', movingUnit.data('movement'));
    hexMovingTo.attr('data-src', movingUnit.attr('src'));
    hexMovingTo.attr('data-range', movingUnit.data('range'));

    updateMetaData(movingUnit, xPos, yPos, xPosOld, yPosOld, hexRowSize);
    $allHexagons.attr('class', 'unSelected');
    if (pregame_var == true) {
        $initialRange.children("svg").children("polygon").attr('class', 'selectedRange')
    }
    $moveableUnits.off('click');
    $movingRange.off('click');

    if (pregame_var == true) {

        functionsForPregame();
    } else {
        defense = offense;
        offense = Math.abs(offense - 1);
        turn();
    }
}
function updateMetaData(movingUnit, xPos, yPos, xPosOld, yPosOld, hexRowSize){
    var $hexOld = findHex(xPosOld, yPosOld);
    $hexOld.attr('data-occupied', false);
    updateUnitMetaData(movingUnit, xPos, yPos, hexRowSize);
    var $hex = findHex(xPos, yPos);
    $hex.attr('data-occupied', true);
}
function updateUnitMetaData(movingUnit, xPos, yPos, hexRowSize) {
    movingUnit.attr('data-x_pos', xPos);
    movingUnit.attr('data-y_pos', yPos);
    movingUnit.data('y_pos', yPos);
    movingUnit.data('x_pos', xPos);
    movingUnit.data('row_size', hexRowSize);
//    This Screws with the positioning(place dragon on y=9 x=2, and load.
//    movingUnit.attr('data-rowSize', hexRowSize);

}

//------Range hex------
function changeClassOfHexagonInRange(unit_moves, unit_x, unit_y, newHexClass, flash) {
    var horizontal = 1;
    while (horizontal <= unit_moves) {
        changeClassOfHexCircumference(unit_x, unit_y, horizontal, newHexClass, flash);
        horizontal += 1;
    }
}
function changeClassOfHexCircumference(unit_x, unit_y, horizontal, newHexClass, click) {

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
function findHex(xPos, yPos) {
    return $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]");
}
function changeVerticalHexagons(unit_x, unit_y, vertical, up, horizontal, constant, newHexClass, click) {
    if (horizontal <= vertical) {
        verticalHexChange(unit_x, unit_y, horizontal, vertical, constant, up, newHexClass, click)
    } else {
        diagonalHexChange(unit_x, unit_y, vertical, up, horizontal, constant, newHexClass, click);
    }
}
function verticalHexChange(unit_x, unit_y, horizontal, vertical, constant, up, newHexClass, click) {
    var row = 0;
    while (row <= horizontal) {
        hexClassChange((unit_x - (horizontal + row - vertical - constant)), (unit_y + up), newHexClass, horizontal, click);
        row += 1;
    }
}
function diagonalHexChange(unit_x, unit_y, vertical, up, horizontal, constantDown, newHexClass, click) {
    hexClassChange((unit_x - (horizontal - constantDown)), (unit_y + up), 'testRange', horizontal, click);
    hexClassChange((unit_x + (horizontal + constantDown - vertical)), (unit_y + up), newHexClass, horizontal, click);
}
function hexClassChange(xPos, yPos, className, horizontal, click) {

    $('*[data-x_pos=' + xPos + '][data-y_pos=' + yPos + '][data-team=' + defense + ']').attr('data-inRange', true);

    $('*[data-xPosss=' + xPos + '][data-yPosss=' + yPos + ']').attr('data-innRange', true);
    if (!click) {

        $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]").attr('class', className);
    } else {
        $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]").delay(30 * horizontal).queue(function (next) {
            $(this).fadeOut().attr('class', className).fadeIn();
        });
    }
}
//------Range hex------

function placeEnemies() {
    var array = [
        [1,1],[1,2],[1,3],[1,4],[1,5],[1,6],
        [2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],
        [3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],
        [4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],
        [5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10]
    ];
    var team = 0;
    movingGroupToMap(team,array);
    $('.loadEnemiesButton').hide()
}
function placeUnits() {
    var array = [
        [7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8],[7,9],[7,10],
        [8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8],[8,9],
        [9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8],
        [10,1],[10,2],[10,3],[10,4],[10,5],[10,6],[10,7],
        [11,1],[11,2],[11,3],[11,4],[11,5],[11,6]
    ];

    var team = 1;

    movingGroupToMap(team,array);
    $('.startGameButton').css('visibility', 'visible');

    $('.randomSetUpButton').off('click');
    $('.randomSetUpButton').on('click', function () {
        placeUnits();
    });
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function movingGroupToMap(team,array) {

    for (var i = 0; i < 20; i++) {
        var shuffledArray = shuffle(array);
        var moveLocation = shuffledArray.pop();
        array = shuffledArray;

        var hello = $("[data-index=" + (parseInt(i) + 1) + "][data-team=" + team + "]");
        moveImageToMap(hello);
        moveUnitToNewPosition(hello, moveLocation[1], moveLocation[0], 3);
    }
}

function runATurn() {
    var $unitBeingMoved = $moveableUnits.random();
    $unitBeingMoved.click();
    setTimeout(function () {
        var $hexBeingMovedTo = $movingRange.random();
        var $enemyBeingAttacked = $enemyUnitsInRange.random();
        moveUnitAI($hexBeingMovedTo, $enemyBeingAttacked);
    }, 500);
}
function moveUnitAI(movableHexagons, attackableEnemies) {
    if ($enemyUnitsInRange.length == 0) {
        movableHexagons.click();
    } else {
        attackableEnemies.click();
    }
}
$.fn.random = function () {
    return this.eq(Math.floor(Math.random() * this.length));
};

$(document).ready(function () {

//    $("#dragon").

    $attackRange = $movingRange;
    $enemyUnitsInRange = $movingRange;
//    $initialRange = $('.selectedRange');

    setTimeout(function() {
        $movingRange = $("polygon.selected_range");
        $initialRange = $('.selectedRange');
        $initialRange = $('[data-innRange = true]');

        $allHexagons = $('polygon');
        $allSquares = $('.ssquare');

        console.log($('[data-index=25 ]').children('svg'));

        $('.loadEnemiesButton').on('click', function () {
            placeEnemies()
        });
        $('.randomSetUpButton').on('click', function () {
            placeUnits();
//            $('.randomSetUpButton').off('click')
        });
        $movingRange = $("[data-innrange=true]");
        pregame();


    }, 100);

    pregame_var = true;

    $moveableUnits = $('div[data-team=' + 1 + '], div[data-team=' + 0 + ']');
    $enemyUnitsInRange = $moveableUnits;

//    pregame();


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