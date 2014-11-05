// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

var row = 1;
var col = 1;
var hexCount = 1;

function hex(row,col,hexIndex){
    var height = 30;
    var width = 52;
    var hypotenuse = 60;
    var hex_scale = 5.36;
    var size;

    if (row < 7){
        size = row + 5
    } else {
        size = 17 - row
    }

    if (row > 6){
        var theClass = "selectedRange";
    }else{
        var theClass = "unSelected"
    }

    if (row > 6){
        var initialRange = true;
    }else{
        var initialRange = false
    }


    return "<div class='ssquare' id='hex" + hexIndex + "' " +
        "data-rangeStatus=" + theClass + " data-xPosss=" + parseInt(col) + " data-yPosss=" + parseInt(row) + " " +
        "data-size=" + size + " data-occupied=false data-even=true data-src=nil " +
        "data-innRange=" + initialRange + " data-off=nil data-movement=nil  data-range=nil>" +
        "<svg class='brick'>" +

        "<polygon class=" + theClass + " data-x-pos=" + col + " data-y-pos=" + row + " " +
        "data-size=" + size + " data-even='true'" +
        "points='" + (width * hex_scale) + ",0 0," + (height*hex_scale) + "" +
        " 0," + (height+hypotenuse)*hex_scale + "" +
        " " + width*hex_scale + "," + (hypotenuse*2)*hex_scale + "" +
        " " + (width*2)*hex_scale + "," + (height+hypotenuse)*hex_scale+ "" +
        " " + (width*2)*hex_scale + "," + (height)*hex_scale + "'/>" +
        "</svg></div>"
}


function create_row(size){
    var array = [];
    for (var i = 0; i < size; i++) {
        array.push(hex(row,col, hexCount));
        hexCount = hexCount + 1;
        col = col + 1;
    }
    return array;
}

function create_map(){
    var array = [];
//    var roww = 1;
//    var coll = 1;
    for (var i = 0; i < 11; i++) {
        if (i < 6){
            array.push(create_row(6 + i ))
        }else{
            array.push(create_row(16 - i))
        }
//        roww = roww + 1;
        row = row + 1;
        col = 1;
    }
    row = 1;
    hexCount = 1;
    return array;
}

function createUnit(index,nameArray,movement,strength,range,flank,team){


//    var classs = "newUnit";
    var name = nameArray.join(" ");
    var codename = nameArray.join("");
    var code = "trebuchet-aa9661cf55458eff1d003546e8fcfda9";

    var svg = '/images/svgs/' + codename + '.svg';

    return "<img alt='" + name + "' " +


        "data-movement='" + movement + "' data-strength=" + strength + " " +
        "data-range=" + range + " data-flank=" + flank + " " +
        "data-trump=" + name + " data-team=" + team + " data-status='unplaced' " +
        "id=" + codename + " src=" + svg + " " +

        "data-index=" + parseInt(index + 1) + " data-inrange=" + name + " " +

        "data-alive=" + name + " data-codename=" + name + " data-englishname=" + name + " " +

        "data-x-pos=" + name + " data-xpos=" + name + " " +
        "data-y-pos=" + name + " data-ypos=" + name + " " +
        "data-rowsize=" + name +">"

}

function createAllUnits(team){
    var array = [];

    array.push(createUnit(array.length,["rabble"],2,1,0,1,team));
    array.push(createUnit(array.length,["rabble"],2,1,0,1,team));
    array.push(createUnit(array.length,["rabble"],2,1,0,1,team));
    array.push(createUnit(array.length,["spearman"],2,2,0,2,team));
    array.push(createUnit(array.length,["spearman"],2,2,0,2,team));
    array.push(createUnit(array.length,["elephant"],3,4,0,1,team));
    array.push(createUnit(array.length,["elephant"],3,4,0,1,team));
    array.push(createUnit(array.length,["light","horse"],4,2,0,1,team));
    array.push(createUnit(array.length,["light","horse"],4,2,0,1,team));
    array.push(createUnit(array.length,["heavy","horse"],3,3,0,1,team));
    array.push(createUnit(array.length,["heavy","horse"],3,3,0,1,team));
    array.push(createUnit(array.length,["crossbowman"],2,1,2,1,team));
    array.push(createUnit(array.length,["crossbowman"],2,1,2,1,team));

    array.push(createUnit(array.length,["catapult"],2,3,3,1,team));
    array.push(createUnit(array.length,["catapult"],2,3,3,1,team));

    array.push(createUnit(array.length,["trebuchet"],1,4,4,1,team));
    array.push(createUnit(array.length,["mountain"],0,9,0,0,team));
    array.push(createUnit(array.length,["mountain"],0,9,0,0,team));

    array.push(createUnit(array.length,["dragon"],6,5,0,0,team));
    array.push(createUnit(array.length,["king"],2,1,0,1,team));

    return array
}

function loadMapAndUnits(units,map,enemies){

    $(".auxSpace").prepend(units);
//    $(".map").prepend(map);
    $(".xxboard").prepend(map);

    $(".enemyBay").prepend(enemies)
}

function loadEverything(){

    var map = { thearray: create_map() };
    var templateMap = JST['views/map'];
    var result = templateMap(map);

    var hash = { units: createAllUnits(1)};
    var templateUnits = JST['views/units'];
    var units = templateUnits(hash);

    var enemyHash = { enemies: createAllUnits(0) };
    var templateEnemies = JST['views/enemies'];
    var enemies = templateEnemies(enemyHash);

    loadMapAndUnits(units,result,enemies);
}

$(document).ready(function () {


    // underline under the active nav item
    $(".nav .nav-link").click(function () {
        $(".nav .nav-link").each(function () {
            $(this).removeClass("active-nav-item");
        });
        $(this).addClass("active-nav-item");
        $(".nav .more").removeClass("active-nav-item");
    });
});