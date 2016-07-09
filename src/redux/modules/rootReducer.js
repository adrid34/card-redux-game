import { combineReducers } from 'redux';
import entities from './entities';
import yourTurn from './yourTurn';
import player from './player';
import opponent from './opponent';

export default combineReducers({
  yourTurn,
  entities,
  player,
  opponent,
});
