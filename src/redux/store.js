import { createStore, applyMiddleware } from 'redux';

import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';


import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';

// import {fetchCollectionStart} from '../redux/shop/shop.sagas';

const sagaMiddleware = createSagaMiddleware();

// const middlewares = [thunk];
const middlewares = [sagaMiddleware];


if (process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}


export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store);

export default {store, persistor};