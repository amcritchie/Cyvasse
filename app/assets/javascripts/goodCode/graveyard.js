var Death = {
    graveCount: 0,
    unitKilled: function (unit) {
        Death.graveCount += 1;
        unit.attr('data-status', 'dead');
        $('#g' + Offense.defense + '').prepend(unit);
    }
};