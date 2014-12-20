var MatchData = {

    firstGame: false,
    currentUser: null,
    homeUser:null,
    awayUser:null,

    currentUserIsTeam: null,

    turn: null,
    whoStarted: null,

    startTime: null,
    whosTurn: null,

    offense: null,

    defense: null,
    player1name: null,
    player0name: null,

    outlines: null,
    playingAI: false,

    playingAsAI: false,

    lastMove:[0,0],

    matchID: null,
    matchStatus: null,
    matchAgainst: null,
    homeUnitsString: null,
    awayUnitsString: null,

    grabMatchData: function(){

        Game.firstGame = document.getElementById('firstGame').innerHTML;
        Game.currentUser = parseInt(document.getElementById('currentUserID').innerHTML);
        Game.homeUser = parseInt(document.getElementById('homeID').innerHTML);
        Game.awayUser = parseInt(document.getElementById('awayID').innerHTML);

        if (Game.currentUser == Game.homeUser){
            Game.currentUserIsTeam = 1;
            You.setAttributes(1,document.getElementById('homeReady').innerHTML,document.getElementById('homeUnitsPos').innerHTML);
            Opponent.setAttributes(0,document.getElementById('awayReady').innerHTML,document.getElementById('awayUnitsPos').innerHTML);
//            You.team = 1;
//            You.ready = document.getElementById('homeReady').innerHTML;
//            You.unitsPos = document.getElementById('homeUnitsPos').innerHTML;
//            Opponent.team = 0;
//            Opponent.ready = document.getElementById('awayReady').innerHTML;
//            Opponent.unitsPos = document.getElementById('awayUnitsPos').innerHTML;
        } else if (Game.currentUser == Game.awayUser){
            Game.currentUserIsTeam = 0;
            You.setAttributes(1,document.getElementById('awayReady').innerHTML,document.getElementById('awayUnitsPos').innerHTML);
            Opponent.setAttributes(0,document.getElementById('homeReady').innerHTML,document.getElementById('homeUnitsPos').innerHTML);
//            You.team = 0;
//            You.ready = document.getElementById('awayReady').innerHTML;
//            You.unitsPos = document.getElementById('awayUnitsPos').innerHTML;
//            Opponent.team = 1;
//            Opponent.ready = document.getElementById('homeReady').innerHTML;
//            Opponent.unitsPos = document.getElementById('homeUnitsPos').innerHTML;
        } else{
        }

        Game.whosTurn = parseInt(document.getElementById('whosTurn').innerHTML);

        Game.turn = parseInt(document.getElementById('matchTurn').innerHTML);
        Game.whoStarted = parseInt(document.getElementById('matchWhoStarted').innerHTML);

        Game.outlines = document.getElementById('togglePreference').innerHTML;

        Game.matchID = parseInt(document.getElementById('matchID').innerHTML);
        Game.matchStatus = document.getElementById('matchStatus').innerHTML;
        Game.matchAgainst = document.getElementById('matchAgainst').innerHTML;
        Game.homeUnitsString = document.getElementById('homeUnitsPos').innerHTML;
        Game.awayUnitsString = document.getElementById('awayUnitsPos').innerHTML;

        if (Game.matchAgainst == 'computer') {
            Game.playingAI = true
        }

        Opponent.isA = Game.matchAgainst;
    }
};
