import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import RootReducer from './reducers/RootReducer';

const store = createStore(RootReducer, applyMiddleware(thunk))

export default store;