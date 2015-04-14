var MessageOcean = {

    interval: null,

    shell: function (route, callback) {
        clearInterval(MessageOcean.interval);
        MessageOcean.interval = setInterval(function () {
            $.when(MessageOcean.ajax(route)).done(callback);
        }, 5000);
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
    },

    startBoard: function () {
        MessageOcean.shell('/get_board_messages', function (res) {
            debugger;
            if (res.messages.length > $('.messageRow').length) {
                for (var i = 0; i < $('.messageRow').length; i++) {
                    res.messages.shift()
                }
                res.messages.forEach(function(message){
                    debugger;
                    $('#messages').prepend(
                            "<div class='messageRow'>" +
                            "<div class='message home'>" +
                            "<article class='image'>" +
                            "<img src='" + res.users[message.sender].imagePath.image.thumb.url + "'>" +
                            "</article>" +
                            "<article class='info'>" +
                            "<div><h6>" + res.users[message.sender].username + "</h6></div>" +
                            "<div><p>" + message.message + "</p></div>" +
                            "</article>" +
                            "</div>" +
                            "</div>"
//                            "<div class='messageRow'><p class='message " + ((You.team == 1) ? 'home' : 'away') + "'><a>" + message.message + "</a></p></div>"
                    );
                });
            }
        });
    },
};