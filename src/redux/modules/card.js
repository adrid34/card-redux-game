import uuid from 'uuid';
import { Record as record } from 'immutable';

export class CardModel extends record({
  name: '',
  mana: null,
  attack: null,
  defense: null,
  portrait: null,
}) {
  constructor(obj) {
    super(obj);
    this.id = uuid.v4();
  }
}
