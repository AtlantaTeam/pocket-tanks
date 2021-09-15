import React from 'react';
import ReactDOM from 'react-dom';

import { App } from 'components/App/App';

import type { History } from 'history';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line no-underscore-dangle

const Root = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.hydrate(<Root />, document.getElementById('root'));
