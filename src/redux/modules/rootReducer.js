import { combineReducers } from 'redux';
import entities from './entities';
import player from './player';
import opponent from './opponent';

export default combineReducers({
  entities,
  player,
  opponent,
});
