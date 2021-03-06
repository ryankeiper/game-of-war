var values  = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
var suits   = ["Clubs", "Diamonds", "Hearts", "Spades"];

function shuffle(array){
  var currentIndex = array.length;
  var randomIndex;
  var temporaryValue;
  while(currentIndex > 0){
    randomIndex   = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue       = array[currentIndex];
    array[currentIndex]  = array[randomIndex];
    array[randomIndex]   = temporaryValue;
  }
  return array;
}

function buildDeck(suits, values){
  var deck = [];
  for(i in suits) {
    for(j in values) {
      deck.push({suit: suits[i], value: values[j]});
    }
  }
  return deck;
}

newDeck = buildDeck(suits, values);
shuffledDeck = shuffle(newDeck);

var namePlayers = function() {
  var player1 = "Joe";
  var player2 = "Frederico";
  return [player1, player2];
}


var highCard = function(deck, namePlayers, values) {
  players = namePlayers();
  playerCards = [];
  for(i in players) {
    playerCards.push({player: players[i], card: deck[i]});
    console.log(players[i] + "'s card is the " + playerCards[i]["card"]["value"] + " of " + playerCards[i]["card"]["suit"]);
  };
  if(values.indexOf(playerCards[0].card.value) > values.indexOf(playerCards[1].card.value)) {
    console.log(players[0] + " is the winner!");
  }
  else if(values.indexOf(playerCards[0].card.value) < values.indexOf(playerCards[1].card.value)) {
    console.log(players[1] + " is the winner!");
  }
  else if(values.indexOf(playerCards[0].card.value) === values.indexOf(playerCards[1].card.value)) {
    console.log("It's a tie!")
  }
}

// highCard(newDeck, namePlayers, values);

var joesDeck = function(deck) {
  joesDeck = [];
  for(i = 0; i < deck.length; i = i + 2) {
    joesDeck.push(deck[i]);
  }
  return joesDeck;
}

var fredericosDeck = function(deck) {
  fredericosDeck = [];
  for(i = 1; i < deck.length; i = i + 2) {
    fredericosDeck.push(deck[i]);
  }
  return fredericosDeck;
}

joesNewDeck = joesDeck(shuffledDeck);
fredericosNewDeck = fredericosDeck(shuffledDeck);

var compare = function(deck1, deck2, tieArray, values) {
  console.log(deck1[0]["suit"], deck1[0]["value"], deck2[0]["suit"], deck2[0]["value"]);
  if(values.indexOf(deck1[0]["value"]) > values.indexOf(deck2[0]["value"])) {
    console.log("Player 1 has the " + deck1[0]["value"] + " of " + deck1[0]["suit"]);
    console.log("Player 2 has the " + deck2[0]["value"] + " of " + deck2[0]["suit"]);
    console.log("Player 1 wins!");
    card1 = deck1.shift();
    card2 = deck2.shift();
    deck1.push(card1);
    deck1.push(card2);
    if(tieArray.length > 0) {
      for(i = 0; i < tieArray.length; i++) {
        deck1.push(tieArray[i]);
      }
    }
    if(deck2.length === 0) {
      console.log("Player 1 has won the war!");
      return true;
    }
  }
  else if(values.indexOf(deck1[0]["value"]) < values.indexOf(deck2[0]["value"])) {
    console.log("Player 1 has the " + deck1[0]["value"] + " of " + deck1[0]["suit"]);
    console.log("Player 2 has the " + deck2[0]["value"] + " of " + deck2[0]["suit"]);
    console.log("Player 2 wins!");
    deck2.push(deck1.shift());
    deck2.push(deck2.shift());
    if(tieArray.length > 0) {
      for(i = 0; i < tieArray.length; i++) {
        deck2.push(tieArray[i]);
      }
    }
    if(deck1.length === 0) {
      console.log("Player 2 has won the war!");
      return true;
    }
  }
  else if(values.indexOf(deck1[0]["value"]) === values.indexOf(deck2[0]["value"])) {
    tie(deck1, deck2, tieArray);
  }
  else {
    return false;
  }
}

var tie = function(deck1, deck2, tieArray) {
  for(i = 0; i < 3; i++) {
    tieArray.push(deck1.shift());
    tieArray.push(deck2.shift());
    if(deck1.length === 0 && deck2.length === 0) {
      console.log("The war is a draw!");
      return true;
      break;
    }
    else if(deck1.length === 0) {
     console.log("Player 2 is victorious!");
      return true;
      break; 
    }
    else if(deck2.length === 0) {
      console.log("Player 1 is victorious!");
      return true;
      break;
    }
    else {
      return false;
    }
  }
}

var tieArray = [];

var war = function() {
  var gameOver = false
  while(gameOver != true) {
    gameOver = compare(joesNewDeck, fredericosNewDeck, tieArray, values);
    console.log(gameOver);
  }
}

war();

// var war = function(deck1, deck2, values) {
//   while(deck1.length > 0 && deck2.length > 0) {
//     card1 = deck1.shift();
//     card2 = deck2.shift();
//     if((deck1.length > 0 && deck2.length > 0) && ((values.indexOf(card1["value"]) > values.indexOf(card2["value"])))) {
//       console.log("Player 1 wins!");
//       deck1.push(card1);
//       deck1.push(card2);
//     }
//     else if((deck1.length > 0 && deck2.length > 0) && ((values.indexOf(card1["value"]) < values.indexOf(card2["value"])))) {
//       console.log("Player 2 wins!");
//       deck2.push(card1);
//       deck2.push(card2);
//     }
//     else if((deck1.length > 0 && deck2.length > 0) && ((values.indexOf(card1["value"]) === values.indexOf(card2["value"])))) {
//       console.log("It's a tie!");
//       cards1 = [card1];
//       cards2 = [card2];
//       while(cards1[cards1.length - 1]["value"] === cards2[cards2.length - 1]["value"]) {
//         for(i = 0; i < 4; i++) {
//           cards1.push(deck1.shift());
//           cards2.push(deck2.shift());
//         }
//       }
//       if(values.indexOf(cards1[cards1.length - 1]["value"]) > values.indexOf(cards2[cards2.length - 1]["value"])) {
//         console.log("Player 1 wins!")
//         for(i = 0; i < cards1.length; i++) {
//           card1 = cards1.pop();
//           deck1.push(card1);
//           card2 = cards2.pop();
//           deck1.push(card2);
//         }
//       }
//       else if(values.indexOf(cards1[cards1.length - 1]["value"]) < values.indexOf(cards2[cards2.length - 1]["value"])) {
//         console.log("Player 2 wins!")
//         for(i = 0; i < cards1.length; i++) {
//           card1 = cards1.pop();
//           deck2.push(card1);
//           card2 = cards2.pop();
//           deck2.push(card2);
//         }
//       }
//     }
//     console.log("Player 1 has " + deck1.length + " cards remaining.");
//     console.log("Player 2 has " + deck2.length + " cards remaining.");
//   }
//   if(deck1.length === 0) {
//     console.log("Player 2 is the winner!");
//   }
//   else if(deck2.length === 0) {
//     console.log("Player 1 is the winner!");
//   }
// }

// war(joesDeck(newDeck), fredericosDeck(newDeck), values);










