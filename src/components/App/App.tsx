import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ErrorBoundary } from 'utils/classes/ErrorBoundary/ErrorBoundary';

import '../../styles/fonts.css';
import '../../../static/index.css';
import './App.css';

import { MenuComponent } from 'components/components/Menu/Menu';

import { ROUTES } from 'utils/constants/routes';
import { fetchUserInfoRequested } from '../../redux/actions/user-state/user-info';
import { FullscreenButton } from '../components/FullscreenButton/FullscreenButton';

export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserInfoRequested());
    });

    return (
        <div className="app">
            <Router>
                <MenuComponent />
                <Switch>
                    {ROUTES.map((item) => (
                        <Route path={item.link} key={`${item.name}-route`}>
                            <ErrorBoundary key={`${item.name}-error`}>
                                <item.component key={`${item.name}-component`} />
                            </ErrorBoundary>
                        </Route>
                    ))}
                </Switch>
                <FullscreenButton />
            </Router>
        </div>
    );
};
