var playerPts = 0,
    dealerPts = 0,
    playerCard = null,
    dealerCard = null,
    winner = "Undetermined",
    playerStay = false,
    dealerStay = false,
    playerWins = 0,
    dealerWins = 0;

function play() {
    playerPts = 0;
    dealerPts = 0;
    playerCard = null;
    dealerCard = null;
    winner = "Undetermined";
    playerStay = false;
    dealerStay = false;

    document.getElementById("winner").parentElement.classList.remove("lose");
    document.getElementById("winner").parentElement.classList.add("disabled");
    document.getElementById("controls").classList.remove("disabled");
    document.getElementById("hit").classList.remove("disabled");
    document.getElementById("stay").classList.remove("disabled");
    document.getElementById("dealerPts").innerHTML = dealerPts;
    document.getElementById("playerPts").innerHTML = playerPts;
    document.getElementById("dealerCard").innerHTML = dealerCard;
    document.getElementById("playerCard").innerHTML = playerCard;
    document.getElementById("winner").innerHTML = winner;

    hit();
}

function log(message) {
    var section = document.getElementById("log");
    var el = document.createElement("p");
    el.innerHTML = message;
    section.insertBefore(el, section.firstChild);
}

function hit() {
    if(dealerPts > playerPts && dealerPts > 16 && dealerPts < 22 && playerPts < 21) {
        dealerStay = true;
        dealerCard = 0;
        log("Dealer Stays with: "+dealerPts+" points.");
    } else {
        dealerCard = Math.floor(Math.random() * 11 + 1);
    }

    playerCard = Math.floor(Math.random() * 11 + 1);
    playerPts += playerCard;
    dealerPts += dealerCard;

    document.getElementById("dealerPts").innerHTML = (dealerPts);
    document.getElementById("playerPts").innerHTML = (playerPts);
    document.getElementById("dealerCard").innerHTML = (dealerCard);
    document.getElementById("playerCard").innerHTML = (playerCard);

    log("DEALING... Player card: "+playerCard+" Dealer card: "+dealerCard);

    checkScore();
}

function stay() {
    playerStay = true;
    document.getElementById("hit").classList.add("disabled");
    document.getElementById("stay").classList.add("disabled");
    document.getElementById("dealerPts").innerHTML = (dealerPts);
    document.getElementById("playerPts").innerHTML = (playerPts);

    log("Player stays with: "+playerPts+" points.");

    while(dealerPts < playerPts && dealerPts < 21) {
        dealerCard = Math.floor(Math.random() * 11 + 1);
        dealerPts += dealerCard;
        document.getElementById("dealerPts").innerHTML = (dealerPts);
        log("DEALING... Dealer card: "+dealerCard);
    }

    checkScore();
}

function checkScore() {

    //If both players bust
    if (dealerPts > 21 && playerPts > 21){
        document.getElementById("dealerPts").innerHTML = (dealerPts);
        document.getElementById("playerPts").innerHTML = (playerPts);
        winner = "Draw";
    }

    //Both players stay and draw
    else if (playerStay == true && dealerStay == true && playerPts == dealerPts) {
        document.getElementById("dealerPts").innerHTML = (dealerPts);
        document.getElementById("playerPts").innerHTML = (playerPts);
        winner = "Draw";
    }

    //both players stay and draw
    else if (playerStay == true && dealerPts == playerPts && dealerPts > 16 && dealerPts < 22) {
        document.getElementById("dealerPts").innerHTML = (dealerPts);
        document.getElementById("playerPts").innerHTML = (playerPts);
        winner = "Draw";
    }

    //if dealer wins OR player busts
    else if (dealerPts == 21) {
        document.getElementById("dealerPts").innerHTML = (dealerPts);
        document.getElementById("playerPts").innerHTML = (playerPts);
        winner = "Dealer";
    }

    //if dealer wins with higher score than player
    else if(dealerPts > playerPts && dealerPts < 22 && playerStay == true) {
        document.getElementById("dealerPts").innerHTML = (dealerPts);
        document.getElementById("playerPts").innerHTML = (playerPts);
        winner = "Dealer";
    }

    //If both players stay and dealers wins
    else if (playerStay == true && dealerStay == true && dealerStay > playerStay && dealerStay < 22) {
        document.getElementById("dealerPts").innerHTML = (dealerPts);
        document.getElementById("playerPts").innerHTML = (playerPts);
        winner = "Dealer";
    }

    //dealer stays and player busts and dealer doesn't bust
    else if (dealerStay == true && playerPts > 21 && dealerPts <= 21) {
        document.getElementById("dealerPts").innerHTML = (dealerPts);
        document.getElementById("playerPts").innerHTML = (playerPts);
        winner = "Dealer";
    }

    //player busts
    else if (dealerPts < 21 && playerPts > 21) {
        document.getElementById("dealerPts").innerHTML = (dealerPts);
        document.getElementById("playerPts").innerHTML = (playerPts);
        winner = "Dealer";
    }

    //If dealer stays and player beats their score without busting
    else if (dealerStay == true && dealerPts < playerPts && playerPts < 21) {
        document.getElementById("dealerPts").innerHTML = (dealerPts);
        document.getElementById("playerPts").innerHTML = (playerPts);
        winner = "Player";
    }

    //dealer stays and player wins
    else if (dealerStay == true && playerPts > dealerPts && playerPts < 22) {
        document.getElementById("dealerPts").innerHTML = (dealerPts);
        document.getElementById("playerPts").innerHTML = (playerPts);
        winner = "Player";
    }

    //If both players stay and player wins
    else if (playerStay == true && dealerStay == true && playerStay > dealerStay && playerStay < 22) {
        document.getElementById("dealerPts").innerHTML = (dealerPts);
        document.getElementById("playerPts").innerHTML = (playerPts);
        winner = "Player";
    }

    //if player wins OR dealer busts
    else if (playerPts == 21) {
        document.getElementById("dealerPts").innerHTML = (dealerPts);
        document.getElementById("playerPts").innerHTML = (playerPts);
        winner = "Player";
    }

    else if (playerStay == true && playerPts <= 21 && dealerPts > 21) {
        document.getElementById("dealerPts").innerHTML = (dealerPts);
        document.getElementById("playerPts").innerHTML = (playerPts);
        winner = "Player";
    }

    else if (playerPts < 21 && dealerPts > 21) {
        document.getElementById("dealerPts").innerHTML = (dealerPts);
        document.getElementById("playerPts").innerHTML = (playerPts);
        winner = "Player";
    }

    if (winner != "Undetermined") {
        log("WINNER: " + winner);
        document.getElementById("winner").innerHTML = (winner);
        document.getElementById("winner").parentElement.classList.remove("disabled");

        if(winner == "Dealer"){
            document.getElementById("winner").parentElement.classList.add("lose");
            dealerWins += 1;
            document.getElementById("dealerWins").innerHTML = (dealerWins);
        }

        else if(winner == "Player"){
            document.getElementById("winner").parentElement.classList.remove("lose");
            playerWins += 1;
            document.getElementById("playerWins").innerHTML = (playerWins);
        }

        document.getElementById("controls").className = "disabled";
    }
}
