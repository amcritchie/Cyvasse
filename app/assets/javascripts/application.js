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
//= require jquery.plugin.min
//= require jquery.countdown.min

var $allHexDivs;
var $allHexSVGs;
var $allHexPoly;

$(document).ready(function () {

    RootJavaScript.register();
    MatchJavaScript.register();
    AlwaysJavaScript.load();

    $('#button').on('click', function () {
        $(this).css('backround-color', 'blue')
    });

//    var img = new Image();
//    $.when(minTime(), onImageLoad()).then(function () {
//        $(".background-image").css("background-image", "url('" + img.src + "')").fadeIn('medium');
//        $(".page-load-spinner").fadeOut('medium');
//    });
//    function minTime() {
//        var minLoadTime = 500;
//        var deferred = $.Deferred();
//        setTimeout(function () {
//            deferred.resolve();
//        }, minLoadTime);
//        return deferred;
//    }
//    function onImageLoad() {
//        var deferred = $.Deferred();
//        img.src = "http://farm1.staticflickr.com/293/18278124840_42bcd162cb_b.jpg";
//        img.onload = function () {
//            deferred.resolve();
//        };
//        return deferred;
//    }
});