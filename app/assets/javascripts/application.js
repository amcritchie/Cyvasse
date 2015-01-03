// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
//= require jquery.plugin.min
//= require jquery.countdown.min

var $allHexDivs;
var $allHexSVGs;
var $allHexPoly;

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

var Favorite = {

    favoriteUser: function (ele, userID) {
        $.post('/users/' + userID + '/favorites.json').success();
        var favoriteLinks = $('[data-linkType=favorite][data-favorited=' + userID + ']');
        favoriteLinks.off('click');
        favoriteLinks.empty().text('Unfavorite').attr('data-linkType', 'unfavorite').off('click');
        Flash.message('success', 'Favorited');
        if ($('#fourFavorites').children().length < 4){
            $('#fourFavorites').append(
                    '<div class="favorite" data-favorited=' + userID + '>' +
                    'Will be added on reload' +
                    '</div>'
            );
        }

        favoriteLinks.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            Favorite.unfavoriteUser(ele, userID);
        });
    },

    unfavoriteUser: function (ele, userID) {
        $.ajax({
            type: 'delete',
            url: ('/users/' + userID + '/favorites/' + userID),
            dataType: 'json'
        });
        var div = $('.favorite[data-favorited=' + userID + ']');
        var links = $('[data-linkType=unfavorite][data-favorited=' + userID + ']');
        Flash.message('error', 'Unfavorited');
        div.off('click').remove();
        links.empty().text('Favorite').attr('data-linkType', 'favorite').off('click');
        links.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            Favorite.favoriteUser(ele, userID);
        });
    }

};

$(document).ready(function () {

    setInterval(function () {
        $('.flashSuccess').children().fadeOut();
        $('.flashError').children().fadeOut();
        $('.flashFail').children().fadeOut();
    }, 3000);

    $('.countDown').each(function (index, timer) {
        var startTime = $(timer).data("time");
        $(timer).countdown({until: (new Date(startTime)), compact: true});
    });


    $('a').on('click', function () {
        $.post('/update_last_active.json');
    });

    Toggle.createAll();

//    if ($('.dashboardTutorial').length == 1){
////        $('.dashboardTutorial').prepend('<button class="tutorialDash tutorial"><h5>Welcome to Cyvasse, </h5><h6> this is your dashboard where you can manage all your games.</h6></button>')
////        Rotator.rotateOn($('.tutorialDash'));
//        setTimeout(function(){
//            $('#gameIndex').prepend('<button class="tutorialDash tutorial"><h5>Welcome to Cyvasse! </h5><h6> This is your dashboard, where you can manage all your games.</h6></button>');
//            Rotator.rotateOn($('.tutorialDash'));
//            setTimeout(function(){
//                $('.dashboardTutorial').prepend('<button class="tutorialCreateGames tutorial"><h6>Here you can create new matches. </h6>&#8601</button>');
//                Rotator.rotateOn($('.tutorialCreateGames'));
//                setTimeout(function(){
//                    $('.dashboardTutorial').prepend('<button class="tutorialActiveGames tutorial"><h5>These are your active games, </h5><h6> Click here.</h6>&#8601</button>');
//                    Rotator.rotateOn($('.tutorialActiveGames'));
//                },1000)
//            },1000)
//        },500)
//    }

//    setInterval(function(){
//    $('body').style.font = "Cinzel";
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
//    }, 3000);


    var i = 0;

//    function appendSomeItems() {
//        for (var j = 0; j < 10; i++, j++) {
//            $('#messageDock').append('<li>Line Item</li>');
//            sleep(1000);
//
//        }
//        if (i < 5) window.setTimeout(appendSomeItems, 1000);
//    }


    console.log(document.getElementById('accountType').innerHTML);
    $('.playThisUser').on('click', function () {

        if (($('#activeGames').children().length == 5) && (document.getElementById('accountType').innerHTML == 'basic')){
            Flash.messageLong('error', "You may only have 5 'Active' games with a basic account.");
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

    function sleep(dur) {
        var d = new Date().getTime() + dur;
        while (new Date().getTime() <= d) {
            //Do nothing
        }
    }


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


    $('#button').on('click', function () {
        $(this).css('backround-color', 'blue')
    });

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

});