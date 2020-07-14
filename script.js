const levels = document.querySelectorAll('.main-menu__item');
const startButton = document.querySelector('.main-button');

setTimeout(function() {
  const preloader = document.querySelector('.preloader');
  preloader.classList.add('hide');
}, 1000);

const pickLevel = (item) => {
  levels.forEach((item) => {
    item.classList.remove('selected');
  });
  item.target.classList.add('selected');
}

levels.forEach((item) => {
  item.addEventListener('click', pickLevel)
});


const checkLevel = () => {
  let selectedLevel = document.querySelector('.selected');
  let idLevel = selectedLevel.id;
  return idLevel;
}

const quantityCard = () => {
  let getLevel = checkLevel();
  let card;

  switch (getLevel) {
    case 'medium':
      card = 6;
      break;

    case 'hard':
      card = 10;
      break;

    default:
      card = 3;
      break;
  }
  return card;
}

const createAllCard = () => {
  const cards = document.querySelector('.cards');
  const numberCard = quantityCard();

  switch (numberCard) {
    case 3:
      cards.classList.add('three_card');
      break;

    case 6:
      cards.classList.add('six_card');
      break;

    case 10:
      cards.classList.add('ten_card');
      break;

    default:
      break;
  }

  const randomCard = Math.floor(Math.random() * numberCard);

  for (let i = 0; i < numberCard; i++) {
    const card = document.createElement('div');
    const cardBack = document.createElement('div');
    const cardWinn = document.createElement('div');
    const cardLose = document.createElement('div');

    if(i === randomCard) {
      cardWinn.className = 'card__winn';
      cardBack.className = 'card__back';
      card.className = 'card';

      card.append(cardBack);
      card.append(cardWinn);
      cards.append(card);
    } else {
      cardLose.className = 'card__lose';
      cardBack.className = 'card__back';
      card.className = 'card';

      card.append(cardBack);
      card.append(cardLose);
      cards.append(card);
    }
  }
}

const clearingField = () => {
  document.querySelector('.container').classList.add('hide');
  const preloader = document.querySelector('.preloader');
  preloader.classList.remove('hide');
  setTimeout(function() {
    preloader.classList.add('hide');
  }, 500);
  document.querySelector('.gameField').classList.remove('hide');
}

const hoverCard = () => {
  const card = document.querySelectorAll('.card');

  card.forEach(item => {
    item.addEventListener("mouseover", function () {
      this.classList.add("card-hover");
    });
    item.addEventListener("mouseout", function () {
      this.classList.remove("card-hover");
    });
  });
}

const restartGame = () => {
  const cards = document.querySelector('.cards');
  document.querySelector('.container').classList.remove('hide');
  document.querySelector('.gameField').classList.add('hide');

  if(cards.classList.contains('three_card')) {
    cards.classList.remove('three_card');
  } else if (cards.classList.contains('six_card')) {
    cards.classList.remove('six_card');
  } else {
    cards.classList.remove('ten_card');
  }

  cards.innerHTML = '';
  
}

const clickOnCard = () => {
  const card = document.querySelectorAll('.card');
  card.forEach((item) => {
    item.addEventListener('click', function () {
      for(let i = 0; i < card.length; i++) {
        if(card[i].classList.contains('rotate')) {
          restartGame();
        }
      }
      item.classList.add('rotate');
    });
  });
}

const game = () => {
  clearingField();
  createAllCard();
  hoverCard();
  clickOnCard();
}

startButton.addEventListener('click', game);