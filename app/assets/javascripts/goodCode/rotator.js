var Rotator = {
    createAndRotateOn: function (button, text) {
        $(".map").prepend("<button class='" + button + " rotating'>" + text + "</button>");
        Rotator.rotateOn($('.' + button))
    },

    rotateOn: function (button) {
        $(button).animate(
            {
                opacity: 1,
                left: "+=700"
            },
            {
                duration: 'slow'
            });
    },
    rotateOff: function (button) {
        $(button).animate(
            {
                opacity: 0,
                left: "+=700"
            },
            {
                duration: 'slow',
                complete: function () {
                    $(button).off('click').remove();
                }
            });
    }

};