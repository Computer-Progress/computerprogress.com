import { combineReducers } from 'redux';

import UserReducer from './user'
import AlertReducer from './alert'
import navigation from './alert'

export default combineReducers({
    UserReducer,
    AlertReducer,
    navigation,
})