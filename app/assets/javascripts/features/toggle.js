var Toggle = {
    createAll: function () {
        $('#toggleOutline').click(function () {
            $('.unit0').toggleClass('noBoarder');
            $('.unit1').toggleClass('noBoarder');
            $.post('/toggle_outlines.json')
        });

        if ((MatchData.firstGame !== 'true')||($(".auxSpace").children().length != 19)) {
            $('#toggleRules').on('click', function () {
                Toggle.showRules();
            });
        }
    },

    showRules: function () {
        $(".map").prepend("<button class='tutorialTotalRules tutorial'>" +
            "<div>" +
            "<h5>Cyvasse Rules</h5>" +
            "<div id='TutorailGoal'><h6 class='title'>Goal:&nbsp&nbsp </h6><h6 class='info'> Capture your opponents king.</h6><img src='/images/svgs/king.svg' style='width: 30px'></div>" +
            "<div><h6 class='title'>Setup:&nbsp&nbsp</h6><h6 class='info'> Each player secretly creates an opening array with their army.</h6></div>" +
            "<div><h6 class='title'>Game:&nbsp&nbsp</h6><h6 class='info'> Players trade moves, until a king is captured.</h6></div>" +
            "<div><h6 class='title'>Combat:&nbsp&nbsp</h6><h6 class='info'>A unit may capture an enemy if the Attacker has more or equal STRENGTH to the Defender.</h6></div>" +
            "<h5>Special Rules</h5>" +
            "<article><h5>Range Units</h5><img src='/images/tutorial/range.png'><h6>Range units, attack from a distance, and block dragon movement, but are vulnerable to any attack.</h6></article>" +
            "<article><h5>Cavalry Units</h5><img src='/images/tutorial/cavalry.png'><h6>Cavalry units, move/attack twice a turn.  In this case the primary movement is 3, and the secondary is 2.</h6></article>" +
            "<article><h5>Your Dragon</h5><img src='/images/tutorial/dragon.png'><h6>A Dragon flys any distance in a straight line, and can only be taken by a Trebuchet, Catapult, or other Dragon.  Opposing range units will block it, but not kill it.</h6></article>" +
            "<article><h5>Trumps</h5><img src='/images/tutorial/trump.png'><h6>Some units TRUMP others, for example, a Spearman will always defeat a Light Horse, even though the Light Horse has equal STRENGTH then the Spearman.</h6></article>" +
            "</div></button>");
        Rotator.rotateOn($('.tutorialTotalRules'));
        $('#toggleRules').off('click').on('click', function () {
            Toggle.hideRules()
        });
    },
    hideRules: function () {
        $('.tutorialTotalRules').remove();
        $('#toggleRules').off('click').on('click', function () {
            Toggle.showRules();
        })
    }
};