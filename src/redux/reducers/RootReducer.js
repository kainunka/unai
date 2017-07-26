import { combineReducers } from 'redux';
import NavReducer from './NavReducer';

const RootReducer = combineReducers({
    nav: NavReducer
})

export default RootReducer;