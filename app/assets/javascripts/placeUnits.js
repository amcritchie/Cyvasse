var PlaceUnits = {
    byArray:function(teamArray,team){
        $.each(teamArray, function (i, e) {
            var location = e[1];
            if ($.isNumeric(location)){
                location = parseInt(e[1]);
                if (You.team == 0){
                    location = 92 - location
                }
            }
            Game.moveUnits([e[0],location], team);
        });
    }
};