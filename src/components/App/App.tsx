import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import { toastContainerProps } from 'modules/notifications/toast-container-props';
import 'react-toastify/dist/ReactToastify.min.css';

import { Route, Switch } from 'react-router-dom';

import { ErrorBoundary } from 'utils/classes/ErrorBoundary/ErrorBoundary';

import '../../../static/styles/fonts/fonts.css';
import '../../../static/index.css';
import './App.css';

import { AUTH_MENU_ROUTES, MAIN_ROUTE, ROUTES } from 'utils/constants/routes';

import { MenuComponent } from 'components/components/Menu/Menu';
import { Popup } from 'components/components/Popup/Popup';
import { i18n, useTranslation } from 'i18n';
import { FullscreenButton } from '../components/FullscreenButton/FullscreenButton';
import { ThemeSwitch } from '../components/ThemeSwitch/ThemeSwitch';
import { cleanError } from '../../redux/actions/user-state/clean-error';
import { getErrorText } from '../../redux/selectors/user-state';

export const App = () => {
    const userStateError = useSelector(getErrorText);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <div className="app">
            <MenuComponent />
            <FullscreenButton />
            <ThemeSwitch />
            <Popup
                isOpen={!!userStateError}
                action={() => {
                    dispatch(cleanError());
                }}
                title={t('error')}
                textContent={userStateError as string}
                buttonText={t('close')}
                overlayType="warning"
            />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <ToastContainer {...toastContainerProps} />
            <Switch>
                {[...AUTH_MENU_ROUTES, ...ROUTES, MAIN_ROUTE].map(({ ...item }) => (
                    <Route
                        key={`${item.name}-route`}
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...item}
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
        </div>
    );
};
