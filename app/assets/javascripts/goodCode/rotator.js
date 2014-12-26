var Rotator = {
    createAndRotateOn: function (button, text) {
        $(".map").prepend("<button class='" + button + " rotating'>" + text + "</button>");
        Rotator.rotateOn($('.' + button));
    },

    rotateOn: function (button) {
        $(button).animate(
            {
                opacity: 1,
                left: "700px"
            },
            {
                duration: 'slow'
            });
    },
    rotateOff: function (button) {
        $(button).animate(
            {
                opacity: 0,
                left: "+=700px"
            },
            {
                duration: 'slow',
                complete: function () {
                    $(button).off('click').remove();
                }
            });
    },
    createAndRotateSetupButton: function (setupNum, nameOfSetup) {
//        var text = 'rr';
        $(".map").prepend(
                "<div class='setup" + setupNum + " setUp rotating' data-setup="+setupNum+"><button class=executeSetup>"+nameOfSetup+"</button>" +
                    "<button class=saveSetup>Save Current</button></div>");
        Rotator.rotateOn($('.setup' + setupNum));
    }

};