var RootJavaScript = {
    register: function () {
        if (window.location.pathname.indexOf('/matches/') !== 0) {
            RootJavaScript.load();
        }
    },
    load: function () {
        RootJavaScript.playUserLink();
        RootJavaScript.favoriteUsername();
        RootJavaScript.countDownTimer();
        RootJavaScript.selectPlayUsername();
        RootJavaScript.dashboardInfoBoard();
    },
    playUserLink: function () {
        $('.playThisUser').on('click', function () {

            if (($('#activeGames').children().length >= 10) && (document.getElementById('accountType').innerHTML == 'basic')) {
                Flash.messageLong('error', "You may only have 10 'Active' games with a basic account.");
            } else {
                $('#opponent_which_user_chosen_user').click();

                var fullUsername = $(this).data('username');
                var inputUsername = '';

                var usernameArray = [];

                for (var i = 0, len = fullUsername.length; i < len; i++) {
                    inputUsername += fullUsername[i];
                    usernameArray.push(inputUsername);
                }

                var cooper = 0;
                var blah = setInterval(function () {
                    $('.usernameField').val(usernameArray[cooper]);
                    cooper += 1;
                    if (fullUsername.length == cooper) {
                        clearInterval(blah);
                        setTimeout(function () {
                            $('.playUser').children('.newMatch').click();
                        }, 500)
                    }
                }, 100);
            }
        });
    },
    favoriteUsername: function () {

        $('.favoriteUsername').each(function (index, element) {

            if (element.text.length >= 9) {
                element.style.fontSize = "7px";
            } else if (element.text.length >= 7) {
                element.style.fontSize = "8px";
            } else if (element.text.length >= 5) {
                element.style.fontSize = "9px";
            }
//            element.style.fontSize = (9/(element.offsetWidth / 50))+"px";
        });

        if ($('#allFavorites').length == 1) {

            $('.favoriteUsername').each(function (index, element) {

                if (element.text.length >= 9) {
                    element.style.fontSize = "11px";
                } else if (element.text.length >= 7) {
                    element.style.fontSize = "12px";
                } else if (element.text.length >= 5) {
                    element.style.fontSize = "13px";
                }
//            element.style.fontSize = (9/(element.offsetWidth / 50))+"px";
            });

        }
    },
    countDownTimer: function () {
        $('.countDown').each(function (index, timer) {
            var startTime = $(timer).data("time");
            $(timer).countdown({until: (new Date(startTime)), compact: true}).on('finish', function () {
                }
            );
        });
    },
    selectPlayUsername: function() {
        $('#opponent_username').on('click',function(){
          $('#opponent_which_user_chosen_user').click()
      })
    },
    dashboardInfoBoard: function () {
        if ($('dt').attr('class') === 'startOpen') {
            $('dt').addClass('open');
            var $active = $('dt');
            $next = $active.next();
            $next.slideToggle("fast");
        } else {
            $('dt').addClass('close');
            var $active = null;
        }

        $('dt').click(function () {

            if ($active !== null) {
                $active.next().slideToggle("fast");
                $active.removeClass('open');
                $active.addClass('close');
                console.log('save closed');
                $.post('/extra_info_close.json')

            }

            $active = $(this);
            $active.addClass('open');
            $next = $active.next();

            if ($next.is(":hidden")) {
                $next.slideToggle("fast");
                console.log('save open');
                $.post('/extra_info_open.json')


            } else {
                $active.removeClass('open');
                $active.addClass('close');
                $active = null;
            }
        });
    }
};

var MatchJavaScript = {
    register: function () {
        if (window.location.pathname.indexOf('/matches/') === 0) {
            MatchJavaScript.load();
        }
    },
    load: function () {
        InitialMatchLoad.onPageLoad();
        Message.register();
        Toggle.createAll();

    }
};

var AlwaysJavaScript = {
    load: function () {
        AlwaysJavaScript.flashMessageFade();
        AlwaysJavaScript.updateLastActive();
        AlwaysJavaScript.favoriteUser();
        AlwaysJavaScript.userColumnGrow();
        NotificationOcean.start();
    },
    flashMessageFade: function () {
        setInterval(function () {
            $('.flashSuccess').children().fadeOut();
            $('.flashError').children().fadeOut();
            $('.flashFail').children().fadeOut();
        }, 3000);
    },
    updateLastActive: function () {
        $('a').on('click', function () {
            $.post('/update_last_active.json');
        });
    },
    favoriteUser: function () {
        $('[data-linkType = "favorite"]').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            Favorite.favoriteUser(e, parseInt($(this).attr('data-favorited')));
        });
        $('[data-linkType = "unfavorite"]').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            Favorite.unfavoriteUser(e, parseInt($(this).attr('data-favorited')));
        });
    },
    userColumnGrow: function () {
        if ($('#activeGames').children().length > 4) {
            $('#userColumn').css('height', (390 + ($('#activeGames').children().length * 70)) + 'px')
        }
    }
};