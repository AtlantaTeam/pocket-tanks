import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import { isServer } from 'utils/isServer';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import { rootReducer } from './reducers';
import type { State } from './reducers';

import { rootSaga } from './sagas';

const composeEnhancers = !isServer
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const sagaMiddleware = createSagaMiddleware();

export const history = isServer
    ? createMemoryHistory()
    : createBrowserHistory();

export const initializeStore = (initialState: State) => {
    const store = createStore(
        rootReducer(history),
        initialState,
        composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware, logger)),
    );

    sagaMiddleware.run(rootSaga);

    return { store };
};
