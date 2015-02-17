var Favorite = {

    favoriteUser: function (ele, userID) {
        $.post('/users/' + userID + '/favorites.json').success();
        var favoriteLinks = $('[data-linkType=favorite][data-favorited=' + userID + ']');
        favoriteLinks.off('click');
        favoriteLinks.empty().text('Unfavorite').attr('data-linkType', 'unfavorite').off('click');
        Flash.message('success', 'Favorited');
        if ($('#fourFavorites').children().length < 4) {
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