var SelectedUnit = {
    unit: null,
    team: null,

    rank: null,

    xPos: null,
    yPos: null,

    movement: null,
    range: null,

    trump: null,

    strength: null,
    moveRange: null,
    attackRange: null,

    update: function (newUnit) {
        SelectedUnit.unit = newUnit;
        SelectedUnit.team = parseInt(newUnit.attr('data-team'));
        SelectedUnit.rank = newUnit.attr('data-rank');

        SelectedUnit.xPos = parseInt(newUnit.parent().attr('data-xPos'));
        SelectedUnit.yPos = parseInt(newUnit.parent().attr('data-yPos'));

        SelectedUnit.strength = parseInt(newUnit.attr('data-attack'));
        SelectedUnit.movement = parseInt(newUnit.attr('data-moverange'));
        SelectedUnit.range = parseInt(newUnit.attr('data-attackrange'));

        SelectedUnit.moveRange = parseInt(newUnit.attr('data-moverange'));
        SelectedUnit.attackRange = parseInt(newUnit.attr('data-attackrange'));

        SelectedUnit.trump = newUnit.attr('data-trump').split(',')
    }
};