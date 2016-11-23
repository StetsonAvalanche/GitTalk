import {combineReducers} from 'redux';
import AuthUserReducer from './authUser-reducer';
import ReposReducer from './repos-reducer';
import MessagesReducer from './messages-reducer';
import ActiveChatroomReducer from './activeChatroom-reducer';

const allReducers = combineReducers({
    authUser: AuthUserReducer,
    repos: ReposReducer,
    messages: MessagesReducer,
    activeChatroomId: ActiveChatroomReducer
});

export default allReducers;
