var Map = {
    row: 1,
    col: 1,
    index: 1,
    createMap: function () {
        var array = [];
        for (var i = 0; i < 11; i++) {
            if (i < 6) {
                array.push(Map.createRow(6 + i))
            } else {
                array.push(Map.createRow(16 - i))
            }
            Map.row += 1;
            Map.col = 1;
        }
        Map.row = 1;
        Map.index = 1;
        return array;
    },
    createRow: function (size) {
        var array = [];
        for (var i = 0; i < size; i++) {
            array.push(Map.createHex());
            Map.index += 1;
            Map.col += 1;
        }
        return array;
    },
    createHex: function () {
        var height = 30;
        var width = 52;
        var hypotenuse = 60;
        var hex_scale = 5.36;
        var size;

        if (Map.row < 7) {
            size = Map.row + 5
        } else {
            size = 17 - Map.row
        }

//        var theClass = "hexPolygon";

        var ring;
        if (Map.row > 6) {
            ring = 1;
        } else {
            ring = 0;
        }
        return "<div class='hexDiv' id='hex_" + parseInt(Map.col) + "_" + parseInt(Map.row) + "' " +
            " data-hexIndex='" + Map.index + "' " +
            " data-ring=" + ring + " data-locked=false " +
            " data-rangeRing=0 data-rangeLocked=false " +
            " data-xPosss=" + parseInt(Map.col) + " data-yPosss=" + parseInt(Map.row) + " " +
            " data-size=" + size + " data-occupied=false data-even=true data-src=nil " +
            " data-off=nil data-movement=nil  data-range=nil>" +
            "<svg class='hexSVG'>" +

            "<polygon class='hexPolygon'" +
            " data-size=" + size + " data-even='true'" +
            " points='" + (width * hex_scale) + ",0 0," + (height * hex_scale) + "" +
            " 0," + (height + hypotenuse) * hex_scale + "" +
            " " + width * hex_scale + "," + (hypotenuse * 2) * hex_scale + "" +
            " " + (width * 2) * hex_scale + "," + (height + hypotenuse) * hex_scale + "" +
            " " + (width * 2) * hex_scale + "," + (height) * hex_scale + "'/>" +
            "</svg></div>"
    }
};