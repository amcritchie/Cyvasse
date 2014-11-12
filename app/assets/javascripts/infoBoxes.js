var InfoBoxes = {

    registerHoverUnit: function(){
        var $hoverableRange = $('img[data-team]');
        $hoverableRange.on({
            mouseenter: function () {
                InfoBoxes.updateHoverBox($(this));
            },
            mouseleave: function () {
                $('.hideHoveredUnitInfo').css('visibility', 'hidden');
            }
        });
    },

    updateHoverBox: function(unit){

        $('.hideHoveredUnitInfo').css('visibility', 'visible');

        $('#hoverName').empty().append(capitalizeEachWord(unit.attr('alt')));
        $('#hoverUnitImage').attr('src', "../images/svgs/" + unit.attr('id') + ".svg");

        $('#hoverOffense').empty().append('Attack: ' + unit.data('attack'));
        $('#hoverDefence').empty().append('Armor: ' + unit.data('defence'));
        $('#hoverMvRange').empty().append('Moves: ' + unit.data('moverange'));
        $('#hoverUtRange').empty().append('Trump: ' + unit.data('trump'));
    },

    updateSelectBox: function(unit){
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