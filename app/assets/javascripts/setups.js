var Setup = {

    activateClick: function () {
        $('.saveSetup').on('click', function () {
            Setup.createNewSetup($(this));
        });

        $('.nameSetup').on('click', function () {
            Setup.changeName($(this));
        });

        $('.executeSetup').on('click', function () {
           Setup.executeSetup($(this))
        });
    },

    executeSetup: function (button) {
        var whichSetup = button.parent().data('setup');
        console.log( PreGame.setups[whichSetup][1] );
        $('.hexDiv').attr('data-occupied', false);
        AwayTeamNormalize.placeUnits(GameStatus.convertStringToArray(PreGame.setups[whichSetup][1]).reverse(),You.team);
        PreGame.saveYourSide();
        PreGame.readyForStartButton();
    },

    changeName: function (nameButton) {
        var name = prompt("What the answer to life, the universe, and everything?");
        if (name.length != 0) {
            if (name.length > 19) {
                Setup.changeName(nameButton);
            } else {
                $(".setup" + nameButton.parent().data('setup')).children('.executeSetup').text(name);
            }
        }
    },

    createNewSetup: function (saveButton) {
        var setupPosition = saveButton.parent().data('setup');
        if ($(".auxSpace").children().length != 0) {
            alert('You must have all your units on the board to save.');
        } else {
            var r = confirm("Are you sure you would like to Overwrite this Setup?");
            if (r == true) {
                $.ajax({
                    type: 'post',
                    url: '/users/' + Game.currentUser + '/setups.json',
                    data: {
                        id: PreGame.setups[setupPosition][2],
                        name: 'Setup ' + setupPosition,
                        units_position: GameStatus.positionOfYourUnits(),
                        button_position: setupPosition
                    },
                    dataType: 'json'
                }).success($(".setup" + setupPosition).children('.executeSetup').text('New Setup'));
            }
        }
    }
};