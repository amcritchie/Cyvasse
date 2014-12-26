var Animation = {
    hslRange: [],
    function: null,
    runAnimation: function () {
        Animation.setRange();
        $('.hexDiv').children('svg').children('polygon').css('fill', 'black');
        $('.hexDiv').children('svg').children('polygon').css('stroke', 'white');

        $('[data-ring=9]').children('svg').children('polygon').css('fill', 'orange');
        var distanceFromUnit = 1;

        Animation.function = setInterval(function () {

            if ((SelectedUnit.unit.attr('data-rank') == 'range')) {
                Animation.updateRangeRing(distanceFromUnit);
            }
            Animation.updateRing(distanceFromUnit);


            distanceFromUnit += 1;

            if ((SelectedUnit.unit.attr('data-rank') == 'range')&&(SelectedUnit.range < distanceFromUnit)) {
                clearInterval(Animation.function)
            } else if ((SelectedUnit.unit.attr('data-rank') == 'cavalry')){
                if ((2*SelectedUnit.movement < distanceFromUnit)) {
                    clearInterval(Animation.function)
                }
            } else if ((SelectedUnit.unit.attr('data-rank') != 'range')&&(SelectedUnit.movement < distanceFromUnit)){
                clearInterval(Animation.function)
            }

        }, 120);

    },

    updateRangeRing: function(distanceFromUnit){

        Animation.updateRangeFill(10, 2, distanceFromUnit);
        Animation.updateStroke('blue', 4, distanceFromUnit,9);
        Animation.updateStroke('blue', 3, distanceFromUnit,9);

        Animation.updateStroke('red', 2, distanceFromUnit,8);
        Animation.updateStroke('red', 1, distanceFromUnit,8);
//        Animation.updateStroke('red', 8, distanceFromUnit,8);

    },

    updateStroke: function(color, code, distanceFromUnit,zIndex){
        $('[data-rangeRing=' + code + '' + (distanceFromUnit - 1) + ']').children('svg').children('polygon').css('stroke', color);
        $('[data-rangeRing=' + code + '' + (distanceFromUnit - 1) + ']').children('svg').css('overflow','overlay');
        $('[data-rangeRing=' + code + '' + (distanceFromUnit - 1) + ']').children('svg').css('z-index',zIndex);
    },

    updateRing: function (distanceFromUnit) {

        Animation.updateFill(240, 1, distanceFromUnit);
        Animation.updateFill(290, 2, distanceFromUnit);
        Animation.updateFill(10, 3, distanceFromUnit);
        Animation.updateFill(10, 4, distanceFromUnit);
        Animation.updateFill(280, 5, distanceFromUnit);

//        Animation.updateFill(200, 6, distanceFromUnit);
//        Animation.updateFill(200, 7, distanceFromUnit);
//        Animation.updateFill(200, 8, distanceFromUnit);

        $('[data-ring=' + 6 + '' + (distanceFromUnit - 1) + ']').children('svg').children('polygon').css('stroke', 'blue');
        $('[data-ring=' + 6 + '' + (distanceFromUnit - 1) + ']').children('svg').css('overflow','overlay');
        $('[data-ring=' + 6 + '' + (distanceFromUnit - 1) + ']').children('svg').css('z-index',8);

        $('[data-ring=' + 7 + '' + (distanceFromUnit - 1) + ']').children('svg').children('polygon').css('stroke', 'red');
        $('[data-ring=' + 7 + '' + (distanceFromUnit - 1) + ']').children('svg').css('overflow','overlay');
        $('[data-ring=' + 7 + '' + (distanceFromUnit - 1) + ']').children('svg').css('z-index',10);

        $('[data-ring=' + 8 + '' + (distanceFromUnit - 1) + ']').children('svg').children('polygon').css('stroke', 'purple');
        $('[data-ring=' + 8 + '' + (distanceFromUnit - 1) + ']').children('svg').css('overflow','overlay');
        $('[data-ring=' + 8 + '' + (distanceFromUnit - 1) + ']').children('svg').css('z-index',9);
//        Animation.updateStroke('blue', 6, distanceFromUnit,8);
//        var color = "hsl(" + 205 + ", " + Animation.hslRange[(distanceFromUnit - 1)] + ")";
//        $('[data-ring=' + 6 + '' + (distanceFromUnit - 1) + ']').children('svg').children('polygon').css('fill', color).css('stroke', color);
//        var color = "hsl(" + 205 + ", " + Animation.hslRange[(distanceFromUnit - 1)] + ")";
//        $('[data-ring=' + 7 + '' + (distanceFromUnit - 1) + ']').children('svg').children('polygon').css('fill', color);
//        var color = "hsl(" + 205 + ", " + Animation.hslRange[(distanceFromUnit - 1)] + ")";
//        $('[data-ring=' + 8 + '' + (distanceFromUnit - 1) + ']').children('svg').children('polygon').css('fill', color);

//        var color = "hsl(" + 240 + ", " + Animation.hslRange[(distanceFromUnit - 1)] + ")";
//        $('[data-ring=' + 6 + '' + (distanceFromUnit - 1) + ']').children('svg').children('polygon').css('stroke', color);

//        var color = "hsl(" + 10 + ", " + Animation.hslRange[(distanceFromUnit - 1)] + ")";
//        $('[data-ring=' + 7 + '' + (distanceFromUnit - 1) + ']').children('svg').children('polygon').css('stroke', color);
//
//        var color = "hsl(" + 280 + ", " + Animation.hslRange[(distanceFromUnit - 1)] + ")";
//        $('[data-ring=' + 8 + '' + (distanceFromUnit - 1) + ']').children('svg').children('polygon').css('stroke', color);
//        Animation.updateFill(10, 7, distanceFromUnit);
//        Animation.updateFill(280, 8, distanceFromUnit);
    },
    updateRangeFill: function (hslColor, code, distanceFromUnit) {
        var color = "hsl(" + hslColor + ", " + Animation.hslRange[(distanceFromUnit - 1)] + ")";
        $('[data-rangeRing=' + code + '' + (distanceFromUnit - 1) + ']').children('svg').children('polygon').css('fill', color);
    },
    updateFill: function (hslColor, code, distanceFromUnit) {
        var color = "hsl(" + hslColor + ", " + Animation.hslRange[(distanceFromUnit - 1)] + ")";
        $('[data-ring=' + code + '' + (distanceFromUnit - 1) + ']').children('svg').children('polygon').css('fill', color);
    },
    setRange: function () {
        if (SelectedUnit.moveRange > 5) {
            Animation.hslRange = [
                '40%,30%', '41%,34%', '42%,38%',
                '43%,42%', '44%,45%', '45%,48%',
                '46%,51%', '47%,54%', '48%,57%',
                '50%,60%'];
        } else {
            Animation.hslRange = [
                '40%,30%', '42%,39%', '44%,47%',
                '46%,50%', '48%,55%', '50%,60%'];
        }
    }
};