var Tutorial = {
    step: 0,
    welcome: function () {
        $(".map").prepend("<button class='tutorialWelcome tutorial'><h5>Welcome to Cyvasse,</h5><h6> here is a quick tutorial on how to play.</h6><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialWelcome'));
        setTimeout(function(){
            Tutorial.selectUnit();
        },1000);
    },
    selectUnit: function () {
        $(".map").prepend("<button class='tutorialSelectUnit tutorial'>&#8599<h5>These are your units,</h5><h6>click one.</h6><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialSelectUnit'));
        Tutorial.step = 2
    },
    placeUnit: function (){
        $(".map").prepend("<button class='tutorialStats tutorial'><h5>You can see this units stats here. &#8594</h5><p>(Each unit has different strengths and abilities so check them all out)</p><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialStats'));
        $(".map").prepend("<button class='tutorialPlaceUnit tutorial'><h5>Click on a blue hex, to place this unit.</h5><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialPlaceUnit'));
        Tutorial.step = 3;
    },
    secondMove: function (){
        $(".map").prepend("<button class='tutorialSecondMove tutorial'>&#8599<h5>Great!  Now you can place your units manually, or randomly place the rest of them. &#8594</h5><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialSecondMove'));
        Tutorial.step = 4;
    },
    goal: function (){
        $(".map").prepend("<button class='tutorialGoal tutorial'><img src='/images/svgs/king.svg' style='width: 30px'><h5>The goal of Cyvasse is to capture your opponents king, so hide yours!</h5><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialGoal'));
    },
    whoGoesFirst: function (){
        $(".map").prepend("<button class='tutorialWhoGoesFirst tutorial'><h5>The first turn is rewarded to the army whos king is closest to the front line.</h5>&#8596<br><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialWhoGoesFirst'));
    },
    startGame: function (){
        $(".map").prepend("<button class='tutorialStartGame tutorial'>&#8592<h5>Your army is now on the board.  You may now start the game!</h5><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialStartGame'));
//        Tutorial.step += 1
    },
    firstTurn: function (){
        $(".map").prepend("<button class='tutorialFirstTurn tutorial'><h5>Looks like your opponent goes first!</h5><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialFirstTurn'));
        Tutorial.step = 7
    },
    secondTurn: function(){
        $(".map").prepend("<button class='tutorialSecondTurn tutorial'><h5>Now its your turn, click a piece to see what it can do!</h5><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialSecondTurn'));
        Tutorial.step += 1;
    },
    attack: function(){
        $(".map").prepend("<button class='tutorialAttack tutorial'><h5>Blue hexagons can be moved to, and red hexagons are capturable enemies</h5><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialAttack'));
        Tutorial.step += 1;
    },
    goodLuck: function(){
        $(".map").prepend("<button class='tutorialGoodLuck tutorial'><h6>And that's all you need to know about Cyvasse.</h6><h5>Good Luck!</h5><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialGoodLuck'));
        Tutorial.step += 1;
    },
    checkOutRoot: function(){
        $(".map").prepend("<button class='tutorialCheckIndex tutorial'>&#8598&nbsp&nbsp&nbsp&nbsp<h6>Check out your dashboard, your game saves automatically.</h6><a>skip</a></button>");
        Rotator.rotateOn($('.tutorialCheckIndex'));
        Tutorial.step += 1;
    }
};