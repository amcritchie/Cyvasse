var Animation = {
    hslRange: [],
    function: null,
    runAnimation: function () {
        Animation.setRange();
        $('.hexDiv').children('svg').children('polygon').css('fill', 'black');
        var distanceFromUnit = 1;
        Animation.function = setInterval(function () {
            Animation.updateRing(distanceFromUnit);
            distanceFromUnit += 1;
            if (SelectedUnit.movement < distanceFromUnit) {
                clearInterval(Animation.function)
            }
        }, 250);
    },
    updateRing: function (distanceFromUnit) {
        Animation.updateColor(240, 1, distanceFromUnit);
        Animation.updateColor(115, 4, distanceFromUnit);
        Animation.updateColor(10, 3, distanceFromUnit);
        Animation.updateColor(290, 2, distanceFromUnit);
    },
    updateColor: function (hslColor, code, distanceFromUnit) {
        var color = "hsl(" + hslColor + ", " + Animation.hslRange[(distanceFromUnit - 1)] + ")";
        $('[data-ring=' + code + '' + distanceFromUnit + ']').children('svg').children('polygon').css('fill', color);
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