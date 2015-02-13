var Setup = {

    activateClick: function () {
        $('.saveSetup').on('click', function () {
            Setup.createNewSetup($(this));
        });

        $('.executeSetup').on('click', function () {
            if ($(this).parent().children('.executeSetup').text() != 'Blank') {
                Setup.executeSetup($(this));
                PreGame.hexVisualUpdate();
            } else {
                alert('You must save a lineup first.')
            }
        });
    },

    executeSetup: function (button) {
        var whichSetup = button.parent().data('setup');
        $('.hexDiv').attr('data-occupied', false);
        NoTeamNormalize.placeUnits(GameStatus.convertStringToArray(PreGame.setups[whichSetup][1]).reverse(), You.team);
        PreGame.saveYourSide();
        PreGame.loadPreGameTurn();
        PreGame.readyForStartButton();
    },

    createNewSetupError: function (saveButton) {
        var name = prompt("The name must be at least 20 characters");
        if (name != null) {
            if (name.length != 0) {
                if (name.length > 20) {
                    Setup.createNewSetupError(saveButton);
                } else {

                    debugger;
                    var setupPosition = saveButton.parent().data('setup');
                    $.ajax({
                        type: 'post',
                        url: '/users/' + MatchData.currentUser + '/setups.json',
                        data: {
                            id: PreGame.setups[setupPosition][2],
                            name: name,
                            units_position: GameStatus.positionOfYourUnits(),
                            button_position: setupPosition
                        },
                        dataType: 'json'
                    }).success(
                        $(".setup" + setupPosition).children('.executeSetup').text(name),
                        window.location.reload()
                    );
                }
            } else {
                Setup.createNewSetupError(saveButton);
            }
        }
    },

    createNewSetup: function (saveButton) {
        var setupPosition = saveButton.parent().data('setup');
        if ($(".auxSpace").children().length != 0) {
            alert('You must have all your units on the board to save.');
        } else {
            var name = prompt("What would you like to call this line up?");

            if (name != null) {
                if (name.length != 0) {
                    if (name.length > 20) {
                        Setup.createNewSetupError(saveButton);
                    } else {

                        var setupPosition = saveButton.parent().data('setup');
                        $.ajax({
                            type: 'post',
                            url: '/users/' + MatchData.currentUser + '/setups.json',
                            data: {
                                id: PreGame.setups[setupPosition][2],
                                name: name,
                                units_position: GameStatus.southPositionOfYourUnits(),
                                button_position: setupPosition
                            },
                            dataType: 'json'
                        }).success(
                            $(".setup" + setupPosition).children('.executeSetup').text(name),
                            window.location.reload()
                        );
                    }
                } else {
                    Setup.createNewSetupError(saveButton);
                }
            }
        }
    }
};