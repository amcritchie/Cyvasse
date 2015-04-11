var NotificationOcean = {

    interval: null,
    currentUser: null,
    matchesLastUpdate: null,
    matchesCurrentUpdate: null,
    notifications: {},

    convertMatches: function (arrayOfMatches) {
        var matches = {};
        arrayOfMatches.forEach(function (match) {
            var yourTurn = false;
            var ready = false;
            if (match.home_user_id === NotificationOcean.currentUser) {
                yourTurn = (match.whos_turn === 1);
                ready = (match.home_ready === true);
            } else {
                yourTurn = (match.whos_turn === 0);
                ready = (match.away_ready === true);
            }

            matches[match.id] = {
                id: match.id,
                ready: ready,
                turn: match.turn,
                yourTurn: yourTurn,
                against: match.match_against,
                progress: match.match_status
            };
        });
        return matches;
    },

    initialNotifications: function () {
        $.each(NotificationOcean.matchesLastUpdate, function (i, match) {
            if (match.against !== 'computer') {
                if (match.progress === 'in progress') {
                    if (match.yourTurn) {
                        NotificationOcean.notifications[match.id] = {
                            id: match.id,
                            message: "It's your turn."
                        }
                    }
                } else {
                    if (!match.ready) {
                        NotificationOcean.notifications[match.id] = {
                            id: match.id,
                            message: "Finish setup."
                        }
                    }
                }
            }
        });
        return false;
    },

    addNotifications: function () {

        $.each(NotificationOcean.matchesLastUpdate, function (i, match) {
            if (match.against !== 'computer') {

                var addNotification = true;
                $.each($('#notificationList').children(), function (i, listItem) {
                    if (match.id === parseInt($(listItem).attr('data-id'))) {
                        addNotification = false;
                    }
                });

                if (addNotification) {
                    if (match.progress === 'in progress') {
                        if (match.yourTurn) {
                            NotificationOcean.notifications[match.id] = {
                                id: match.id,
                                message: "It's your turn."
                            }
                        }
                    } else {
                        if (!match.ready) {
                            NotificationOcean.notifications[match.id] = {
                                id: match.id,
                                message: "Finish setup."
                            }
                        }
                    }
                }
            }
        });
        return false;
    },

    updateNotificationsHtml: function () {
        $.each(NotificationOcean.notifications, function (i, notification) {
            var addNotification = true;
            $.each($('#notificationList').children(), function (i, listItem) {
                if (notification.id === parseInt($(listItem).attr('data-id'))) {
                    addNotification = false;
                }
            });

            if (addNotification) {
                $('#notificationList').prepend('<li data-id="' + notification.id + '"><a href="/matches/' + notification.id + '" >' + notification.message + '</a></li>')
            }
            if ($('#notificationList').children().length) {
                $('#notificationCount').show().html($('#notificationList').children().length);
            } else {
                $('#notificationCount').hide();
            }

        });
    },

    shell: function (route, callback) {
        $.when(NotificationOcean.ajax(route)).done(function (res) {

            if (res.currentUser) {
                NotificationOcean.currentUser = res.currentUser;

                NotificationOcean.matchesLastUpdate = NotificationOcean.convertMatches(res.data);

                NotificationOcean.initialNotifications();
                NotificationOcean.updateNotificationsHtml();

                clearInterval(NotificationOcean.interval);
                NotificationOcean.interval = setInterval(function () {
                    $.when(NotificationOcean.ajax(route)).done(callback);
                }, 1500);
            }

        });
    },

    start: function () {
        NotificationOcean.shell('/get_active_matches', function (res) {

            NotificationOcean.matchesLastUpdate = NotificationOcean.convertMatches(res.data);

            NotificationOcean.addNotifications();

            NotificationOcean.updateNotificationsHtml();
        });
    },

    ajax: function (route) {
        var deferred = $.Deferred();
        $.ajax({
            type: 'put',
            url: route,
            data: {
                match_id: MatchData.matchID
            },
            success: function (response) {
                deferred.resolve(response);
            },
            error: function (response) {
                deferred.reject(response);
            }
        });
        return deferred;
    },

    removeNotification: function(id) {
        $('#notificationList').find('[data-id=' + id + ']').remove();
        delete NotificationOcean.notifications[id];

        if ($('#notificationList').children().length) {
            $('#notificationCount').show().html($('#notificationList').children().length);
        } else {
            $('#notificationCount').hide();
        }
    }
};