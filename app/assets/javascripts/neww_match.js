var offense;
var defense;
var $player1name = "Alex";
var $player0name = "Tyrion";

var $moveableUnits;
var $enemyUnits;
var $enemyUnitsInRange;
var $selectedUnit;
var $movingRange;

var $allHexagons;
var $initialRange;

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


function newMoveUnitToNewPosition(newLocation, oldLocation, movingUnit) {
    var movingTo = $(newLocation);
    var movingFrom = $(oldLocation);
    movingUnit.prependTo(movingTo);
    movingTo.attr('data-occupied', true);
    movingFrom.attr('data-occupied', false);
}

function startGame() {
    pregame_var = false;
    $('.startGameButton').off('click').remove();
    $('.randomSetUpButton').off('click').remove();
    $('.loadEnemiesButton').off('click').remove();
    $('.enemyLineUpOne').off('click').remove();

    $movingRange.off('click');
    addAIButtons();
    whoGoesFirst();
//    turn();
    Game.firstTurn(offense)
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
//    Offense.registerClickUnit()
}

function newHexClassChange(xPos, yPos) {
    var hex = $('*[data-xPosss=' + xPos + '][data-yPosss=' + yPos + ']');

    hex.children('svg').children('polygon').attr('class', 'testRange');
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