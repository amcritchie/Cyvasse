var MatchData = {

    currentUser: null,
    homeUserID: null,
    awayUserID: null,
    homeUnitsString: null,
    awayUnitsString: null,

    firstGame: false,
    whoStarted: null,
    matchID: null,
    playingAI: false,

    loadMatchDataToJavaScript: function () {
        MatchData.loadUserData();
        MatchData.loadPlayerData();
        MatchData.loadMatchData();
        MatchData.loadGameData();
        if (Opponent.isA == 'computer') {
            Game.playingAI = true
        }
    },
    loadUserData: function () {
        MatchData.currentUser = parseInt(document.getElementById('currentUserID').innerHTML);
        MatchData.homeUserID = parseInt(document.getElementById('homeID').innerHTML);
        MatchData.awayUserID = parseInt(document.getElementById('awayID').innerHTML);
        MatchData.homeUnitsString = document.getElementById('homeUnitsPos').innerHTML;
        MatchData.awayUnitsString = document.getElementById('awayUnitsPos').innerHTML;
    },
    loadPlayerData: function () {
        if (MatchData.currentUser == MatchData.homeUserID) {


            You.setAttributes(document.getElementById('homeID').innerHTML, 1, document.getElementById('homeReady').innerHTML, document.getElementById('homeUnitsPos').innerHTML);
            Opponent.setAttributes(document.getElementById('awayID').innerHTML, 0, document.getElementById('awayReady').innerHTML, document.getElementById('awayUnitsPos').innerHTML);
        } else if (MatchData.currentUser == MatchData.awayUserID) {
            You.setAttributes(document.getElementById('awayID').innerHTML, 0, document.getElementById('awayReady').innerHTML, document.getElementById('awayUnitsPos').innerHTML);
            Opponent.setAttributes(document.getElementById('homeID').innerHTML, 1, document.getElementById('homeReady').innerHTML, document.getElementById('homeUnitsPos').innerHTML);
        }
    },
    loadMatchData: function () {
        MatchData.matchID = parseInt(document.getElementById('matchID').innerHTML);
        MatchData.firstGame = document.getElementById('firstGame').innerHTML;
        MatchData.whoStarted = parseInt(document.getElementById('matchWhoStarted').innerHTML);
    },
    loadGameData: function () {
        Game.turn = parseInt(document.getElementById('matchTurn').innerHTML);
        Game.status = document.getElementById('matchStatus').innerHTML;
        Game.whosTurn = parseInt(document.getElementById('whosTurn').innerHTML);
    }
};