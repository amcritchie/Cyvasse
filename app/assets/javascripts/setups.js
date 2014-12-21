var Setup = {

    activateClick: function () {
        $('.saveSetup').on('click', function () {
            Setup.createNewSetup($(this));
        });

        $('.nameSetup').on('click', function () {
            if ($(this).parent().children('.executeSetup').text() != 'Blank') {
                Setup.changeName($(this));
            } else {
                alert('You must save a lineup first.')
            }
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

    active: function () {

    },

    executeSetup: function (button) {
        var whichSetup = button.parent().data('setup');
        console.log(PreGame.setups[whichSetup][1]);
        $('.hexDiv').attr('data-occupied', false);
        NoTeamNormalize.placeUnits(GameStatus.convertStringToArray(PreGame.setups[whichSetup][1]).reverse(), You.team);
        PreGame.saveYourSide();
        PreGame.loadPreGameTurn();
        PreGame.readyForStartButton();
    },

    changeName: function (nameButton) {
        var name = prompt("What would you like to call this line up?");
        if (name.length != 0) {
            if (name.length > 20) {
                Setup.changeNameWithError(nameButton);
            } else {
//                $(".setup" + nameButton.parent().data('setup')).children('.executeSetup').text(name);
                var setupPosition = nameButton.parent().data('setup');
                Setup.changeNameAjax(name, setupPosition);
            }
        }
    },

    changeNameWithError: function (nameButton) {
        var name = prompt("It must be less then 20 characters");
        if (name.length != 0) {
            if (name.length > 20) {
                Setup.changeNameWithError(nameButton);
            } else {
                var setupPosition = nameButton.parent().data('setup');
                Setup.changeNameAjax(name, setupPosition);
            }
        }
    },

    changeNameAjax: function (name, setupPosition) {
        $.ajax({
            type: 'post',
            url: '/change_setup_name.json',
            data: {
                id: PreGame.setups[setupPosition][2],
                name: name
            },
            dataType: 'json'
        }).success($(".setup" + setupPosition).children('.executeSetup').text(name));
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
                    url: '/users/' + MatchData.currentUser + '/setups.json',
                    data: {
                        id: PreGame.setups[setupPosition][2],
                        name: 'New Setup',
                        units_position: GameStatus.positionOfYourUnits(),
                        button_position: setupPosition
                    },
                    dataType: 'json'
                }).success(
                    $(".setup" + setupPosition).children('.executeSetup').text('New Setup'),
                    window.location.reload()
                );
            }
        }
    }
};