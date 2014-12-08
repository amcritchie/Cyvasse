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

var $allHexDivs;
var $allHexSVGs;
var $allHexPoly;


$(document).ready(function () {

    setTimeout(function () {
        $('#messageDock').children().fadeOut('slow')
    }, 3000);

    setTimeout(function () {
        $('.flashFail').children().fadeOut('slow')
    }, 3000);

    $('[data-linkType = "favorite"]').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        favoriteUser(e, parseInt($(this).attr('data-favorited')));
    });

    $('[data-linkType = "unfavorite"]').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        unfavoriteUser(e, parseInt($(this).attr('data-favorited')));
    });

    function favoriteUser(ele, userID) {
        $.post('/users/' + userID + '/favorites.json').success();
        var favoriteLinks = $('[data-linkType=favorite][data-favorited=' + userID + ']');
        favoriteLinks.off('click');
        favoriteLinks.empty().text('Unfavorite').attr('data-linkType', 'unfavorite').off('click');

        $('#favorites').append(
                '<div class="favorite" data-favorited='+userID+'>' +
                'qweasd' +
                '</div>'
        );

        setTimeout(function () {
            favoriteLinks.on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                unfavoriteUser(ele, userID);
            })
        }, 10);
    }

    function unfavoriteUser(ele, userID) {
        $.ajax({
            type: 'delete',
            url: ('/users/' + userID + '/favorites/' + userID),
            dataType: 'json'
        });
        var div = $('.favorite[data-favorited=' + userID + ']');
        var links = $('[data-linkType=unfavorite][data-favorited=' + userID + ']');
        div.off('click').remove();
        links.empty().text('Favorite').attr('data-linkType', 'favorite').off('click');

        setTimeout(function () {
            links.on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                favoriteUser(ele, userID);
            })
        }, 10);
    }

    // underline under the active nav item
//    $(".nav .nav-link").click(function () {
//        $(".nav .nav-link").each(function () {
//            $(this).removeClass("active-nav-item");
//        });
//        $(this).addClass("active-nav-item");
//        $(".nav .more").removeClass("active-nav-item");
//    });
});