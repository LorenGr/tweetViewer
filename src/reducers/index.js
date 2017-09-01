import {combineReducers} from 'redux';
import viewer from './viewer';
import controls from './controls';
export const reducers = combineReducers({viewer,controls});