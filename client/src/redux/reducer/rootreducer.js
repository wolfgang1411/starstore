import { combineReducers } from 'redux';
import { directory } from './directory.reducer'

export const rootReducer = combineReducers({
    directory,
})