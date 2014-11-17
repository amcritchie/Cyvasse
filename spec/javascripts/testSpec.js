
describe("Load Map", function () {
    beforeEach(function (done) {
        loadFixtures('game.html');
//        loadEverything();
//        initialConditions();

        InitialMatchLoad.onPageLoad();
        done();
    });

    it(".map div Loads", function () {
        expect($(".board")).toExist();
    });

    it("All Squares loaded", function () {
        expect($('.hexDiv').length).toEqual(91);
    });

    it("Squares have correct ID numbers", function () {

        $.each($allHexagons.parent().parent(), function (index, square) {
            index += 1;
            expect(square.id).toEqual("hex" + parseInt(index) + "");
            if (index > 51) {
                expect($(square).children("svg").children("polygon").attr("class")).toEqual("selectedRange");
            } else {
                expect($(square).children("svg").children("polygon").attr("class")).toEqual("unSelected");
            }
        });
    });

    it("$movingRange is correct", function () {

        expect($movingRange).toExist();
        expect($movingRange.length).toEqual(40);

        expect($($movingRange[0]).children().children().attr('class')).toEqual('selectedRange');
        expect($($movingRange[39]).children().children().attr('class')).toEqual('selectedRange');

    });
});

describe("Load Units", function () {

    beforeEach(function (done) {
        loadFixtures('game.html');
        InitialMatchLoad.onPageLoad();
        done();
    });

    it(".auxSpace div Loads", function () {
        expect($(".auxSpace")).toExist();
    });
    it("All aux spaces load", function () {
        expect($('.unplacedUnitSpace').length).toEqual(20);
    });
    it("All units load", function () {
        expect($('[data-status="unplaced"]').length).toEqual(40);
    });
    it("Units start in aux spaces", function () {
        expect(parseInt($('#aux14').children("img").attr("data-index"))).toEqual(14);
    });
    it("Units start in correct Aux space", function () {
        var rabble = $('[data-index=3][data-team=1]');
        var dragon = $('[data-index=19][data-team=1]');
        var lightHorse = $('[data-index=8][data-team=1]');
        expect(rabble.parent().attr('id')).toEqual("aux3");
        expect(dragon.parent().attr('id')).toEqual("aux19");
        expect(lightHorse.parent().attr('id')).toEqual("aux8");
    });

    it("$moveableUnits are correct", function () {

        expect($moveableUnits).toExist();
        expect($moveableUnits.length).toEqual(20);

        expect($moveableUnits[0].children).toEqual($('[data-index=1]'));
        expect($moveableUnits[13].children).toEqual($('[data-index=14]'));
    });
});


describe("Pregame click Rabble", function () {

    var rabble;
    var dragon;
    var lightHorse;

    beforeEach(function (done) {

        loadFixtures('game.html');
        InitialMatchLoad.onPageLoad();

        rabble = $('[data-index=3][data-team=1]');
        dragon = $('[data-index=19][data-team=1]');
        lightHorse = $('[data-index=8][data-team=1]');
        rabble.parent().click();

        done();
    });

    it("$selectedUnit becomes Rabble", function () {
        expect($selectedUnit).toEqual(rabble)
    });

    it("Can change $selectedUnit", function () {

        dragon.parent().click();
        expect($selectedUnit).toEqual(dragon);
        lightHorse.parent().click();
        expect($selectedUnit).toEqual(lightHorse);

    });
    it("Click Rabble multiple times and not bug out", function () {
        expect($selectedUnit).toEqual(rabble);
        rabble.parent().click();
        expect($selectedUnit).toEqual(rabble);
        rabble.parent().click();
        expect($selectedUnit).toEqual(rabble);
        rabble.parent().click();
        expect($selectedUnit).toEqual(rabble);
        rabble.parent().click();
    });

    it("Can move Rabble to Map", function () {
        var hex = $('[data-hexIndex=55]');
        hex.click();
        expect(rabble.parent().attr("class")).toEqual("hexDiv");
    });
});

describe("Moving Units to Map", function () {

    var rabble;
    var dragon;
    var lightHorse;
    var hex1;
    var hex2;
    var hex3;

    beforeEach(function () {

        loadFixtures('game.html');
        InitialMatchLoad.onPageLoad();


        rabble = $('[data-index=3][data-team=1]');
        dragon = $('[data-index=19][data-team=1]');
        lightHorse = $('[data-index=8][data-team=1]');
        hex1 = $('[data-hexIndex=55]');
        hex2 = $('[data-hexIndex=67]');
        hex3 = $('[data-hexIndex=72]');

    });

    it("When a Unit is moved to Map, its aux space is removed", function () {

        expect($(".unplacedUnitSpace").length).toEqual(20);
        rabble.parent().click();
        hex1.click();
        expect($(".unplacedUnitSpace").length).toEqual(19);
    });

    it("Click Unit, then click other unit to move to Map", function () {
        rabble.parent().click();
        expect($selectedUnit).toEqual(rabble);
        lightHorse.parent().click();
        expect($selectedUnit).toEqual(lightHorse);
        var lightHorseAuxSpace = "#aux" + lightHorse.data('index');
        expect($(lightHorseAuxSpace)).toExist();
        hex1.click();
        expect($(lightHorseAuxSpace)).not.toExist();
    });

    it("Place Unit, select again, then move to another hex", function () {
        rabble.parent().click();
        hex1.click();
        expect(hex1.children("img")).toEqual(rabble);
        rabble.parent().click();
        hex2.click();
        expect(hex1.children("img")).not.toEqual(rabble);
        expect(hex2.children("img")).toEqual(rabble);
        rabble.parent().click();
        hex3.click();
        expect(hex1.children("img")).not.toEqual(rabble);
        expect(hex2.children("img")).not.toEqual(rabble);
        expect(hex3.children("img")).toEqual(rabble);
    });

    it("Place Unit, select another unit, then select the unit on the map, then move it to another spot.", function () {

        rabble.parent().click();
        hex1.click();
        expect(hex1.children("img")).toEqual(rabble);

        lightHorse.parent().click();
        rabble.parent().click();

        hex2.click();
        expect(hex1.children("img")).not.toEqual(rabble);
        expect(hex2.children("img")).toEqual(rabble);

    });

    it("Space becomes occupied when a Unit lands on it, and unoccupied when it leaves.", function () {

        expect(hex1.attr("data-occupied")).toEqual('false');

        rabble.parent().click();
        hex1.click();

        expect(hex1.attr("data-occupied")).toEqual('true');

        rabble.parent().click();
        hex2.click();

        expect(hex1.attr("data-occupied")).toEqual('false');
        expect(hex2.attr("data-occupied")).toEqual('true');


    });

    it("Click a bunch of units then move, expecting the last unit clicked will move to the position.", function () {
        rabble.parent().click();
        dragon.parent().click();
        lightHorse.parent().click();
        rabble.parent().click();
        lightHorse.parent().click();
        rabble.parent().click();
        expect($selectedUnit).toEqual(rabble);
        hex1.click();
        expect(hex1.children("img")).toEqual(rabble);
    });

    it("Click 'Random Setup' Button, and expect all Units to move to Map", function(){

        expect($(".unplacedUnitSpace").length).toEqual(20);
        $('.randomSetUpButton').click();
//
        expect($(".unplacedUnitSpace").length).toEqual(0);
        expect($("[data-occupied=true]").length).toEqual(20);
    });

    it("(3/20 this test fails) Random Setup button places Units in a different place, when clicked again", function(){
        $('.randomSetUpButton').click();
        var rabbleFirstLocation = rabble.parent();
        var dragonFirstLocation = dragon.parent();
        var lightHorseFirstLocation = lightHorse.parent();

        $('.randomSetUpButton').click();
        var rabbleSecondLocation = rabble.parent();
        var dragonSecondLocation = dragon.parent();
        var lightHorseSecondLocation = lightHorse.parent();
        expect(rabbleFirstLocation).not.toEqual(rabbleSecondLocation);
        expect(dragonFirstLocation).not.toEqual(dragonSecondLocation);
        expect(lightHorseFirstLocation).not.toEqual(lightHorseSecondLocation);

        $('.randomSetUpButton').click();
        expect(rabbleSecondLocation).not.toEqual(rabble.parent());
        expect(dragonSecondLocation).not.toEqual(dragon.parent());
        expect(lightHorseSecondLocation).not.toEqual(lightHorse.parent());
    });

    it("Random Setup button doesn't place units outside the $initialRange", function(){
        $('.randomSetUpButton').click();
        for (i = 1; i < 7; i++) {
            expect($("[data-occupied=true][data-yPos=" + i + "]").length).toEqual(0);
        }
    });

    it("Units can be moved after clicking the Random Button", function(){
        $('.randomSetUpButton').click();
        var moveFrom = rabble.parent();
        rabble.parent().click();
        var moveTo = $initialRange.not($('[data-occupied=true]'))[1];
        moveTo.click();
        expect($(moveTo).children("img")).toEqual(rabble);
        expect($(moveFrom).children("img")).not.toEqual(rabble);

    });

    it("Start game button appears when all Units are placed", function(){

        expect($(".startGameButton")).not.toExist();
//        $('.randomSetUpButton').click();
        for (i=1; i < 21; i++) {
            $("#aux" + i + "").click();
            $("#hex" + (55 + i) + "").click();
        }
        expect($(".startGameButton")).toExist();
    });

    it("Start game button appears when Random Setup Button is clicked", function(){

        expect($(".startGameButton")).not.toExist();
        $('.randomSetUpButton').click();
        expect($(".startGameButton")).toExist();

    });

    it("Start Game button, runs the start game function", function(){

        $('.randomSetUpButton').click();
        $('.startGameButton').click();

    });

});

describe("A spy", function() {

    var rabble;
    var dragon;
    var lightHorse;
    var hex1;
    var hex2;
    var hex3;

    beforeEach(function () {

        loadFixtures('game.html');
        InitialMatchLoad.onPageLoad();

        rabble = $('[data-index=3][data-team=1]');
        dragon = $('[data-index=19][data-team=1]');
        lightHorse = $('[data-index=8][data-team=1]');
        hex1 = $('[data-hexIndex=55]');
        hex2 = $('[data-hexIndex=67]');
        hex3 = $('[data-hexIndex=72]');
    });
    var foo, bar = null;

    beforeEach(function () {

        spyOn(window, 'startGame');

//        foo.setBar();
    });

    it("tracks that the spy was called", function () {
        $('.randomSetUpButton').click();
        $('.startGameButton').click();
        expect(window.startGame).toHaveBeenCalled();
    });
});

describe("First move", function() {
    var rabble;
    var dragon;
    var lightHorse;
    var hex1;
    var hex2;
    var hex3;

    beforeEach(function () {

        loadFixtures('game.html');
        InitialMatchLoad.onPageLoad();

        rabble = $('[data-index=1][data-team=1]');
        dragon = $('[data-index=19][data-team=1]');
        lightHorse = $('[data-index=8][data-team=1]');
        hex1 = $('[data-hexIndex=55]');
        hex2 = $('[data-hexIndex=67]');
        hex3 = $('[data-hexIndex=72]');
        for (i=1; i < 21; i++) {
            $("#aux" + i + "").click();
            $("#hex" + (55 + i) + "").click();
        }
        $('.enemyLineUpOne').click();
        $('.startGameButton').click();
    });

    it("first move, move to availiable spot", function () {
        expect(rabble.parent().attr("id")).toEqual("hex56");
        rabble.parent().click();
        $('[data-hexIndex=54]').click();
        expect(rabble.parent().attr("id")).toEqual("hex54");
    });

    it("cant move to space out of range", function(){
        expect(rabble.parent().attr("id")).toEqual("hex56");
        rabble.parent().click();
        $('[data-hexIndex=53]').click();
        expect(rabble.parent().attr("id")).toEqual("hex56");
    });

    it("Click Unit, then click other unit, and last unit is the selected one", function(){
        rabble.parent().click();
        lightHorse.parent().click();
        rabble.parent().click();
        rabble.parent().click();
        rabble.parent().click();
        lightHorse.parent().click();
        dragon.parent().click();
        expect(Offense.unit).toEqual(dragon);
    });

    it("Enemies Lined up properly in Enemy Line One", function(){
        expect($('[data-index=5][data-team=0]').parent().attr("id")).toEqual("hex36");
        expect($('[data-index=14][data-team=0]').parent().attr("id")).toEqual("hex27");
        expect($('[data-index=1][data-team=0]').parent().attr("id")).toEqual("hex40");
        expect($('[data-index=20][data-team=0]').parent().attr("id")).toEqual("hex21");

    });

    it("Enemies can be killed by a stronger enemy.", function(){
        $('[data-index=10][data-team=1]').parent().click();
        expect(Offense.attackRange.length).toEqual(2);
        $('[data-hexIndex=33]').click();
        expect($('.graveyard').children('.grave').length).toEqual(1);
        expect($('[data-index=10][data-team=1]').parent().attr("id")).toEqual("hex33");
        expect($('[data-index=8][data-team=0]').parent().attr("id")).toEqual("gra1");
    })
});

describe('Game Play', function(){

    var rabble;
    var dragon;
    var elephant;
    var lightHorse;

    beforeEach(function () {

        loadFixtures('game.html');
        InitialMatchLoad.onPageLoad();


        rabble = $('[data-index=1][data-team=1]');
        dragon = $('[data-index=19][data-team=1]');
        elephant = $('[data-index=6][data-team=1]');
        lightHorse = $('[data-index=8][data-team=1]');

        for (i=1; i < 21; i++) {
            $("#aux" + i + "").click();
            $("#hex" + (55 + i) + "").click();
        }
        $('.enemyLineUpOne').click();
        $('.startGameButton').click();
    });

    it("Team 1 cannot select a Unit after moving to a free space", function(){
        lightHorse.parent().click();
        expect(Offense.unit).toEqual(lightHorse);
        $('[data-hexIndex=45]').click();
        expect(Offense.unit).toEqual(null);

        rabble.parent().click();
        expect(Offense.unit).toEqual(null);
//        vv Doesn't Work vv ??
//        lightHorse.parent().click();
    });
    it("Team 1 cannot select a Unit after attacking a unit", function(){
        lightHorse.parent().click();
        expect(Offense.unit).toEqual(lightHorse);
        $('[data-hexIndex=33]').click();
        expect(Offense.unit).toEqual(null);

        rabble.parent().click();
        expect(Offense.unit).toEqual(null);
//        vv Doesn't Work vv ??
//        lightHorse.parent().click();
    });
    it("Unit cannot attack an Enemy in other units range.", function(){
        elephant.parent().click();
        rabble.parent().click();
        $('[data-hexIndex=38]').click();
        expect($('[data-hexIndex=38]').children('img')).not.toEqual(rabble);
    })

});
