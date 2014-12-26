var MoveRings = {
    offenseTeam: null,
    defenseTeam: null,
    selectedUnit: null,
    selectedTrumps: null,

    createRings: function (selectedUnit, potentialRange) {
        var ring = 0;
        MoveRings.offenseTeam = selectedUnit.attr('data-team');
        MoveRings.defenseTeam = Math.abs(MoveRings.offenseTeam - 1);
        MoveRings.selectedUnit = selectedUnit[0];
        MoveRings.selectedTrumps = selectedUnit[0].getAttribute('data-trump').split(',');
        while (ring < MoveRings.selectedUnit.getAttribute('data-moveRange')) {
            potentialRange = potentialRange.not('[data-locked=true]');
            MoveRings.nextRingOfHexagons(potentialRange, ring);
            ring += 1;
        }
    },

    nextRingOfHexagons: function (hexRange, lastRingNum) {
        Array.prototype.slice.call(hexRange).forEach(function (hex) {
            if (MoveRings.searchAdjacentHex(hex, 'data-ring', lastRingNum + 9) == 'true') {
                var image;
                var imageTrumpArray;
                Array.prototype.slice.call(hex.children).forEach(function (child) {
                    if (child.tagName == 'IMG') {
                        image = child;
                        imageTrumpArray = image.getAttribute('data-trump').split(',');
                        return;
                    }
                });
                if (MoveRings.selectedUnit.getAttribute('alt') == 'dragon') {
                    MoveRings.createDragonRings(image, hex, lastRingNum);
                } else {
                    MoveRings.createNonDragonRings(image, imageTrumpArray, hex, lastRingNum)
                }
                hex.setAttribute('data-locked', true);
            }
        });
    },
    searchAdjacentHex: function (examinedHex, attributeName, attribute) {
        var passing = 'false';
        var neighbors = Neighbors.idsOfNeighbors(examinedHex);
        neighbors.forEach(function (e) {
            var neighbor = $('.board').find(e);
            if (MoveRings.hasAPath(neighbor, attribute, attributeName)) {
                passing = 'true'
            }
        });
        return passing
    },
    hasAPath: function (neighbor, attribute, attributeName) {
        return (
            (neighbor.attr(attributeName) == attribute) ||
            (neighbor.attr(attributeName) == (attribute + 10)) ||
            (neighbor.attr(attributeName) == (attribute + 20)) ||
            (neighbor.attr(attributeName) == (attribute + 50)))
    },
    createNonDragonRings: function (image, imageTrumpArray, hex, lastRingNum) {
        if (image) {
            if (image.getAttribute('alt') == 'mountain') {
                hex.setAttribute('data-ring', (lastRingNum + 50));
            } else if (image.getAttribute('data-team') == MoveRings.offenseTeam) {
                hex.setAttribute('data-ring', (lastRingNum + 50));

            } else if (image.getAttribute('data-team') == MoveRings.defenseTeam) {

                if (image.getAttribute('data-defence') > MoveRings.selectedUnit.getAttribute('data-attack')) {
                    hex.setAttribute('data-ring', (lastRingNum + 50));
                } else {
                    hex.setAttribute('data-ring', (lastRingNum + 40));
                }
                if (MoveRings.selectedTrumps[0] != 'none') {

                    MoveRings.selectedTrumps.forEach(function (e) {
                        if (e == image.getAttribute('data-codename')) {
                            hex.setAttribute('data-ring', (lastRingNum + 40));
                        }
                    });
                }
                if (imageTrumpArray[0] != 'none') {
                    imageTrumpArray.forEach(function (e) {
                        if (e == MoveRings.selectedUnit.getAttribute('data-codename')) {
                            hex.setAttribute('data-ring', (lastRingNum + 50));
                        }
                    });
                }
            }
        } else {
            hex.setAttribute('data-ring', (lastRingNum + 10));
        }
    },
    createDragonRings: function (image, hex, lastRingNum) {
        if (image) {
            MoveRings.dragonVsNonEmptyHex(image, hex, lastRingNum)
        } else {
            hex.setAttribute('data-ring', (lastRingNum + 10));
        }
    },
    dragonVsNonEmptyHex: function (image, hex, lastRingNum) {
        if (image.getAttribute('alt') == 'mountain') {
            hex.setAttribute('data-ring', (lastRingNum + 20));
        } else if (image.getAttribute('data-team') == MoveRings.offenseTeam) {
            hex.setAttribute('data-ring', (lastRingNum + 20));
        } else if (image.getAttribute('data-team') == MoveRings.defenseTeam) {
            MoveRings.dragonVsEnemy(image, hex, lastRingNum);
        }
    },
    dragonVsEnemy: function (image, hex, lastRingNum) {
        if ((image.getAttribute('data-rank') == 'range') || (image.getAttribute('alt') == 'dragon')) {
            if (image.getAttribute('alt') == 'trebuchet') {
                hex.setAttribute('data-ring', (lastRingNum + 50));
            } else {
                hex.setAttribute('data-ring', (lastRingNum + 40));
            }
        } else {
            hex.setAttribute('data-ring', (lastRingNum + 30));
        }
    }
};

var CavalryMoveRings = {
    offenseTeam: null,
    defenseTeam: null,
    selectedUnit: null,
    selectedTrumps: null,

    createRings: function (selectedUnit, potentialRange) {
        var ring = 0;
        CavalryMoveRings.offenseTeam = selectedUnit.attr('data-team');
        CavalryMoveRings.defenseTeam = Math.abs(CavalryMoveRings.offenseTeam - 1);
        CavalryMoveRings.selectedUnit = selectedUnit[0];
        CavalryMoveRings.selectedTrumps = selectedUnit[0].getAttribute('data-trump').split(',');
        while (ring < 2 * CavalryMoveRings.selectedUnit.getAttribute('data-moveRange')) {
            potentialRange = potentialRange.not('[data-locked=true]');
            CavalryMoveRings.nextRingOfHexagons(potentialRange, ring);
            ring += 1;
        }
    },

    nextRingOfHexagons: function (hexRange, lastRingNum) {
        Array.prototype.slice.call(hexRange).forEach(function (hex) {
            if (CavalryMoveRings.searchAdjacentHex(hex, 'data-ring', lastRingNum + 9) == 'true') {
                var image;
                var imageTrumpArray;
                Array.prototype.slice.call(hex.children).forEach(function (child) {
                    if (child.tagName == 'IMG') {
                        image = child;
                        imageTrumpArray = image.getAttribute('data-trump').split(',');
                        return;
                    }
                });
                if (CavalryMoveRings.selectedUnit.getAttribute('alt') == 'dragon') {
                    CavalryMoveRings.createDragonRings(image, hex, lastRingNum);
                } else {
                    CavalryMoveRings.createNonDragonRings(image, imageTrumpArray, hex, lastRingNum)
                }
                hex.setAttribute('data-locked', true);
            }
        });
    },
    searchAdjacentHex: function (examinedHex, attributeName, attribute) {
        var passing = 'false';
        var neighbors = Neighbors.idsOfNeighbors(examinedHex);
        neighbors.forEach(function (e) {
            var neighbor = $('.board').find(e);
            if (CavalryMoveRings.hasAPath(neighbor, attribute, attributeName)) {
                passing = 'true'
            }
        });
        return passing
    },
    hasAPath: function (neighbor, attribute, attributeName) {
        return (
            (neighbor.attr(attributeName) == attribute) ||
            (neighbor.attr(attributeName) == (attribute + 10)) ||
            (neighbor.attr(attributeName) == (attribute + 20)) ||
            (neighbor.attr(attributeName) == (attribute + 50)))
    },
    createNonDragonRings: function (image, imageTrumpArray, hex, lastRingNum) {
        if (image) {
            if (image.getAttribute('alt') == 'mountain') {
                hex.setAttribute('data-ring', (lastRingNum + 80));
            } else if (image.getAttribute('data-team') == CavalryMoveRings.offenseTeam) {
                hex.setAttribute('data-ring', (lastRingNum + 80));

            } else if (image.getAttribute('data-team') == CavalryMoveRings.defenseTeam) {

                if (image.getAttribute('data-defence') > CavalryMoveRings.selectedUnit.getAttribute('data-attack')) {
                    hex.setAttribute('data-ring', (lastRingNum + 80));
                } else {
                    hex.setAttribute('data-ring', (lastRingNum + 70));
                }
                if (CavalryMoveRings.selectedTrumps[0] != 'none') {

                    CavalryMoveRings.selectedTrumps.forEach(function (e) {
                        if (e == image.getAttribute('data-codename')) {
                            hex.setAttribute('data-ring', (lastRingNum + 70));
                        }
                    });
                }
                if (imageTrumpArray[0] != 'none') {
                    imageTrumpArray.forEach(function (e) {
                        if (e == CavalryMoveRings.selectedUnit.getAttribute('data-codename')) {
                            hex.setAttribute('data-ring', (lastRingNum + 80));
                        }
                    });
                }
            }
        } else {
            hex.setAttribute('data-ring', (lastRingNum + 60));
        }
    }
};