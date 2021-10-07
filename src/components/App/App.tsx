import React, { useEffect } from 'react';

import {
    Switch,
    Route,
} from 'react-router-dom';

import { ErrorBoundary } from 'utils/classes/ErrorBoundary/ErrorBoundary';

import '../../../static/styles/fonts/fonts.css';
import '../../../static/index.css';
import './App.css';

import { MenuComponent } from 'components/components/Menu/Menu';

import { ROUTES } from 'utils/constants/routes';
import { FullscreenButton } from '../components/FullscreenButton/FullscreenButton';

export const App = () => (
    <div className="app">
        <MenuComponent />
        <Switch>
            {ROUTES.map((item) => (
                <Route
                    exact
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
);
