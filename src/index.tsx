import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from 'components/App/App';
import { initializeStore } from './redux/store';

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__ || {};

const { store } = initializeStore(initialState);

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
