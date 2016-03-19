import { Record as record } from 'immutable';

export class CardModel extends record({
  id: null,
  name: '',
  mana: null,
  attack: null,
  defense: null,
}) {
  constructor(obj) {
    super(obj);

    // TODO: find a way to make this even more unique
    this.uniqId = this.id + +new Date();
  }
}
