import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import chatReducer from './chatReducer.js';

const appReducer = combineReducers({
    userReducer,
    chatReducer
});

export default appReducer;