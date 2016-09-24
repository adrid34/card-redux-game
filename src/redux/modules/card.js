import { Record as record } from 'immutable';

/* eslint-disable import/prefer-default-export */
// Reason: There might be more methods being exported here
export const CardModel = record({
  id: null,
  name: '',
  mana: null,
  attack: null,
  defense: null,
  portrait: null,
});
/* eslint-enable */
