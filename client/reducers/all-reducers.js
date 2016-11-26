import {combineReducers} from 'redux';
import AuthUserReducer from './authUser-reducer';
import ReposReducer from './repos-reducer';
import MessagesReducer from './messages-reducer';
import ActiveChatroomReducer from './activeChatroom-reducer';
import WindowSizeReducer from './windowSize-reducer';
import SendInviteReducer from './sendInvite-reducer';

const allReducers = combineReducers({
    authUser: AuthUserReducer,
    repos: ReposReducer,
    messages: MessagesReducer,
    activeChatroomId: ActiveChatroomReducer,
    windowSize: WindowSizeReducer,
    inviteSent: SendInviteReducer
});

export default allReducers;
