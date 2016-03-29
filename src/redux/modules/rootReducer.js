import { combineReducers } from 'redux';
import player from 'redux/modules/player';
import opponent from 'redux/modules/opponent';

export default combineReducers({
  player,
  opponent,
});
