import { List, Record } from 'immutable';

const initialState = new List([
  new Record({ id: 1, name: 'Gabria Warden', mana: 1, attack: 5, defense: 1 })(),
  new Record({ id: 2, name: 'Abusive Sergeant', mana: 1, attack: 2, defense: 1 })(),
  new Record({ id: 3, name: 'Acolyte of Pain', mana: 3 })(),
  new Record({ id: 4, name: 'Azure Drake', mana: 5, attack: 4, defense: 4 })(),
]);

export default function reducer(state = initialState) {
  return state;
}
