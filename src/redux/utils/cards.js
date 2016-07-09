import uuid from 'uuid';
import { CardModel } from 'redux/modules/card';

const cards = [
  {
    name: 'Anima Golem',
    mana: 6,
    attack: 9,
    defense: 9,
    portrait: 'http://hydra-media.cursecdn.com/hearthstone.gamepedia.com/thumb/5/54/Anima_Golem_full.jpg/459px-Anima_Golem_full.jpg?version=1624263f4c524b56f97dd80fdd3d9bf2',
  }, {
    name: 'Abusive Sergeant',
    mana: 1,
    attack: 2,
    defense: 1,
    portrait: 'http://hydra-media.cursecdn.com/hearthstone.gamepedia.com/thumb/1/18/Abusive_Sergeant_full.jpg/587px-Abusive_Sergeant_full.jpg?version=80b05953c8897d68d12706490c8ab68d',
  }, {
    name: 'Acolyte of Pain',
    mana: 3,
    attack: 1,
    defense: 3,
    portrait: 'http://hydra-media.cursecdn.com/hearthstone.gamepedia.com/thumb/e/e0/Acolyte_of_Pain_full.jpg/350px-Acolyte_of_Pain_full.jpg?version=ea71ea7aef056d51f01800584e74c1bb',
  }, {
    name: 'Azure Drake',
    mana: 5,
    attack: 4,
    defense: 4,
    portrait: 'http://hydra-media.cursecdn.com/hearthstone.gamepedia.com/thumb/6/64/Azure_Drake_full.jpg/782px-Azure_Drake_full.jpg?version=6104b0c3caf640057fb10ca860778635',
  }, {
    name: 'Rare Parrot',
    mana: 10,
    attack: 0,
    defense: 10,
    portrait: 'http://i.imgur.com/PYe4A3T.gif',
  }, {
    name: 'James Kappa',
    mana: 3,
    attack: 16,
    defense: 5,
    portrait: 'http://media.steampowered.com/steamcommunity/public/images/avatars/0c/0c32e686f6c202e65de64bacb32eaea0c6b517f0_full.jpg',
  },
];

const cardsByName = {};
for (const card of cards) {
  cardsByName[card.name.toLowerCase()] = card;
}
cardsByName['the coin'] = {
  name: 'The Coin',
  mana: 0,
  attack: 0,
  defense: 0,
  portrait: 'https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/a/a9/The_Coin_full.jpg',
};

export default function newCardByName(name = '') {
  const card = cardsByName[name.toLowerCase()];
  if (!card) throw new Error('There is no card with that name');
  return new CardModel(Object.assign({}, card, { id: uuid.v4() }));
}

export function newRandomCard() {
  const randomCard = cards[Math.floor(Math.random() * cards.length)];
  return newCardByName(randomCard.name);
}
