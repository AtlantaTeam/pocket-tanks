import { routerMiddleware } from 'connected-react-router';
import {
    applyMiddleware, compose, createStore, Store,
} from 'redux';
import createSagaMiddleware, { END, SagaMiddleware } from 'redux-saga';

import logger from 'redux-logger';

import { isServer } from 'utils/isServer';
import { createBrowserHistory, createMemoryHistory } from 'history';

import { rootReducer } from './reducers';
import type { State } from './reducers';

import { rootSaga } from './sagas';

export type AppStore = Store & {
    runSaga: SagaMiddleware['run'];
    close: () => void;
};

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
    ) as AppStore;

    // Add methods to use in the server
    // eslint-disable-next-line @typescript-eslint/unbound-method
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);

    if (!isServer) {
        sagaMiddleware.run(rootSaga);
    }

    return { store, history };
};
