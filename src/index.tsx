import React from 'react';
import ReactDOM from 'react-dom';

import { App } from 'components/App/App';

import { Provider as ReduxProvider } from 'react-redux';
import { initializeStore } from 'redux/store';
import { ConnectedRouter } from 'connected-react-router';

// eslint-disable-next-line no-underscore-dangle
const { store, history } = initializeStore(window.__INITIAL_STATE__);

const Root = () => (
    <ReduxProvider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </ReduxProvider>
);

ReactDOM.hydrate(<Root />, document.getElementById('root'));
