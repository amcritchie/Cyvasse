var Flash = {
    animation: null,
    message: function (type, text) {
        clearTimeout(Flash.animation);
        var message = type + 'Message';
        $('#messageDock').empty().prepend('<h3 class="' + type + 'Message">' + text + '</h3>');
        Flash.animation = setTimeout(function () {
            $('#messageDock').children().fadeOut("slow");
            clearTimeout(Flash.animation);
        }, 1500);
    },
    messageLong: function (type, text) {
        clearTimeout(Flash.animation);
        var message = type + 'MessageLong';
        $('#messageDock').empty().prepend('<h3 class="' + type + 'MessageLong">' + text + '</h3>');
        Flash.animation = setTimeout(function () {
            $('#messageDock').children().fadeOut("slow");
            clearTimeout(Flash.animation);
        }, 1500);
    }
};