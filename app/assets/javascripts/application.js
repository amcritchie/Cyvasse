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
    }
};

var Favorite = {

    favoriteUser: function (ele, userID) {
        $.post('/users/' + userID + '/favorites.json').success();
        var favoriteLinks = $('[data-linkType=favorite][data-favorited=' + userID + ']');
        favoriteLinks.off('click');
        favoriteLinks.empty().text('Unfavorite').attr('data-linkType', 'unfavorite').off('click');
        Flash.message('success', 'Favorited');
        $('#favorites').append(
                '<div class="favorite" data-favorited=' + userID + '>' +
                'Will be added on reload' +
                '</div>'
        );
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

//    window.addEventListener('devtoolschange', function (e) {
//        console.log('is DevTools open?', e.detail.open);
//    });
//
//    console.log('is DevTools open?', window.devtools.open);
//
//    window.onresize = function () {
//        if ((window.outerWidth - window.innerWidth) > 100) {
////            alert('Warning: Tampering with units, will result in a loss');
//            Rotator.createAndRotateOn('turn', 'Warning: Tampering with units, will result in a loss');
//            Offense.selectableUnits.off('click');
//            Offense.moveRange.off('click');
//            Offense.attackRange.off('click');
//            setTimeout(function () {
//                window.location.reload()
//            }, 2000);
//        }
//
//        if ((window.outerHeight - window.innerHeight) > 100) {
//            Rotator.createAndRotateOn('turn', 'Warning: Tampering with units, will result in a loss');
//            Offense.selectableUnits.off('click');
//            Offense.moveRange.off('click');
//            Offense.attackRange.off('click');
//            setTimeout(function () {
//                window.location.reload()
//            }, 2000);
//        }
//    };

    setInterval(function () {
        $('.flashSuccess').children().fadeOut();
        $('.flashError').children().fadeOut();
        $('.flashFail').children().fadeOut();
    }, 3000);

    $('.countDown').each(function (index, timer) {
        var startTime = $(timer).data("time");
        $(timer).countdown({until: (new Date(startTime)), compact: true});
    });

    $('div').on('click', function () {
        $.post('/update_last_active.json');
    });
    $('a').on('click', function () {
        $.post('/update_last_active.json');
    });

    $('#toggleOutline').click(function () {
        $('.unit0').toggleClass('noBoarder');
        $('.unit1').toggleClass('noBoarder');
        $.post('/toggle_outlines.json')
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