

describe("Click Unit", function () {

    beforeEach(function (done) {

        loadFixtures('game.html');
        loadEverything();

        setTimeout(function(){
            initialConditions();
            done()
        },400);

    });

    it("Then place it", function () {

        expect(true).toBe(true);

        expect($(".auxSpace")).toExist();
        console.log($(".auxSpace").children());

        var rabbleImage = $('[data-index=3]');
        var rabble = $('#aux3');
        var hex = $('#hex55');

        expect(rabbleImage.parent().attr("class")).toEqual("sssquare");

        rabble.click();

        hex.off('click');

        pregameClickUnit();

        registerMovableHex();

        hex.click();

        expect(rabbleImage.parent().attr("class")).toEqual("ssquare");
        expect(rabbleImage).toExist();

    })
});