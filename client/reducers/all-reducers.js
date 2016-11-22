import {combineReducers} from 'redux';
import AuthUserReducer from './authUser-reducer';
import ReposReducer from './repos-reducer';

const allReducers = combineReducers({
    authUser: AuthUserReducer,
    repos: ReposReducer
});

export default allReducers;
