import { combineReducers } from 'redux';
import authRediucer from './authReducers';
import errorReducer from './errorReducers';

export default combineReducers({
    auth: authRediucer,
    errors: errorReducer
});
