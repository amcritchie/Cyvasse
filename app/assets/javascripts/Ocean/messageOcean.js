var MessageOcean = {

    interval: null,

    shell: function (route, callback) {
        clearInterval(MessageOcean.interval);
        MessageOcean.interval = setInterval(function () {
            $.when(MessageOcean.ajax(route)).done(callback);
        }, 1500);
    },

    start: function () {
        MessageOcean.shell('/get_match_messages', function (res) {
            if (res.messages.length > $('.messageRow').length) {
                for (var i = 0; i < $('.messageRow').length; i++) {
                    res.messages.shift()
                }
                res.messages.forEach(function(message){
                    $('#messages').prepend(
                            "<div class='messageRow'><p class='message " + ((You.team == 1) ? 'home' : 'away') + "'><a>" + message.message + "</a></p></div>"
                    );
                });
            }
        });
    },

    ajax: function (route) {
        var deferred = $.Deferred();
        $.ajax({
            type: 'put',
            url: route,
            data: {
                match_id: MatchData.matchID
            },
            success: function (response) {
                deferred.resolve(response);
            },
            error: function (response) {
                deferred.reject(response);
            }
        });
        return deferred;
    }
};