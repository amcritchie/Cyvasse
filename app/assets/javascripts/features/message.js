Message = {
    register: function () {
        $('#sendMessage').on('click', function (e) {
            e.preventDefault();
            $('.messageError').remove();

            if (window.location.pathname.indexOf('/message_board') !== -1) {
                Message.boardMessage();
            } else {
                Message.matchMessage();
            }
        });
    },

    boardMessage: function () {
        var message = $('#messageBody').val();
        if (message.length <= 200) {
            debugger;
            var sender = You.id;
            var receiver = 0;
            var match = 0;
            $.ajax({
                type: 'post',
                url: ('/users/' + receiver + '/messages'),
                data: {user_id: Opponent.id, match_id: match, message: message},
                dataType: 'json'
            });
            $('#messages').prepend(
                    "<div class='messageRow'>" +
                    "<div class='message home'>" +
                    "<article class='image'>" +
                    "<img src='" + MessageBoard.imagePath + "'>" +
                    "</article>" +
                    "<article class='info'>" +
                    "<div><h6>" + MessageBoard.username + "</h6></div>" +
                    "<div><p>" + message + "</p></div>" +
                    "</article>" +
                    "</div>" +
                    "</div>"
            );
            $('#messageBody').val('')

        } else {
            $('#messageNav').append('<p class="messageError">Message must be under 200 chars</p>');
            setTimeout(function () {
                $('.messageError').fadeOut();
            }, 2000);
        }
    },

    matchMessage: function () {
        var message = $('#messageBody').val();
        if (message.length <= 200) {
            var sender = You.id;
            var receiver = Opponent.id;
            var match = MatchData.matchID;
            $.ajax({
                type: 'post',
                url: ('/users/' + receiver + '/messages'),
                data: {user_id: Opponent.id, match_id: match, message: message},
                dataType: 'json'
            });
            $('#messages').prepend(
                    "<div class='messageRow'><p class='message " + ((You.team == 1) ? 'away' : 'home') + "'><a>" + message + "</a></p></div>"
            );
            $('#messageBody').val('')

        } else {
            $('#messageNav').append('<p class="messageError">Message must be under 200 chars</p>');
            setTimeout(function () {
                $('.messageError').fadeOut();
            }, 2000);
        }
    }
};