var Death = {

    graveCount: 0,

    unitKilled: function (unit) {
        Death.graveCount += 1;
        var grave = ('<div class="grave" id="gra' + Death.graveCount + '"></div>');

        unit.attr('data-status', 'dead');

        $('#grav' + Offense.defense).append(grave);
        $('#gra' + Death.graveCount + '').prepend(unit);
    }

};