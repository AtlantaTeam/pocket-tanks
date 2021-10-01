import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    Router,
} from 'react-router-dom';

import { hot } from 'react-hot-loader/root';
import { useDispatch } from 'react-redux';

import { ErrorBoundary } from 'utils/classes/ErrorBoundary/ErrorBoundary';

import '../../../static/styles/fonts/fonts.css';
import '../../../static/index.css';
import './App.css';

import { ConnectedRouter } from 'connected-react-router';

import type { History } from 'history';

import { MenuComponent } from 'components/components/Menu/Menu';

import { ROUTES } from 'utils/constants/routes';
import { FullscreenButton } from '../components/FullscreenButton/FullscreenButton';

interface AppProps {
    history: History;
}

export const App = ({ history } : AppProps) => (
    <ConnectedRouter history={history}>
        <div className="app">
            <MenuComponent />
            <Switch>
                {ROUTES.map((item) => (
                    <Route
                        path={item.link}
                        key={`${item.name}-route`}
                    >
                        <ErrorBoundary
                            key={`${item.name}-error`}
                        >
                            <item.component
                                key={`${item.name}-component`}
                            />
                        </ErrorBoundary>
                    </Route>
                ))}
            </Switch>
            <FullscreenButton />
        </div>
    </ConnectedRouter>
);
