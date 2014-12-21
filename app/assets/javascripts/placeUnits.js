var AwayTeamNormalize = {
    placeUnits:function(teamArray,team){
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
    },
    placeLastMove: function(){
        if (Game.lastMove == ""){
            Game.lastMove = ['1','2']
        } else {
            Game.lastMove = Game.lastMove.split(',');
            if (You.team == 0){
                Game.lastMove = [92 - Game.lastMove[0],92 - Game.lastMove[1]]
            }
        }
    }
};

var NoTeamNormalize = {
    placeUnits:function(teamArray,team){
        $.each(teamArray, function (i, e) {
            var location = e[1];
            if ($.isNumeric(location)){
                location = parseInt(e[1]);
//                if (You.team == 0){
//                    location = 92 - location
//                }
            }
            Game.moveUnits([e[0],location], team);
        });
    }
};

