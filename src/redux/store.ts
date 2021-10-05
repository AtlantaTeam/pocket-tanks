import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import { isServer } from 'utils/isServer';
import { createBrowserHistory, createMemoryHistory } from 'history';

import { rootReducer } from './reducers';
import type { State } from './reducers';

import { rootSaga } from './sagas';

function getComposeEnhancers() {
    if (process.env.NODE_ENV !== 'production' && !isServer) {
        return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }

    return compose;
}

export const initializeStore = (initialState: State, url = '/') => {
    const history = isServer
        ? createMemoryHistory({ initialEntries: [url] })
        : createBrowserHistory();

    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = getComposeEnhancers();

    const store = createStore(
        rootReducer(history),
        initialState,
        composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware, logger)),
    );

    /*     // Add methods to use in the server
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
 */
    if (!isServer) {
        sagaMiddleware.run(rootSaga);
    }

    return { store, history };
};
