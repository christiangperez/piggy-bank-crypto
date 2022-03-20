import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { walletReducer } from '../reducers/walletReducer';

const rootReducer = combineReducers({
    wallet: walletReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type IRootState = ReturnType<typeof rootReducer>;
