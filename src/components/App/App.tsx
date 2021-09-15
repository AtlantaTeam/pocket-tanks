import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    StaticRouter,
} from 'react-router-dom';
import { StaticRouterContext } from 'react-router';

import { hot } from 'react-hot-loader/root';

import { ErrorBoundary } from 'utils/classes/ErrorBoundary/ErrorBoundary';

import '../../../static/styles/fonts/fonts.css';
import '../../../static/index.css';

import './App.css';

import { MenuComponent } from '../components/Menu/Menu';
import { ROUTES } from '../../utils/constants/routes';

export interface StaticRouterProps {
    location?: string;
    context?: StaticRouterContext;
}

export const App = ({
    context,
    location,
}: StaticRouterProps) => (
    <div className="app">
        <StaticRouter context={context} location={location}>
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
        </StaticRouter>
    </div>
);
