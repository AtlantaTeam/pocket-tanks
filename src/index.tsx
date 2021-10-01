import React from 'react';
import ReactDOM from 'react-dom';

import { App } from 'components/App/App';

import { Provider } from 'react-redux';
import { history, initializeStore } from 'redux/store';

// eslint-disable-next-line no-underscore-dangle
const { store } = initializeStore(window.__INITIAL_STATE__);

const Root = () => (
    <Provider store={store}>
        <App history={history} />
    </Provider>
);

ReactDOM.hydrate(<Root />, document.getElementById('root'));
