{
  board: {
    you: [null, null, null, null, null, null, null],
    opponent: [null, null, null, null, null, null, null]
  },
  player: {
    you: {
      name: 'Inooid'
      hero: 'Mage'
      health: 30,
      mana: 1,
      weapon: {
        portait: 'imgurl'
        damage: 2,
        durability: 8,
        callback: fn
      },
      heropower: {
        portait: '',
        mana: 2,
        fireOff: fn
      }
    }
    opponent: {
      name: 'Inooid'
      hero: 'Mage'
      health: 30,
      mana: 1,
      weapon: null,
      heropower: {
        portait: '',
        mana: 2,
        fireOff: fn
      }
    }
  },
  decks: {
    you: [],
    opponent: {
      count: 30
    }
  },
  hand: {
    you: [],
    opponent: []
  },
  history: [],
  turn:
}
