var offense;
var defense;
var $player1name = "Alex";
var $player0name = "Tyrion";

//Units that can be hovered/clicked
var $moveableUnits;
var $enemyUnits;
var $enemyUnitsInRange;
var $attackableUnits;
//Selected Unit Global Variables
var $selectedUnit;
var $selectedSpace;
var $movingRange;
var $movingRangeView;
var $movinfRangeVieww;
var $attackRange;
var $allHexagons;
//var $allSquares;
var $initialRange;

//Initializing the Hexagon Selectors
var pregame_var;

var $clickableUnitSpaces;

//  Functions.
function pregame() {
    RandomSetup.loadPregameButton();
    PreGame.loadPreGameFunctions();
}

function registerHoverUnit() {
    var $hoverableRange = $('img[data-team=1]');
    $hoverableRange.on({
        mouseenter: function () {
            updateInfoBox($(this));
        },
        mouseleave: function () {
        }
    });
}
function updateInfoBox(unit) {
    $('#selectedUnitName').empty().append(unit.attr('alt'));
    $('#selectedUnitImage').attr('src', "../images/svgs/" + unit.attr('id') + ".svg");
    $('#selectedStrength').empty().append('Strength: ' + unit.data('strength'));
    $('#selectedMovement').empty().append('Movement: ' + unit.data('movement'));
    $('#selectedRange').empty().append('Range: ' + unit.data('range'));
    $('#selectedFlank').empty().append('Flank: ' + unit.data('flank'));
    $('#selectedTrump').empty().append('Trump: ' + unit.data('trump'));
}

function moveImageToMap(unit) {
    if (unit.attr('data-status') == 'unplaced') {
        $("#aux" + unit.attr('data-index') + " ").remove();
        unit.prependTo(".map");
        unit.attr('data-status', 'alive');
    }
}
function newMoveUnitToNewPosition(newLocation, oldLocation, movingUnit) {
    var movingTo = $(newLocation);
    var movingFrom = $(oldLocation);
    movingUnit.prependTo(movingTo);
    movingTo.attr('data-occupied', true);
    movingFrom.attr('data-occupied', false);
}
//function addStartButton(movingRange) {
//    if ($(".unplacedUnitSpace").length == 0) {
//        $('.startGameButton').off('click').remove();
//        $(".map").prepend("<button class='startGameButton'>Start Game</button>");
//        $('.startGameButton').on('click', function () {
//            startGame()
//        })
//    }
//}

function startGame() {
    pregame_var = false;
    $('.startGameButton').off('click').remove();
    $('.randomSetUpButton').off('click').remove();
    $('.loadEnemiesButton').off('click').remove();
    $movingRange.off('click');
    addAIButtons();
    whoGoesFirst();
    turn()
}
function addAIButtons() {
    $(".map").prepend("<button class='moveUnitButton'>10 Turns</button>");
    $(".map").prepend("<button class='fiveTurnsButton'>5 Turns</button>");
    $(".map").prepend("<button class='tenTurnsButton'>1 Turn</button>");
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

function initializeTurn() {
    $allHexagons.attr('class', 'unSelected');
    $moveableUnits = $('img[data-team=' + offense + ']').parent();
    $enemyUnits = $('img[data-team=' + defense + ']').parent();
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

function functionsForOffense() {
    registerHoverUnit();
    Offense.xregisterClickUnit()
}


function registerClickUnit() {
    $moveableUnits.on('click', function () {
        $selectedUnit = $(this).children("img");
//        updateUnitRanges($selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));


    })
}


function updateUnitRanges(xPos, yPos) {
    $('img').attr('data-inRange', false);
//    if (pregame_var == true) {
    $('.ssquare').attr('data-innRange', false);
//    }

    var xxPos = parseInt($selectedUnit.parent().attr('data-xPosss'));
    var yyPos = parseInt($selectedUnit.parent().attr('data-yPosss'));
    var rrange = parseInt($selectedUnit.attr('data-movement'));

//    updateMovingRange(rrange, xxPos, yyPos);
//    updateEnemyInRange(parseInt($selectedUnit.attr('data-xPosss')), parseInt($selectedUnit.attr('data-yPosss')));
//    updatedHexagonClasses();
//    registerMovableArea();
}
function updateMovingRange(range, xPos, yPos) {

//    $movingRangeView = createRangeSelector(range, xPos, yPos);

    $movingRangeVieww = $('[data-innRange = true]');
    $movingRange = $movingRangeVieww.filter(function () {
        return $(this).data('occupied') == false
    });

}

function createRangeSelector(range, xPos, yPos) {
    $allHexagons.attr('class', 'unSelected');

    newChangeClassOfHexagonsInRange(range, xPos, yPos);
    return $('polygon.testRange');
}

function newChangeClassOfHexagonsInRange(range, xPos, yPos) {
    var horizontal = 1;

    while (horizontal <= range) {
        newChangeClassOfHexCircumference(xPos, yPos, horizontal);
        horizontal += 1;
    }
}
function newChangeClassOfHexCircumference(unit_x, unit_y, horizontal) {

    var constantUp = 0;
    var constantDown = 0;
    var initialSizeDown = findHex(unit_x, unit_y).data('size');
    var initialSizeUp = findHex(unit_x, unit_y).data('size');
    var newHexClass = 'testRange';
    var click = false;

    var vertical = 1;

    newHexClassChange((unit_x - horizontal), (unit_y), horizontal);
    newHexClassChange((unit_x + horizontal), (unit_y), horizontal);


    while (horizontal >= vertical) {

        var finalSizeDown = findHex(unit_x, unit_y + vertical).data('size');
        var finalSizeUp = findHex(unit_x, unit_y - vertical).data('size');

        if (initialSizeDown < finalSizeDown) {
            constantDown += 1;
        }
        if (initialSizeUp < finalSizeUp) {
            constantUp += 1;
        }

        newchangeVerticalHexagons(unit_x, unit_y, vertical, vertical, horizontal, constantDown);
        newchangeVerticalHexagons(unit_x, unit_y, vertical, (vertical * -1), horizontal, constantUp);

        initialSizeDown = finalSizeDown;
        initialSizeUp = finalSizeUp;
        vertical += 1;
    }
}
function newchangeVerticalHexagons(unit_x, unit_y, vertical, up, horizontal, constant) {
    if (horizontal <= vertical) {
//        debugger;
        newverticalHexChange(unit_x, unit_y, horizontal, vertical, constant, up)
    } else {
        newdiagonalHexChange(unit_x, unit_y, vertical, up, horizontal, constant);
    }
}
function newverticalHexChange(unit_x, unit_y, horizontal, vertical, constant, up) {
    var row = 0;
    while (row <= horizontal) {
//        debugger;
        var xx = (unit_x - (horizontal + row - vertical - constant));
        var yy = (unit_y + up);

        newHexClassChange(xx, yy, horizontal);
        row += 1;
    }
}
function newdiagonalHexChange(unit_x, unit_y, vertical, up, horizontal, constantDown) {

    newHexClassChange((unit_x - (horizontal - constantDown)), (unit_y + up), horizontal);
    newHexClassChange((unit_x + (horizontal + constantDown - vertical)), (unit_y + up), horizontal)

}


function newHexClassChange(xPos, yPos) {
    var hex = $('*[data-xPosss=' + xPos + '][data-yPosss=' + yPos + ']');

//    if ((!!(hex.attr('data-occupied')) == true) && ((hex.children('img').attr('data-strength')) <= $selectedUnit.attr('data-strength'))){
//        console.log("Alex is the bomb.")
//    }
    hex.children('svg').children('polygon').attr('class', 'testRange');
}

function updateEnemyInRange(xPos, yPos) {
    $attackRange = createRangeSelector(parseInt($selectedUnit.data('range')), xPos, yPos);
//    var $inRange = $('.inPlayUnit*[data-inRange=' + true + ']');
    var $inRangee = $('[data-innRange = true][data-team = ' + defense + ']');
    $enemyUnitsInRange = $inRangee.filter(function () {

        return $(this).attr('data-off') <= $selectedUnit.attr('data-off')
    });
}
function updatedHexagonClasses() {
    $allHexagons.attr('class', 'unSelected');
//    $attackRange.attr('class', 'hoverRange');
//    $movingRangeView.attr('class', 'selectedRange');
//    $movinfRangeVieww.attr('class')
}
function registerMovableArea() {

    registerPregameArea();

    registerMovableHex();
    if (pregame_var == false) {
//        registerAttackUnit()
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

        var $Hexagon = $(this);

        moveImageToMap($selectedUnit);
        if ($(".auxSpace").children().length == 0) {
            $('.startGameButton').css('visibility', 'visible');
        }

        $enemyUnitsInRange.off('click');


        var newLocation = $(this);
        var oldLocation = $selectedUnit.parent();
//        moveUnitToNewPosition($selectedUnit, $(this).attr('data-xPosss'), $(this).attr('data-yPosss'), $selectedUnit.attr('data-xPosss'), $selectedUnit.attr('data-yPosss'));
        newMoveUnitToNewPosition(newLocation, oldLocation, $selectedUnit)

    });
}


function registerAttackUnit() {
    $enemyUnitsInRange.on('click', function () {
        moveUnitToGraveyard($(this).children("img"));
        var newLocation = $(this);
        var oldLocation = $selectedUnit.parent();
        if ($selectedUnit.data('range') == 0) {
//            moveUnitToNewPosition($selectedUnit, $(this).data('x_pos'), $(this).data('y_pos'), $(this).data('row_size'), $selectedUnit.data('x_pos'), $selectedUnit.data('y_pos'));
//            moveUnitToNewPosition($selectedUnit, $(this).attr('data-xPosss'), $(this).attr('data-yPosss'), $selectedUnit.attr('data-xPosss'), $selectedUnit.attr('data-yPosss'));
            newMoveUnitToNewPosition(newLocation, oldLocation, $selectedUnit)

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
//    deadUnit.attr('class', 'deadUnit');
    deadUnit.attr('data-status', 'dead');
    deadUnit.prependTo(".graveyard");
}
function captureHomeUnit() {
    var homeUnits = $('img[data-team=1]');
    var gameStatus = "";

    $.each(homeUnits, function (index, value) {
//        console.log($(value).parent().attr('id'));
//        console.log($(value).attr('id'));

        gameStatus = gameStatus + $(value).attr('id').substr(0, 3) + "," + $(value).parent().attr('id') + ";";
    });
//    console.log(gameStatus);
}

function updateMetaData(movingUnit, xPos, yPos, xPosOld, yPosOld, hexRowSize) {
    var $hexOld = findHex(xPosOld, yPosOld);
//    $hexOld.attr('data-occupied', false);
    updateUnitMetaData(movingUnit, xPos, yPos, hexRowSize);
    var $hex = findHex(xPos, yPos);
//    $hex.attr('data-occupied', true);
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
    debugger;
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
    debugger;

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

    debugger;

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

    var possibleSpots = [];
    for (var i = 1; i <= 40; i++) {
        possibleSpots.push('#hex' + i)
    }
    var team = 0;
    newMovingGroupToMap(team, possibleSpots);

    $('.loadEnemiesButton').off('click');
    $('.loadEnemiesButton').on('click', function () {
        placeEnemies();
    });
}

function placeUnits() {

    var possibleSpots = [];
    for (var i = 52; i <= 91; i++) {
        possibleSpots.push('#hex' + i)
    }
    var team = 1;
    newMovingGroupToMap(team, possibleSpots);

    $('.randomSetUpButton').off('click');
    $('.randomSetUpButton').on('click', function () {
        placeUnits();
    });
}
function newMovingGroupToMap(team, possibleSpots) {
    for (var i = 0; i < 20; i++) {
        var shuffledArray = shuffle(possibleSpots);
        var newLocation = shuffledArray.pop();
        possibleSpots = shuffledArray;

        var movingUnit = $("[data-index=" + (parseInt(i) + 1) + "][data-team=" + team + "]");
        var oldLocation = movingUnit.parent();
//        debugger;
//        if (team == 1) {
//            var dock = "aux";
//        }else{
//            var dock = "enemy"
//        }
        moveImageToMap(movingUnit);
        newMoveUnitToNewPosition(newLocation, oldLocation, movingUnit);
    }
    addStartButton();
    PreGame.loadPreGameFunctions();
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


function initialConditions() {

    pregame_var = true;

    $moveableUnits = $('img[data-team=' + 1 + ']').parent();
    $clickableUnitSpaces = $('img[data-team=' + 1 + ']').parent();

    $initialRange = $("[data-innrange=true]");
    $movingRange = $initialRange;

    $allHexagons = $('polygon');
//    $allSquares = $('.ssquare');

    pregame();
}

$(document).ready(function () {

    loadEverything();
    initialConditions();
    registerHoverUnit();

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