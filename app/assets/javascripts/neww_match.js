var offense;
var defense;
var player1name = "Alex";
var player0name = "Tyrion";

var $moveableUnits;
var $enemyUnits;
var $enemyUnitsInRange;
var $selectedUnit;
var $movingRange;

var $allHexagons;
var $initialRange;

var pregame_var;

function startGame() {
    pregame_var = false;
    $('.loadEnemiesButton').off('click').remove();
    $('.enemyLineUpOne').off('click').remove();

    $movingRange.off('click');
    addAIButtons();
    whoGoesFirst();
//    turn();
    Game.firstTurn(offense)
}


function addAIButtons() {
    $(".extraSpace").prepend("<button class='moveUnitButton'>10 Turns</button>");
    $(".extraSpace").prepend("<button class='fiveTurnsButton'>5 Turns</button>");
    $(".extraSpace").prepend("<button class='tenTurnsButton'>1 Turn</button>");
}
function whoGoesFirst() {
    offense = 1;
    defense = Math.abs(offense - 1);
}

function turn() {
    initializeTurn();
    refreshAIButtons();
}

function initializeTurn() {
//    $allHexagons.attr('class', 'unSelected');
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

//function findHex(xPos, yPos) {
//    return $("polygon[data-x-pos=" + xPos + "][data-y-pos=" + yPos + "]");
//}


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

function capitalizeEachWord(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}


function oldGame() {
    loadEverything();
    Game.oldGame();
}

$(document).ready(function () {

    if ($("#matchShow").length > 0) {
        InitialMatchLoad.onPageLoad();
    }
//    $allHexagons = $('polygon');

});