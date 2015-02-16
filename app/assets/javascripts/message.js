Message = {
    register: function () {

        $('#sendMessage').on('click', function (e) {
            e.preventDefault();
            $('.messageError').remove();
            var message = $(this).parent().children('#messageBody').val();
            if (message.length <= 200){
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
                setTimeout(function(){
                    $('.messageError').fadeOut();
                }, 2000);
            }

        });
    }
};