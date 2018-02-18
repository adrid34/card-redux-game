import { combineReducers } from 'redux';
import entities from './entities';
import yourTurn from './yourTurn';
import player from './player';
import opponent from './opponent';
import currentGame from './currentGame';
import lobby from './lobby';

export default combineReducers({
  yourTurn,
  currentGame,
  lobby,
  entities,
  player,
  opponent,
});
