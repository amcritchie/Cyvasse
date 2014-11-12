var SelectedUnit = {
    unit: null,
    team: null,

    xPos: null,
    yPos: null,

    movement: null,
    range: null,

    strength: null,
    moveRange: null,
    attackRange: null,

    update: function (newUnit) {
        SelectedUnit.unit = newUnit;
        SelectedUnit.team = parseInt(newUnit.attr('data-team'));

        SelectedUnit.xPos = parseInt(newUnit.parent().attr('data-xPosss'));
        SelectedUnit.yPos = parseInt(newUnit.parent().attr('data-yPosss'));

        SelectedUnit.strength = parseInt(newUnit.attr('data-attack'));
        SelectedUnit.movement = parseInt(newUnit.attr('data-moverange'));
        SelectedUnit.range = parseInt(newUnit.attr('data-attackrange'));

        SelectedUnit.moveRange = parseInt(newUnit.attr('data-moverange'));
        SelectedUnit.attackRange = parseInt(newUnit.attr('data-attackrange'));
    }
};