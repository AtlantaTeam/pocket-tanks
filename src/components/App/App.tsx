import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ErrorBoundary } from 'utils/classes/ErrorBoundary/ErrorBoundary';

import '../../styles/fonts.css';
import '../../../static/index.css';
import './App.css';

import { ROUTES } from 'utils/constants/routes';

import { MenuComponent } from 'components/components/Menu/Menu';
import { Popup } from 'components/components/Popup/Popup';
import { FullscreenButton } from '../components/FullscreenButton/FullscreenButton';

import { checkStateRequested } from '../../redux/actions/user-state/check-state';
import { cleanError } from '../../redux/actions/user-state/clean-error';
import { getErrorText } from '../../redux/selectors/user-state';

export const App = () => {
    const error = useSelector(getErrorText);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkStateRequested());
    }, []);

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
            <Popup
                isOpen={!!error}
                action={() => {
                    dispatch(cleanError());
                }}
                title="Ошибка"
                textContent={error as string}
                buttonText="Закрыть"
            />
        </div>
    );
};
