var Tutorial = {
    step: 0,
    welcome: function () {
        $(".map").prepend("<button class='tutorialWelcome tutorial'><h5>Welcome to Cyvasse,</h5><h6> here is a quick tutorial on how to play.</h6></button>");
        Rotator.rotateOn($('.tutorialWelcome'));
        setTimeout(function(){
            Tutorial.rules();
        },2000);
    },
    rules: function () {
        $(".map").prepend("<button class='tutorialRules tutorial'><h5>Here are the rules</h5>" +
            "<div><h6 class='title'>Goal:&nbsp&nbsp </h6><h6 class='info'> Capture your opponents king.</h6><img src='/images/svgs/king.svg' style='width: 30px'></div>" +
            "<div><h6 class='title'>Setup:</h6><h6 class='info'> Each player secretly creates an opening array with their army.</h6></div>" +
            "<div><h6 class='title'>Game:</h6><h6 class='info'> Players trade moves, until a king is captured.</h6></div>" +
            "<div><h6 class='title'>Combat:</h6><h6 class='info'>A unit may capture an enemy if the Defender has less STRENGTH then the Attacker</h6></div>" +
            "</button>");
        Rotator.rotateOn($('.tutorialRules'));
        setTimeout(function(){
            Tutorial.selectUnit();
        },15000);
    },
    selectUnit: function () {
        $(".map").prepend("<button class='tutorialSelectUnit tutorial'>&#8599<h5>These are your units, </h5><h6>click one!</h6></button>");
        Rotator.rotateOn($('.tutorialSelectUnit'));
        Tutorial.step = 2
    },
    placeUnit: function (){
        $('.tutorialSelectUnit').remove();
        $('.tutorialWelcome').remove();
        $(".map").prepend("<button class='tutorialStats tutorial'><h5>You can see this units stats here. &#8594</h5><p>Each unit has a STRENGTH and MOVEMENT, used for navigating the board.</p></button>");
        Rotator.rotateOn($('.tutorialStats'));
        setTimeout(function(){
            $(".map").prepend("<button class='tutorialRange tutorial'><h5>Range Units</h5><img src='/images/tutorial/range.png'><p>Some units have a RANGE, which allows them to attack from a distance, and block dragon movement.</p></button>");
            Rotator.rotateOn($('.tutorialRange'));
            $(".map").prepend("<button class='tutorialTrump tutorial'><h5>Trumps</h5><img src='/images/tutorial/trump.png'><p>Some units TRUMP others, for example, a Spearman will always defeat a Heavy Horse, even though the Heavy Horse has more STRENGTH then the Spearman.</p></button>");
            Rotator.rotateOn($('.tutorialTrump'));
            setTimeout(function(){
                $(".map").prepend("<button class='tutorialPlaceUnit tutorial'><h5>Click on a blue hex, to place this unit.</h5></button>");
                Rotator.rotateOn($('.tutorialPlaceUnit'));
            }, 20000);
        }, 5000);
        Tutorial.step = 3;
    },
    secondMove: function (){
        $('.tutorialStats').remove();
        $('.tutorialPlaceUnit').remove();
        $(".map").prepend("<button class='tutorialSecondMove tutorial'>&#8599<h5>Great!  Now you can place your units manually, or randomly place the rest of them. &#8594</h5></button>");
        Rotator.rotateOn($('.tutorialSecondMove'));
        Tutorial.step = 4;
    },
    goal: function (){
        $(".map").prepend("<button class='tutorialGoal tutorial'><img src='/images/svgs/king.svg' style='width: 30px'><h5>The goal of Cyvasse is to capture your opponents king, so hide yours!</h5></button>");
        Rotator.rotateOn($('.tutorialGoal'));
    },
    whoGoesFirst: function (){
        $(".map").prepend("<button class='tutorialWhoGoesFirst tutorial'><h5>The first turn is rewarded to the army whos king is closest to the front line.</h5>&#8596<br></button>");
        Rotator.rotateOn($('.tutorialWhoGoesFirst'));
    },
    startGame: function (){
        $(".map").prepend("<button class='tutorialStartGame tutorial'>&#8594<h5>Your army is now on the board.  You may now start the game!</h5></button>");
        Rotator.rotateOn($('.tutorialStartGame'));
        if ($('.setup2').children('.executeSetup').text() == 'Blank'){
            setTimeout(function(){
                Tutorial.saveSetup();
            },1000);
        } else {
            Tutorial.renameSetup();
        }

//        Tutorial.step += 1
    },
    saveSetup: function () {
        $(".map").prepend("<button class='tutorialSaveSetup tutorial'><h5>&#8592 You can also save this setup, and use it for other matches</h5></button>");
        Rotator.rotateOn($('.tutorialSaveSetup'));
    },
    renameSetup: function () {
        $(".map").prepend("<button class='tutorialRenameSetup tutorial'>&#8592<h5>Now you can name your setup</h5></button>");
        Rotator.rotateOn($('.tutorialRenameSetup'));
    },
    firstTurn: function (){
        $(".map").prepend("<button class='tutorialFirstTurn tutorial'><h5>Looks like your opponent goes first!</h5></button>");
        Rotator.rotateOn($('.tutorialFirstTurn'));
        Tutorial.step = 7
    },
    secondTurn: function(){
        $(".map").prepend("<button class='tutorialSecondTurn tutorial'><h5>Now its your turn, click a piece to see what it can do!</h5></button>");
        Rotator.rotateOn($('.tutorialSecondTurn'));
        Tutorial.step += 1;
    },
    attack: function(){
        $(".map").prepend("<button class='tutorialAttack tutorial'><h5>Blue hexagons can be moved to, and red hexagons are capturable enemies</h5></button>");
        Rotator.rotateOn($('.tutorialAttack'));
        Tutorial.step += 1;
    },
    goodLuck: function(){
        $(".map").prepend("<button class='tutorialGoodLuck tutorial'><h6>And that's all you need to know about Cyvasse.</h6><h5>Good Luck!</h5></button>");
        Rotator.rotateOn($('.tutorialGoodLuck'));
        Tutorial.step += 1;
    },
    checkOutRoot: function(){
        $(".map").prepend("<button class='tutorialCheckIndex tutorial'>&#8598&nbsp&nbsp&nbsp&nbsp<h6>Check out your dashboard, your game saves automatically.</h6></button>");
        Rotator.rotateOn($('.tutorialCheckIndex'));
        Tutorial.step += 1;
    }
};