const decks = ["Clubs", "Spades", "Diamonds", "Hearts"];
//prettier-ignore
const numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let cardList = [];

clubsStart = null;
clubsEnd = null;
spadesStart = null;
spadesEnd = null;
diamondsStart = null;
diamondsEnd = null;
heartsStart = null;
heartsEnd = null;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const setCards = () => {
  cardList = [];

  for (deck of decks) {
    for (number of numbers) {
      cardList.push({
        deck: deck,
        number: number,
      });
    }
  }

  shuffleArray(cardList);
};

const checkCardForMatch = (card) => {
  switch (card.deck) {
    case "Clubs":
      if (
        Math.abs(numbers.indexOf(clubsStart) - numbers.indexOf(card.number)) ===
        1
      ) {
        clubsStart = card.number;
        return true;
      } else if (
        Math.abs(numbers.indexOf(clubsEnd) - numbers.indexOf(card.number)) === 1
      ) {
        clubsEnd = card.number;
        return true;
      } else if (
        Math.abs(numbers.indexOf(clubsEnd) - numbers.indexOf(card.number)) ===
        13
      ) {
        clubsEnd = card.number;
        return true;
      } else {
        return false;
      }
    case "Spades":
      if (
        Math.abs(
          numbers.indexOf(spadesStart) - numbers.indexOf(card.number)
        ) === 1
      ) {
        spadesStart = card.number;
        return true;
      } else if (
        Math.abs(numbers.indexOf(spadesEnd) - numbers.indexOf(card.number)) ===
        1
      ) {
        spadesEnd = card.number;
        return true;
      } else if (
        Math.abs(numbers.indexOf(spadesEnd) - numbers.indexOf(card.number)) ===
        13
      ) {
        spadesEnd = card.number;
        return true;
      } else {
        return false;
      }
    case "Diamonds":
      if (
        Math.abs(
          numbers.indexOf(diamondsStart) - numbers.indexOf(card.number)
        ) === 1
      ) {
        diamondsStart = card.number;
        return true;
      } else if (
        Math.abs(
          numbers.indexOf(diamondsEnd) - numbers.indexOf(card.number)
        ) === 1
      ) {
        diamondsEnd = card.number;
        return true;
      } else if (
        Math.abs(
          numbers.indexOf(diamondsEnd) - numbers.indexOf(card.number)
        ) === 13
      ) {
        diamondsEnd = card.number;
        return true;
      } else {
        return false;
      }
    case "Hearts":
      if (
        Math.abs(
          numbers.indexOf(heartsStart) - numbers.indexOf(card.number)
        ) === 1
      ) {
        heartsStart = card.number;
        return true;
      } else if (
        Math.abs(numbers.indexOf(heartsEnd) - numbers.indexOf(card.number)) ===
        1
      ) {
        heartsEnd = card.number;
        return true;
      } else if (
        Math.abs(numbers.indexOf(heartsEnd) - numbers.indexOf(card.number)) ===
        13
      ) {
        heartsEnd = card.number;
        return true;
      } else {
        return false;
      }
  }
};

const checkStackForMatch = (stack) => {
  let matched = 0;
  let currentCard;

  currentCard = stack.shift();
  while (checkCardForMatch(currentCard)) {
    matched += 1;
    currentCard = stack.shift();
  }

  return matched;
};

const game = () => {
  let hits;
  let i, j;
  let matches;
  while (cardList) {
    hits = 0;
    i = 0;

    while (i < cardList.length) {
      currentStack = cardList.slice(i, i + 3);
      currentStack.reverse();
      matches = checkStackForMatch(currentStack);
      for (j = 0; j < matches; j++) {
        cardList.splice(i + 2 - j, 1);
        hits += 1;
      }

      i += 3;
    }

    console.log(`${clubsEnd}-${spadesEnd}-${diamondsEnd}-${heartsEnd}`);
    console.log(`${clubsStart}-${spadesStart}-${diamondsStart}-${heartsStart}`);

    if (!hits) {
      break;
    }
  }

  if (hits) {
    console.log("congrats!");
  } else {
    console.log("no dice.");
  }
};

setCards();
game();
