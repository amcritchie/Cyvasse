
var CreateUnits = {

    index: null,
    team: null,
    rabble: {rank: 'vangaurd', name: ['rabble'], attack: 1, defence: 1, moveRange: 3, attackRange: 0, flank: 2, trump:['none']},
    spearman: {rank: 'vangaurd', name: ['spearman'], attack: 2, defence: 2, moveRange: 2, attackRange: 0, flank: 1, trump:['lighthorse','heavyhorse']},
    elephant: {rank: 'vangaurd', name: ['elephant'], attack: 4, defence: 4, moveRange: 3, attackRange: 0, flank: 1, trump:['none']},

    lightHorse: {rank: 'cavalry', name: ["light", "horse"], attack: 2, defence: 2, moveRange: 5, attackRange: 0, flank: 1, trump:['none']},
    heavyHorse: {rank: 'cavalry', name: ["heavy", "horse"], attack: 3, defence: 3, moveRange: 4, attackRange: 0, flank: 1, trump:['none']},

    crossbowman: {rank: 'range', name: ['crossbowman'], attack: 2, defence: 1, moveRange: 1, attackRange: 2, flank: 0, trump:['none']},
    trebuchet: {rank: 'range', name: ['trebuchet'], attack: 1, defence: 1, moveRange: 1, attackRange: 3, flank: 0, trump:['dragon']},
    catapult: {rank: 'range', name: ['catapult'], attack: 4, defence: 1, moveRange: 2, attackRange: 3, flank: 0, trump:['none']},

    dragon: {rank: 'unique', name: ['dragon'], attack: 5, defence: 5, moveRange: 10, attackRange: 0, flank: 0, trump:['none']},
    king: {rank: 'unique', name: ['king'], attack: 2, defence: 2, moveRange: 2, attackRange: 0, flank: 0, trump:['none']},

    mountain: {rank: 'mountain', name: ['mountain'], attack: 9, defence: 9, moveRange: 0, attackRange: 0, flank: 0, trump:['none']},

    run: function (team, array) {
        CreateUnits.index = 0;
        CreateUnits.team = team;
        var array = [];
        array = array.concat(CreateUnits.createVangaurd());
        array = array.concat(CreateUnits.createCavalry());
        array = array.concat(CreateUnits.createRange());
        array = array.concat(CreateUnits.createUniqueAndMountains());
        return array;
    },

    createVangaurd: function () {
        var htmlString = [];
        htmlString = htmlString.concat(CreateUnits.createSet(3, CreateUnits.rabble));
        htmlString = htmlString.concat(CreateUnits.createSet(2, CreateUnits.spearman));
        htmlString = htmlString.concat(CreateUnits.createSet(2, CreateUnits.elephant));
        return htmlString
    },

    createCavalry: function () {
        var htmlString = [];
        htmlString = htmlString.concat(CreateUnits.createSet(2, CreateUnits.lightHorse));
        htmlString = htmlString.concat(CreateUnits.createSet(2, CreateUnits.heavyHorse));
        return htmlString
    },

    createRange: function () {
        var htmlString = [];
        htmlString = htmlString.concat(CreateUnits.createSet(2, CreateUnits.crossbowman));
        htmlString = htmlString.concat(CreateUnits.createSet(1, CreateUnits.trebuchet));
        htmlString = htmlString.concat(CreateUnits.createSet(1, CreateUnits.catapult));
        return htmlString
    },

    createUniqueAndMountains: function () {
        var htmlString = [];
        htmlString = htmlString.concat(CreateUnits.createSet(1, CreateUnits.dragon));
        htmlString = htmlString.concat(CreateUnits.createSet(1, CreateUnits.king));
        htmlString = htmlString.concat(CreateUnits.createSet(2, CreateUnits.mountain));
        return htmlString
    },

    createSet: function (quantity, unitAttributes) {
        var htmlString = [];
        for (var i = 0; i < quantity; i++) {
            htmlString.push(CreateUnits.createUnit(unitAttributes));
        }
        return htmlString
    },

    createUnit: function (attributes) {
        var name = attributes.name.join(" ");
        var codename = attributes.name.join("");
        var code = "trebuchet-aa9661cf55458eff1d003546e8fcfda9";

        var svg = '/images/svgs/' + codename + '.svg';
        var noBoarder = '';

        if (You.outlines == 'true'){

        }else{
            noBoarder = 'noBoarder'
        }

        CreateUnits.index += 1;
        return "<img class='unit"+CreateUnits.team+" "+noBoarder+"' alt='" + name + "' data-rank=" + attributes.rank + "" +
            " data-attack=" + attributes.attack + " " + " data-defence=" + attributes.defence +
            " data-moveRange=" + attributes.moveRange + " data-attackRange=" + attributes.attackRange +
            " data-flank=" + attributes.flank + " " + "data-trump=" + attributes.trump + " data-team=" + CreateUnits.team +
            " data-status='unplaced' " + "id=" + codename + " src=" + svg + " " +

            "data-index=" + CreateUnits.index + " data-inrange=" + name + " " +

            "data-alive=" + name + " data-codename=" + codename + " data-englishname=" + name + " >";
    },

    createAllUnits: function(team){
        var array = [];
        array = array.concat(CreateUnits.run(team, array));
        return array
    }
};