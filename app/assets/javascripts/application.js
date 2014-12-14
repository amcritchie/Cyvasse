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

    favoriteUser: function(ele,userID){
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

    unfavoriteUser: function(ele,userID){
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

    setInterval(function(){
        $('.flashSuccess').children().fadeOut();
        $('.flashError').children().fadeOut();
        $('.flashFail').children().fadeOut();
    },3000);

    $('div').on('click',function(){
        $.post('/update_last_active.json').success();
    });
    $('a').on('click',function(){
        $.post('/update_last_active.json').success();
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