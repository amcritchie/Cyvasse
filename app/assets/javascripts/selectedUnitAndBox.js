
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

        debugger;
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

var SelectBox = {
    update: function (unit) {
        $('.hideSelectedUnitInfo').css('visibility', 'visible');

        $('#selectUnitName').empty().append(capitalizeEachWord(unit.attr('alt')));

        $('.selectedUnitImage').attr('src', "../images/svgs/" + unit.attr('id') + ".svg");

        $('.selectedUnitAttack').empty().append(unit.data('attack'));
        $('.selectedUnitDefence').empty().append(unit.data('defence'));
        $('.selectedUnitMovement').empty().append(unit.data('moverange'));

        $('.selectedUnitUtility').empty().append(unit.data('range'));
        $('.selectedUnitTrump').empty().append(unit.data('flank'));
    }
};