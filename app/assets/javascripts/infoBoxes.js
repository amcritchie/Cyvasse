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

        var trumps = unit.data('trump').split(',');
        var string = '';

        var name = unit.attr('alt');
        trumps.forEach(function (e) {
            string += '<img class="trumpImage" src="../images/svgs/' + e + '.svg" >'
        });

        $('.hideHoveredUnitInfo').css('visibility', 'visible');
        $('#hoverName').empty().append(capitalizeEachWord(name));
        $('#hoverUnitImage').attr('src', "../images/svgs/" + unit.attr('id') + ".svg");
        arrayOfTrumps = unit.data('trump').split(',');

        if (name == 'mountain'){
            $('#hoverOffense').empty().append('Impassable');
            $('#hoverMvRange').empty();
            $('#hoverUtility').empty();
        } else {
            if (name == 'dragon'){
                $('#hoverMvRange').empty().append('Movement:  ∞');
            }else{
                $('#hoverMvRange').empty().append('Movement:  ' + unit.data('moverange'));
            }

            $('#hoverOffense').empty().append('Strength: ' + unit.data('attack'));
            if (unit.data('rank') == 'range'){
                $('#hoverUtility').empty().append('Range: ' + unit.data('attackrange'));
            }else{

                $('#hoverUtility').empty().append('Flank: ' + unit.data('flank'));
            }
        }

        if (string.length > 55){

            $('#hoverTrump').empty().append('<p>Trump: </p>' + string);
        } else {
            $('#hoverTrump').empty();
        }
    },

    updateSelectBox: function(unit){

        var trumps = unit.data('trump').split(',');
        var string = '';

        var name = unit.attr('alt');
        var rank = unit.data('rank');

        trumps.forEach(function (e) {
            string += '<img class="trumpImage" src="../images/svgs/' + e + '.svg" >'
        });

        $('.hideSelectedUnitInfo').css('visibility', 'visible');
        $('#selectUnitName').empty().append(capitalizeEachWord(name));
        $('.selectedUnitImage').attr('src', "../images/svgs/" + unit.attr('id') + ".svg");
        $('#selectUnitClass').children('.value').empty().append(capitalizeEachWord(rank));

        if (name == 'mountain'){
            $('#selectUnitStrength').children('.value').empty().append('Impassable');
            $('#selectUnitMoveRange').hide();
            $('#selectUnitUtility').hide();
            $('#selectUnitTrump').hide();
        }else{
            if (rank == 'unique'){
                $('#selectUnitUtility').hide();
                if (name == 'dragon'){
                    $('#selectUnitMoveRange').show().children('.value').empty().append('Straight Line');
                }else{
                    $('#selectUnitMoveRange').show().children('.value').empty().append(unit.data('moverange'));
                }
            }else{
                $('#selectUnitMoveRange').show().children('.value').empty().append(unit.data('moverange'));

                if (rank == 'range'){
                    $('#selectUnitUtility').show().children('.value').empty().append(unit.data('attackrange'));
                    $('#selectUnitUtility').show().children('.key').empty().append('Range');
                } else {
                    $('#selectUnitUtility').show().children('.value').empty().append(unit.data('flank'));
                    $('#selectUnitUtility').show().children('.key').empty().append('Flank');
                }
            }
            $('#selectUnitStrength').children('.value').empty().append(unit.data('attack'));
        }


        if (string.length > 55){
            $('#selectUnitTrump').show().children('.value').empty().append(string)
        } else {
            $('#selectUnitTrump').children('.value').empty()

        }
    }
};