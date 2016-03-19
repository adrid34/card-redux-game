import { Record as record } from 'immutable';

let cardModelCount = 0;

export class CardModel extends record({
  id: null,
  name: '',
  mana: null,
  attack: null,
  defense: null,
}) {
  constructor(obj) {
    super(obj);
    this.uniqId = cardModelCount++;
  }
}
