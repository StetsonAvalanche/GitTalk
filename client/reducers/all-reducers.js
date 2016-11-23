import {combineReducers} from 'redux';
import AuthUserReducer from './authUser-reducer';
import ReposReducer from './repos-reducer';
import MessagesReducer from './messages-reducer';

const allReducers = combineReducers({
    authUser: AuthUserReducer,
    repos: ReposReducer,
    messages: MessagesReducer
});

export default allReducers;
