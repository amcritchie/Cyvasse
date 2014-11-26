var Neighbors = {
    idsOfNeighbors: function(examinedHex){
        var id = examinedHex.getAttribute('data-hexIndex');
        var xPos = parseInt(examinedHex.getAttribute('data-xPos'));
        var yPos = parseInt(examinedHex.getAttribute('data-yPos'));
        var neighbors = [];
        if (id < 41) {
            neighbors = [
                    '#hex_' + (xPos - 1) + '_' + (yPos - 1),
                    '#hex_' + xPos + '_' + (yPos - 1),
                    '#hex_' + (xPos + 1) + '_' + yPos,
                    '#hex_' + (xPos - 1) + '_' + yPos,
                    '#hex_' + (xPos + 1) + '_' + (yPos + 1),
                    '#hex_' + xPos + '_' + (yPos + 1),
            ];
        } else if (id < 52) {
            neighbors = [
                    '#hex_' + (xPos - 1) + '_' + (yPos - 1),
                    '#hex_' + (xPos + 1) + '_' + yPos,
                    '#hex_' + (xPos - 1) + '_' + yPos,
                    '#hex_' + (xPos - 1) + '_' + (yPos + 1),
                    '#hex_' + xPos + '_' + (yPos - 1),
                    '#hex_' + xPos + '_' + (yPos + 1),
            ];
        } else {
            neighbors = [
                    '#hex_' + xPos + '_' + (yPos - 1),
                    '#hex_' + (xPos + 1) + '_' + (yPos - 1),
                    '#hex_' + (xPos + 1) + '_' + yPos,
                    '#hex_' + (xPos - 1) + '_' + yPos,
                    '#hex_' + (xPos - 1) + '_' + (yPos + 1),
                    '#hex_' + xPos + '_' + (yPos + 1),
            ];
        }
        return neighbors;
    }
};